with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'fbxLoader =' in line or 'fbxLoader=' in line or 'const fbxLoader' in line or 'let fbxLoader' in line:
            print(f"Def Line {i+1}: {line.strip()}")
        if 'BuildTrap(' in line:
            print(f"Call Line {i+1}: {line.strip()}")
