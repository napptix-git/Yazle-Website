import re

CDN_BASE = "https://e5387662.horlicks-3d-game.pages.dev"

# Read the working index.html
with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ALL relative paths - be more aggressive

# 1. CSS url() patterns with ../
content = re.sub(r'url\s*\(\s*"\.\./', f'url("{CDN_BASE}/', content)
content = re.sub(r"url\s*\(\s*'\.\.\/", f"url('{CDN_BASE}/", content)
content = re.sub(r'url\s*\(\s*\.\./', f'url({CDN_BASE}/', content)

# 2. JS .load() with assets/ (single quotes, double quotes, backticks)
content = re.sub(r"\.load\s*\(\s*'assets/", f".load('{CDN_BASE}/assets/", content)
content = re.sub(r'\.load\s*\(\s*"assets/', f'.load("{CDN_BASE}/assets/', content)
content = re.sub(r'\.load\s*\(\s*`assets/', f'.load(`{CDN_BASE}/assets/', content)

# 3. JS string literals with assets/ path
content = re.sub(r"=\s*'assets/", f"= '{CDN_BASE}/assets/", content)
content = re.sub(r'=\s*"assets/', f'= "{CDN_BASE}/assets/', content)
content = re.sub(r'=\s*`assets/', f'= `{CDN_BASE}/assets/', content)

# 4. Replace script src paths
content = re.sub(r'src\s*=\s*"js/', f'src="{CDN_BASE}/js/', content)
content = re.sub(r"src\s*=\s*'js/", f"src='{CDN_BASE}/js/", content)

# 5. Any remaining ../assets paths
content = re.sub(r"'\.\.\/assets\/", f"'{CDN_BASE}/assets/", content)
content = re.sub(r'"\.\.\/assets\/', f'"{CDN_BASE}/assets/', content)
content = re.sub(r'`\.\.\/assets\/', f'`{CDN_BASE}/assets/', content)

# 6. Remaining assets/ without leading ./ or ../
content = re.sub(r"(?<!['\"`/])'assets/", f"'{CDN_BASE}/assets/", content)

# Write to standalone file
output_path = 'c:/Users/krish/OneDrive/Desktop/game of gamer/standalone.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify - find any remaining relative paths
remaining = re.findall(r"['\"`]assets/[^'\"` ]+", content)
if remaining:
    print("WARNING - Still found relative paths:")
    for r in remaining[:10]:
        print(f"  {r}")
else:
    print("SUCCESS - No relative asset paths remaining!")

print(f"\nCDN references: {content.count(CDN_BASE)}")
print(f"Created: standalone.html")
