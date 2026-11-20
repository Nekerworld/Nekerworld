"""File-level, source-only language accounting for the profile graphs."""
import base64
import fnmatch
import json
import os
import urllib.parse
from collections import Counter
from pathlib import PurePosixPath

from language_stats import request, repo_list

# Only explicitly maintained source languages. Unrecognised formats are not guessed.
EXTENSIONS = {
    ".py":"Python", ".pyw":"Python", ".ipynb":"Python",
    ".js":"JavaScript", ".jsx":"JavaScript", ".mjs":"JavaScript", ".cjs":"JavaScript",
    ".ts":"TypeScript", ".tsx":"TypeScript", ".vue":"Vue",
    ".html":"HTML", ".htm":"HTML", ".css":"CSS", ".scss":"CSS", ".sass":"CSS", ".less":"CSS",
    ".java":"Java", ".kt":"Kotlin", ".kts":"Kotlin", ".dart":"Dart",
    ".c":"C", ".h":"C", ".cpp":"C++", ".cc":"C++", ".cxx":"C++", ".hpp":"C++",
    ".cs":"C#", ".go":"Go", ".rs":"Rust", ".php":"PHP", ".rb":"Ruby",
    ".sh":"Shell", ".bash":"Shell", ".ps1":"PowerShell", ".swift":"Swift",
    ".v":"Verilog", ".sv":"SystemVerilog", ".vhd":"VHDL", ".vhdl":"VHDL",
    ".sql":"SQL", ".r":"R", ".jl":"Julia", ".lua":"Lua", ".pl":"Perl",
    ".asm":"Assembly", ".s":"Assembly", ".ino":"C++", ".pde":"Processing",
    ".sol":"Solidity", ".ex":"Elixir", ".exs":"Elixir", ".scala":"Scala",
}
EXCLUDED_DIRS = {
    ".git",".github","node_modules","vendor","bower_components","dist","build",
    ".next",".nuxt",".output","coverage",".coverage","__pycache__",".pytest_cache",
    ".mypy_cache",".ruff_cache",".venv","venv","env",".tox",".npm-cache",
    ".gradle",".idea",".vscode",".metadata","test-results","playwright-report",
    "chroma_db","checkpoints","wandb","runs","logs","__generated__",
}
EXCLUDED_SUFFIXES = (".min.js",".min.css",".map",".generated.js",".generated.ts",
                     ".g.dart",".freezed.dart",".pb.dart",".gr.dart",".designer.cs")
# Repo-specific source boundaries; paths are relative to the repository root.
EXCLUDED_PATHS = {
    "Nekerworld/SSAFY": ("게이미피케이션/**","AI_core_pjt/*/crawling/data/**","AI_core_pjt/*/frontend/public/assets/**",
        "lecture pdf/**","**/data/MNIST/**","**/data/mnist/**","**/image_stats_results/**",
        "**/ensemble/**/merge/**","**/best_adapter/**","**/model/*.safetensors"),
    "Nekerworld/Solar-Atlas": ("crawling/data/**","backend/rag_runtime/wiki_cache/**",
        "backend/rag_runtime/documents/**","frontend/public/assets/**","frontend/sky-static/**","data/**"),
    "Nekerworld/Solar-Atlas-2.0": ("crawling/data/**","backend/rag_runtime/wiki_cache/**",
        "backend/rag_runtime/documents/**","frontend/public/assets/**","data/**"),
    "Nekerworld/TUK": ("**/data/MNIST/**","**/data/mnist/**","**/강의자료/**","**/실습자료/**",
        "**/report/**","**/Report/**"),
    "Nekerworld/Plocal": ("localhub/src/data/**",),
    "Nekerworld/Smart_Farm": ("dist/**","ipk/**"),
    "Nekerworld/PBDA_Teamproject": ("EDA/retailrocket_recommendation_report.html",
        "**/results/**","**/report_history/**","**/professor_materials/**","**/viz/**"),
    "Nekerworld/ERD_Generator": ("src/data/**","src/i18n/**","src/templates/**"),
    "Nekerworld/SSAFY_AI_Challenge": ("model/**/tokenizer*","model/**/vocab*","model/**/merges*"),
    "Nekerworld/WON-Solution-Pass": ("androidflutterproject/android/**",
        "androidflutterproject/ios/**","androidflutterproject/linux/**",
        "androidflutterproject/macos/**","androidflutterproject/windows/**",
        "androidflutterproject/web/**","androidflutterproject/.dart_tool/**",
        "androidflutterproject/.flutter-plugins*"),
    "Nekerworld/Nekerworld": ("assets/**",),
    "Find-For-You/Web-Monitoring": ("streamlit/dummy_data.json",),
    "Wake-Up-It-s-a-Hospital/Smart-Feature": ("**/dummy_data/**",),
}
# Only engine-specific scripts are excluded; normal Python code in EU5 remains.
ENGINE_PATHS = ("in_game/**","main_menu/**","era_*/in_game/**","era_*/main_menu/**")
ENGINE_SUFFIXES = {".txt",".gui",".yml",".yaml"}
REPO_SOURCE_ONLY = {
    "Nekerworld/Smart_Farm": ("src/**",),
}
def matches(path, pattern):
    # fnmatch does not require a slash to match a wildcard; **/ must also match root.
    return fnmatch.fnmatchcase(path, pattern) or (
        pattern.startswith("**/") and fnmatch.fnmatchcase(path, pattern[3:])
    )

