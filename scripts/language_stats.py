#!/usr/bin/env python3
"""Aggregate GitHub repository language bytes and render a profile SVG."""
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

USER = os.environ.get("GITHUB_PROFILE_USER", "Nekerworld")
TOKEN = os.environ.get("GH_STATS_TOKEN") or os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN", "")
OUTPUT = Path("assets/languages.svg")
EXCLUDED = {".github"}
SKIP_FORKS = True
SKIP_ARCHIVED = True
PALETTE = {"Python": "#3572A5", "JavaScript": "#f1e05a", "TypeScript": "#3178c6", "C": "#555555", "C++": "#f34b7d", "C#": "#178600", "HTML": "#e34c26", "CSS": "#563d7c", "Java": "#b07219", "Jupyter Notebook": "#DA5B0B", "Shell": "#89e051", "Verilog": "#b2b7f8", "Vue": "#41b883", "Dart": "#00B4AB", "Kotlin": "#A97BFF", "Go": "#00ADD8", "Rust": "#dea584", "PHP": "#4F5D95"}

def request(path):
    req = urllib.request.Request("https://api.github.com" + path, headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "github-language-profile",
        "X-GitHub-Api-Version": "2022-11-28",
        **({"Authorization": "Bearer " + TOKEN} if TOKEN else {}),
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)

def paged(path):
    page = 1
    while True:
        separator = "&" if "?" in path else "?"
        batch = request(path + separator + f"per_page=100&page={page}")
        if not batch:
            break
        yield from batch
        if len(batch) < 100:
            break
        page += 1

def repo_list():
    """Only explicitly selected personal and organization repositories.

    Private repositories require LANGUAGE_STATS_TOKEN with appropriate access.
    """
    if not TOKEN:
        raise RuntimeError("LANGUAGE_STATS_TOKEN is required to include private repositories")
    account = request("/user")
    if account.get("login", "").lower() != USER.lower():
        raise RuntimeError(f"Token belongs to {account.get('login')}, expected {USER}")

    repos = {}
    # Include all owned personal repositories, public and private.
    for r in paged("/user/repos?affiliation=owner&visibility=all"):
        if r["owner"]["login"].lower() == USER.lower():
            repos[r["full_name"]] = r

    # Include every accessible repository in these two organizations.
    for org in ("Find-For-You", "KM-coporation"):
        for r in paged("/orgs/" + urllib.parse.quote(org) + "/repos?type=all"):
            repos[r["full_name"]] = r

    # Only these specific repositories from the other organizations.
    selected = (
        "Wake-Up-It-s-a-Hospital/Smart-Feature",
        "Wake-Up-It-s-a-Hospital/Distance-Control",
        "2024-Winter-BootCamp-TeamD/review-Frontend",
    )
    for name in selected:
        repos[name] = request("/repos/" + "/".join(map(urllib.parse.quote, name.split("/"))))

    # No fork or archived exclusions: 'all' means all accessible selected repos.
    return sorted(repos.values(), key=lambda r: r["full_name"].lower())

def normalize_languages(languages):
    """Exclude G-code, Wolfram and CMake; merge Jupyter Notebook into Python."""
    result = Counter()
    for lang, size in languages.items():
        if lang.lower() in ("g-code", "wolfram language", "cmake"):
            continue
        result["Python" if lang == "Jupyter Notebook" else lang] += size
    return result

def esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))

def render(totals, included):
    total = sum(totals.values())
    if not total:
        raise RuntimeError("No language data. Verify token and repository access.")
    # Aggregate small categories as Other, keeping the chart readable.
    ranking = sorted(totals.items(), key=lambda p: p[1], reverse=True)
    head = [(lang, amount) for lang, amount in ranking if amount / total >= 0.02][:10]
    rest = total - sum(amount for _, amount in head)
    if rest > 0:
        head.append(("Other", rest))
    width = 860
    x = 24
    pieces = []
    for lang, amount in head:
        seg = width * amount / total
        color = PALETTE.get(lang, "#8892a0") if lang != "Other" else "#adb5bd"
        pieces.append(f'<rect x="{x:.2f}" y="58" width="{seg:.2f}" height="28" fill="{color}"/>')
        x += seg
    legend = []
    # A two-column legend, each with name and exact percentage.
    for i, (lang, amount) in enumerate(head):
        col, row = i % 2, i // 2
        lx, ly = 24 + 440 * col, 120 + row * 29
        color = PALETTE.get(lang, "#8892a0") if lang != "Other" else "#adb5bd"
        legend.append(f'<circle cx="{lx+6}" cy="{ly-4}" r="6" fill="{color}"/>')
        legend.append(f'<text x="{lx+20}" y="{ly}" font-size="14" fill="#c9d1d9">{esc(lang)}  {amount / total * 100:.1f}%</text>')
    height = 146 + 29 * ((len(head) + 1) // 2)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="908" height="{height}" viewBox="0 0 908 {height}" role="img" aria-label="Aggregated repository programming languages">
<rect width="908" height="{height}" rx="12" fill="#0d1117"/>
<text x="24" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#e6edf3">Languages Across My Repositories</text>
<text x="884" y="30" text-anchor="end" font-family="Arial, sans-serif" font-size="12" fill="#8b949e">{included} repositories</text>
<clipPath id="barclip"><rect x="24" y="58" width="860" height="28" rx="8"/></clipPath>
<g clip-path="url(#barclip)">{''.join(pieces)}</g>
<g font-family="Arial, sans-serif">{''.join(legend)}</g>
<text x="24" y="{height-15}" font-family="Arial, sans-serif" font-size="11" fill="#8b949e">GitHub Linguist bytes · entire repositories, including team contributions</text>
</svg>'''
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(svg, encoding="utf-8")

def main():
    totals = Counter()
    repos = repo_list()
    completed = 0
    for repo in repos:
        full = repo["full_name"]
        try:
            langs = request("/repos/" + "/".join(map(urllib.parse.quote, full.split("/"))) + "/languages")
        except urllib.error.HTTPError as exc:
            raise RuntimeError(f"Cannot read language data for {full}: HTTP {exc.code}") from exc
        if langs:
            totals.update(normalize_languages(langs))
            completed += 1
    render(totals, completed)
    print(f"Generated {OUTPUT}: {completed} repositories, {len(totals)} languages")

if __name__ == "__main__":
    main()
