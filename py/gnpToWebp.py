# coding: utf-8

__author__ = "Mefamex"
__modified_at__ = "2025-09-13"

from PIL import Image
import os

"""
dont forget to update pillow and roboflow
"""

QUALITY = 80  # 0-100
HEIGHT = 1080  # max height

def png_to_webp(input_file, output_file, quality=QUALITY):
    """
    PNG görüntüsünü WEBP formatına dönüştürür.

    Args:
        input_file (str): Giriş PNG dosya yolu.
        output_file (str): Çıkış WEBP dosya yolu.
        quality (int, optional): Kalite değeri (0-100). Varsayılan: 85.
    """

    try:
        # PNG görüntüsünü aç
        img = Image.open(input_file)
        
        # Çıkış dizini yoksa oluştur
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        # WEBP formatında kaydet
        # Oran ve hedef boyut hesaplama (doğru genişlik = height * ratio)
        img_ratio = img.width / img.height
        height = min(img.height, HEIGHT)
        width = int(height * img_ratio)

        try: resample_filter = Image.Resampling.LANCZOS
        except AttributeError: resample_filter = getattr(Image, "LANCZOS", getattr(Image, "ANTIALIAS", 1))

        img = img.resize((width, height), resample=resample_filter)
        
        img.save(output_file, "webp", quality=quality)
        print(f"Dönüştürme başarılı: {output_file}")

    except Exception as e: print(f"Hata oluştu: {e}")


# Kullanım örneği:
# input_image = "input.png"
# output_image = "output.webp"
# png_to_webp(input_image, output_image)


for q1, q2, q3 in os.walk(os.getcwd()):
    for q in q3:
        png_to_webp(os.path.join(q1,q),  os.path.join(q1,f"q{QUALITY}-{HEIGHT}p", "".join(q.split(".")[:-1]) + ".webp"))
    break
