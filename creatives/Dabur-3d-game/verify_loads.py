with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

missing_asset_base = []
for i, line in enumerate(lines):
    if '.load(' in line:
        # Ignore commented lines
        if line.strip().startswith('//'):
            continue
        # Check if ASSET_BASE is present
        if '${ASSET_BASE}' not in line and 'ASSET_BASE +' not in line:
             missing_asset_base.append(f"Line {i+1}: {line.strip()}")

print("Missing ASSET_BASE:")
for l in missing_asset_base:
    print(l)
