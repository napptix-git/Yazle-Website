from PIL import Image
import os
import glob
import sys

# Set UTF-8 encoding for console output
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Define quality settings for different types of images
conversions = {
    # Critical large files - aggressive compression
    # Note: SVG will be skipped and converted manually
    # 'iPhone SE - 1.svg': {'quality': 75, 'output': 'iPhone SE - 1.webp'},
    'shot-panoramic-composition-kitchen (1).jpg': {'quality': 70, 'output': 'panorama.webp'},
    'border.png': {'quality': 85, 'output': 'border.webp'},

    # Text images
    'text.png': {'quality': 80, 'output': 'text.webp'},
    'text 3.png': {'quality': 80, 'output': 'text-3.webp'},
    'craiyon_174712_image.png': {'quality': 80, 'output': 'craiyon_174712_image.webp'},

    # CTA screen
    'iPhone SE - 2.png': {'quality': 75, 'output': 'iPhone SE - 2.webp'},

    # Bottle progression
    'milk.png': {'quality': 80, 'output': 'milk.webp'},
    'blue.png': {'quality': 80, 'output': 'blue.webp'},
    '1-3.png': {'quality': 80, 'output': '1-3.webp'},
    '1-2.png': {'quality': 80, 'output': '1-2.webp'},
    '2-3.png': {'quality': 80, 'output': '2-3.webp'},
    'r.png': {'quality': 80, 'output': 'r.webp'},

    # Pin images
    'taller.png': {'quality': 80, 'output': 'taller.webp'},
    'stronger.png': {'quality': 80, 'output': 'stronger.webp'},
    'sharper.png': {'quality': 80, 'output': 'sharper.webp'},
    'clinically proven.png': {'quality': 80, 'output': 'clinically-proven.webp'},

    # Logo
    'craiyon_131059_image.png': {'quality': 85, 'output': 'craiyon_131059_image.webp'},
}

def get_file_size_kb(filepath):
    """Get file size in KB"""
    return os.path.getsize(filepath) / 1024

print("Starting image conversion to WebP...\n")
total_before = 0
total_after = 0

for input_file, settings in conversions.items():
    if not os.path.exists(input_file):
        print(f"⚠️  Skipping {input_file} - file not found")
        continue

    try:
        output_file = settings['output']
        quality = settings['quality']

        # Get original size
        size_before = get_file_size_kb(input_file)
        total_before += size_before

        # Open and convert image
        img = Image.open(input_file)

        # Preserve transparency - convert to RGBA if has alpha, otherwise RGB
        if img.mode in ('RGBA', 'LA'):
            # Keep transparency
            img = img.convert('RGBA')
        elif img.mode == 'P':
            # Palette mode - check if has transparency
            if 'transparency' in img.info:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
        elif img.mode in ('L', 'LA'):
            # Grayscale - convert to RGBA if has alpha
            if 'A' in img.mode:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
        elif img.mode != 'RGB':
            # Any other mode, convert to RGB
            img = img.convert('RGB')

        # Save as WebP
        img.save(output_file, 'WEBP', quality=quality, method=6)

        # Get new size
        size_after = get_file_size_kb(output_file)
        total_after += size_after

        reduction = ((size_before - size_after) / size_before) * 100

        print(f"✓ {input_file}")
        print(f"  {size_before:.1f}KB → {size_after:.1f}KB (-{reduction:.1f}%)")

    except Exception as e:
        print(f"✗ Error converting {input_file}: {str(e)}")

print(f"\n{'='*60}")
print(f"Total size before: {total_before:.1f}KB ({total_before/1024:.2f}MB)")
print(f"Total size after:  {total_after:.1f}KB ({total_after/1024:.2f}MB)")
print(f"Total savings:     {total_before - total_after:.1f}KB ({(total_before - total_after)/1024:.2f}MB)")
print(f"Reduction:         {((total_before - total_after) / total_before) * 100:.1f}%")
print(f"{'='*60}")
print("\n✓ Conversion complete!")
