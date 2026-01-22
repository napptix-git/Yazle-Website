import re

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    # Find .load(' or .load("
    matches = re.findall(r'\.load\s*\(\s*[\'"]([^\'"]+)', line)
    for match in matches:
        if not match.startswith('${ASSET_BASE}'):
            # Ignore commented lines
            if line.strip().startswith('//'):
                continue
            print(f"Line {i+1}: {match} -> {line.strip()}")
