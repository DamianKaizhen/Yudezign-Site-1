import glob, os, sys
from PIL import Image, ImageFilter, ImageEnhance
src, dst = sys.argv[1], sys.argv[2]
for f in glob.glob(os.path.join(src, "*.jpg")):
    im = Image.open(f).convert("RGB")
    im = im.filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(1.1))
    im = ImageEnhance.Color(im).enhance(0.72)
    im.save(os.path.join(dst, os.path.basename(f)), quality=95, optimize=True)
    print("post", os.path.basename(f), im.size)
