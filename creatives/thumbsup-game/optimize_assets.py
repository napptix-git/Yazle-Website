import os
from PIL import Image

def optimize_assets():
    assets_dir = 'assets'
    tiles_dir = os.path.join(assets_dir, 'tiles')
    
    # Ensure PIL is installed
    try:
        import PIL
    except ImportError:
        print("Pillow library not found. Please install it using: pip install Pillow")
        return

    print(f"Scanning {assets_dir} for PNG files...")
    
    for filename in os.listdir(assets_dir):
        if filename.endswith('.png'):
            file_path = os.path.join(assets_dir, filename)
            
            # Skip tiles directory if it happens to be processed (though listdir is non-recursive)
            if os.path.isdir(file_path):
                continue
                
            print(f"Converting {filename} to WebP...")
            
            try:
                with Image.open(file_path) as img:
                    # Create new filename with .webp extension
                    webp_filename = os.path.splitext(filename)[0] + '.webp'
                    webp_path = os.path.join(assets_dir, webp_filename)
                    
                    # Save as WebP with 80% quality
                    img.save(webp_path, 'WEBP', quality=80)
                    
                    print(f"Saved {webp_filename}")
                
                # Remove original PNG
                os.remove(file_path)
                print(f"Removed {filename}")
                
            except Exception as e:
                print(f"Error converting {filename}: {e}")

    print("Asset optimization complete!")

if __name__ == "__main__":
    optimize_assets()
