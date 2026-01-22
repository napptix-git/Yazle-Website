import re

# Search for .load( calls
with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if '.load(' in line:
            print(f"Line {i+1}: {line.strip()}")

# Check Draco URL
import urllib.request
import urllib.error

url = "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze/js/draco/draco_decoder.js"
try:
    with urllib.request.urlopen(url) as response:
        print(f"Draco JS: {response.getcode()}")
except Exception as e:
    print(f"Draco JS Error: {e}")
