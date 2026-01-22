import re

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/loads.txt', 'w', encoding='utf-8') as out:
    for i, line in enumerate(lines):
        if '.load(' in line:
            out.write(f"Line {i+1}: {line.strip()}\n")
