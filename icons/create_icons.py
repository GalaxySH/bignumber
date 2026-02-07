from PIL import Image, ImageDraw, ImageFont

# Create 48x48 icon
img48 = Image.new('RGB', (48, 48), color='#1f883d')
draw48 = ImageDraw.Draw(img48)
# Draw a simple # symbol
draw48.text((12, 8), '#', fill='white', font=ImageFont.load_default().font_variant(size=32))
img48.save('icon-48.png')

# Create 96x96 icon
img96 = Image.new('RGB', (96, 96), color='#1f883d')
draw96 = ImageDraw.Draw(img96)
# Draw a simple # symbol
draw96.text((24, 16), '#', fill='white', font=ImageFont.load_default().font_variant(size=64))
img96.save('icon-96.png')

print("Icons created successfully")
