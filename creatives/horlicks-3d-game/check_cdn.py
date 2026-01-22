import urllib.request
import urllib.error

bases = [
    "https://e5387662.horlicks-3d-game.pages.dev",
    "https://e5387662.horlicks-3d-game.pages.dev/ThreeMaze"
]

test_files = [
    "/assets/Walls/tile111tx.glb",
    "/assets/platform.gltf",
    "/assets/rIsland.glb",
    "/js/three.min.js"
]

with open('cdn_test.txt', 'w') as out:
    for base in bases:
        out.write(f"\n=== Testing base: {base} ===\n")
        for f in test_files:
            url = base + f
            try:
                req = urllib.request.Request(url, method='HEAD')
                with urllib.request.urlopen(req, timeout=5) as response:
                    out.write(f"  200 OK: {f}\n")
            except urllib.error.HTTPError as e:
                out.write(f"  {e.code} ERROR: {f}\n")
            except Exception as e:
                out.write(f"  FAIL: {f} - {e}\n")
print("Done - check cdn_test.txt")
