from PIL import Image
import os

"""
dont forget to update pillow and roboflow
"""


def png_to_webp(input_file, output_file, quality=85):
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

        # WEBP formatında kaydet
        img.save(output_file, "webp", quality=quality)
        print(f"Dönüştürme başarılı: {output_file}")

    except Exception as e:
        print(f"Hata oluştu: {e}")


# Kullanım örneği:
input_image = "input.png"
output_image = "output.webp"
png_to_webp(input_image, output_image)

"""
for q1, q2, q3 in os.walk(os.getcwd()):
    for q in q3:
        png_to_webp(q, "".join(q.split(".")[:-1]) + ".webp")
    break
"""
