import re
import urllib.request
import urllib.error

ASSET_BASE = "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze"

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract URLs like `${ASSET_BASE}/...`
urls = re.findall(r'\$\{ASSET_BASE\}(/[^"\']*)', content)

print(f"Found {len(urls)} URLs.")

for path in urls:
    full_url = ASSET_BASE + path
    try:
        with urllib.request.urlopen(full_url) as response:
            pass # print(f"200 {path}")
    except urllib.error.HTTPError as e:
        print(f"{e.code} {path}")
    except Exception as e:
        print(f"Error: {e} {path}")