def classify(repo, path):
    parts = path.split("/")
    lowparts = [p.lower() for p in parts]
    if any(p in EXCLUDED_DIRS for p in lowparts[:-1]):
        return None, "dependency/build/cache"
    low = path.lower()
    if low.endswith(EXCLUDED_SUFFIXES):
        return None, "generated/minified"
    if parts[-1].lower() in ("package-lock.json","yarn.lock","pubspec.lock"):
        return None, "dependency manifest"
    if any(matches(path, p) for p in EXCLUDED_PATHS.get(repo, ())):
        return None, "repository exclusion"
    if repo in REPO_SOURCE_ONLY and not any(matches(path,p) for p in REPO_SOURCE_ONLY[repo]):
        return None, "outside source tree"
    if repo == "Nekerworld/EU5-The-Singularity-is-Near":
        if PurePosixPath(path).suffix.lower() in ENGINE_SUFFIXES and any(matches(path,p) for p in ENGINE_PATHS):
            return None, "unsupported game engine"
    ext = PurePosixPath(path).suffix.lower()
    if ext not in EXTENSIONS:
        return None, "non-source/unsupported"
    if parts[-1].lower().startswith("readme"):
        return None, "documentation"
    return EXTENSIONS[ext], "source"

def notebook_code_bytes(endpoint, sha):
    """Count only Python code-cell source, not outputs, attachments or metadata."""
    blob = request(endpoint + "/git/blobs/" + urllib.parse.quote(sha, safe=""))
    if blob.get("encoding") != "base64":
        raise RuntimeError("Unexpected notebook blob encoding: " + sha)
    notebook = json.loads(base64.b64decode(blob["content"]).decode("utf-8"))
    language = notebook.get("metadata", {}).get("language_info", {}).get("name")
    if not language:
        language = notebook.get("metadata", {}).get("kernelspec", {}).get("language")
    if language and language.lower() != "python":
        return 0
    code = []
    for cell in notebook.get("cells", []):
        if cell.get("cell_type") == "code":
            source = cell.get("source", "")
            code.append("".join(source) if isinstance(source, list) else source)
    return sum(len(source.encode("utf-8")) for source in code)

def collect():
    totals = Counter()
    included_repos = 0
    seen = set()
    audit = {}
    for repo in repo_list():
        name = repo["full_name"]
        branch = repo.get("default_branch")
        if not branch or repo.get("empty"):
            continue
        endpoint = "/repos/" + "/".join(map(urllib.parse.quote, name.split("/")))
        tree = request(endpoint + "/git/trees/" + urllib.parse.quote(branch, safe="") + "?recursive=1")
        if tree.get("truncated"):
            raise RuntimeError("Truncated Git tree; refusing incomplete statistics: " + name)
        if "tree" not in tree:
            raise RuntimeError("No file tree returned for " + name)
        stats = {"included_files":0,"included_bytes":0,"excluded_files":0,
                 "excluded_bytes":0,"reasons":Counter(),"languages":Counter()}
        for f in tree["tree"]:
            if f.get("type") != "blob":
                continue
            path = f["path"]
            size = f.get("size", 0)
            language, reason = classify(name, path)
            if language:
                sha = f.get("sha")
                # Cross-repository, same-language exact blob deduplication.
                key = (language, sha)
                if sha and key in seen:
                    language, reason = None, "duplicate blob"
                else:
                    if sha:
                        seen.add(key)
            if language and path.lower().endswith(".ipynb"):
                source_size = notebook_code_bytes(endpoint, sha)
                excluded_size = size - source_size
                stats["excluded_bytes"] += excluded_size
                stats["reasons"]["notebook outputs/metadata"] += excluded_size
                size = source_size
                if not size:
                    language, reason = None, "notebook without Python code"
            if language:
                totals[language] += size
                stats["languages"][language] += size
                stats["included_files"] += 1
                stats["included_bytes"] += size
            else:
                stats["excluded_files"] += 1
                stats["excluded_bytes"] += size
                stats["reasons"][reason] += size
        audit[name] = {k:dict(v) if isinstance(v,Counter) else v for k,v in stats.items()}
        if stats["included_files"]:
            included_repos += 1
    os.makedirs("assets", exist_ok=True)
    with open("assets/language-audit.json","w",encoding="utf-8") as out:
        json.dump({"repositories":audit,"totals":dict(totals),
                   "included_repositories":included_repos},out,ensure_ascii=False,indent=2)
    return totals, included_repos
