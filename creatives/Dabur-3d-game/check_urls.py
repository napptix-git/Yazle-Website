import urllib.request
import urllib.error

urls = [
    "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze/assets/Walls/tile111tx.glb",
    "https://e5387662.horlicks-3d-game.pages.dev/assets/Walls/tile111tx.glb",
    "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze/assets/platform.gltf",
    "https://e5387662.horlicks-3d-game.pages.dev/assets/platform.gltf"
]

for url in urls:
    try:
        with urllib.request.urlopen(url) as response:
            print(f"{response.getcode()} {url}")
    except urllib.error.HTTPError as e:
        print(f"{e.code} {url}")
    except Exception as e:
        print(f"Error: {e} {url}")
