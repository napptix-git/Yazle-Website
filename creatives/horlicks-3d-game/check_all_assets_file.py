import re
import urllib.request
import urllib.error

ASSET_BASE = "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze"

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/ThreeMaze-Standalone/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r'\$\{ASSET_BASE\}(/[^"\']*)', content)

with open('c:/Users/krish/OneDrive/Desktop/game of gamer/asset_check_result.txt', 'w', encoding='utf-8') as out:
    out.write(f"Found {len(urls)} URLs.\n")
    for path in urls:
        full_url = ASSET_BASE + path
        try:
            with urllib.request.urlopen(full_url) as response:
                pass 
        except urllib.error.HTTPError as e:
            out.write(f"{e.code} {path}\n")
        except Exception as e:
            out.write(f"Error: {e} {path}\n")
