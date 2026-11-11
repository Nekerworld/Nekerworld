#!/usr/bin/env python3
"""Generate a responsive SVG donut with up to 50 language labels."""
import math
from collections import Counter
from pathlib import Path
from language_stats import repo_list, request, esc, PALETTE
import urllib.error
import urllib.parse

OUTPUT = Path("assets/languages-donut.svg")
MAX_LANGUAGES = 50
FALLBACK = ["#58a6ff", "#a371f7", "#3fb950", "#f0883e", "#db61a2", "#79c0ff"]

def render(totals, count):
    entries = sorted(totals.items(), key=lambda x: (-x[1], x[0]))
    if not entries:
        raise RuntimeError("No language statistics available")
    selected = entries[:MAX_LANGUAGES]
    omitted = sum(v for _, v in entries[MAX_LANGUAGES:])
    if omitted:
        # Keep 50 legend entries at most, including Other.
        selected = entries[:MAX_LANGUAGES - 1] + [("Other", sum(v for _, v in entries[MAX_LANGUAGES - 1:]))]
    total = sum(totals.values())
    n = len(selected)
    columns = 2
    rows = math.ceil(n / columns)
    height = max(420, 360 + rows * 30)
    cx, cy, radius, stroke = 380, 174, 103, 42
    circumference = 2 * math.pi * radius
    shapes = [f'<circle cx="{cx}" cy="{cy}" r="{radius}" fill="none" stroke="#30363d" stroke-width="{stroke}"/>']
    labels = []
    offset = 0.0
    for i, (lang, value) in enumerate(selected):
        fraction = value / total
        color = "#8b949e" if lang == "Other" else PALETTE.get(lang, FALLBACK[i % len(FALLBACK)])
        length = fraction * circumference
        shapes.append(f'<circle cx="{cx}" cy="{cy}" r="{radius}" fill="none" stroke="{color}" stroke-width="{stroke}" stroke-dasharray="{length:.5f} {circumference:.5f}" stroke-dashoffset="{-offset:.5f}" transform="rotate(-90 {cx} {cy})"/>')
        offset += length
        col, row = i % 2, i // 2
        x, y = 30 + col * 380, 352 + row * 30
        labels.append(f'<circle cx="{x+6}" cy="{y-5}" r="6" fill="{color}"/>'
                      f'<text x="{x+21}" y="{y}" fill="#c9d1d9" font-size="15">{esc(lang)}</text>'
                      f'<text x="{x+332}" y="{y}" fill="#8b949e" font-size="14" text-anchor="end">{fraction*100:.2f}%</text>')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="760" height="{height}" viewBox="0 0 760 {height}" role="img" aria-label="Programming languages donut chart across personal and organization repositories">
<title>Top Languages</title>
<rect width="760" height="{height}" rx="12" fill="#0d1117"/>
<text x="30" y="38" fill="#e6edf3" font-family="Arial, sans-serif" font-size="22" font-weight="bold">Languages Across My Repositories</text>
<text x="730" y="62" text-anchor="end" fill="#8b949e" font-family="Arial, sans-serif" font-size="13">{count} repositories</text>
<g>{''.join(shapes)}</g>
<text x="{cx}" y="{cy-5}" text-anchor="middle" fill="#e6edf3" font-size="26" font-weight="bold" font-family="Arial, sans-serif">{n}</text>
<text x="{cx}" y="{cy+18}" text-anchor="middle" fill="#8b949e" font-size="13" font-family="Arial, sans-serif">languages</text>
<g font-family="Arial, sans-serif">{''.join(labels)}</g>
<text x="30" y="{height-17}" fill="#8b949e" font-size="12" font-family="Arial, sans-serif">GitHub Linguist bytes · entire repositories including team contributions</text>
</svg>'''
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(svg, encoding="utf-8")

def main():
    totals = Counter()
    completed = 0
    for repo in repo_list():
        name = repo["full_name"]
        try:
            data = request("/repos/" + "/".join(map(urllib.parse.quote, name.split("/"))) + "/languages")
        except urllib.error.HTTPError as exc:
            print(f"Skipping {name}: HTTP {exc.code}")
            continue
        if data:
            totals.update(data)
            completed += 1
    render(totals, completed)
    print(f"Generated {OUTPUT} for {completed} repositories")

if __name__ == "__main__":
    main()
