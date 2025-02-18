# -*- coding: utf-8 -*- 

__project__ = "Image To Webp"
__version__ = "1.0.0"
__author__ = "Mefamex"
__email__ = "info@mefamex.com"
__url__ = "https://mefamex.com/projects/image_to_webp/"
__license__ = "MIT"
__description__ = "Image To Webp, çalıştığı klasordeki tüm resimleri webp formatına dönüştürmenizi sağlayan bir Python projesidir."
__url_github__ = "https://github.com/mefamex/image_to_webp"
__status__ = "Production"
__date__ = "2025-02-09"
__date_modify__ = "2025-02-09"
__python_version__ = ">=3.13" 
__dependencies__ = {
    "python": ">=3.13",
    "pillow": ">=11.1.0" ,
    "roboflow": ">=1.1.53"
}

___doc___ = """
Proje Adi: Image To Webp
Yazar: Mefamex (info@mefamex.com) (https://mefamex.com)
Lisans: MIT

Aciklama:
Image To Webp, çalıştığı klasordeki tüm resimleri webp formatına dönüştürmenizi sağlayan bir Python projesidir.


Ozellikler: 
    - Resimleri webp formatına dönüştürme
    - Alt dizinleri kontrol etme
    - Dosya isimlerini kontrol etme (. ile basliyanlar alinmaz)
    - Resimleri dönüştürürken kalite ayarlaması
    - Resimleri dönüştürürken dosya uzantısı kontrolü


Kurulum:
    - 1-) dizinde image_to_webp.exe calistirma
    - 2-) Proje klonlama: git clone https://github.com/mefamex/image_to_webp.git
        - Gerekli bağimliliklari kurma: pip install -r requirements.txt
        - Proje calistirma: python main.py

"""



import os, sys
from time import sleep
from PIL import Image

"""
dont forget to update pillow and roboflow
"""

def png_to_webp(input_path:str, quality:int=80):
    """
    Converts PNG image to WEBP format.
    :param input_path: Path to the input image file (PNG, JPG, etc.)
    :type input_path: str
    
    :param quality: Quality of WEBP output (0-100), defaults to 80 
    :type quality: int
    
    :return: saved path
    :type return: str
    """
    try:
        img = Image.open(input_path)
        image_dir = os.path.dirname(input_path)
        saving_dir = os.path.join(image_dir, "converted")
        new_name = os.path.basename(input_path)
        new_name = new_name[:new_name.rfind('.')] + ".webp"  
        new_path = os.path.join(saving_dir, new_name)
        if not os.path.exists(saving_dir): os.mkdir(saving_dir)
        img.save(new_path, "webp", quality=quality)
        print("+ DONE :",os.path.basename(input_path),new_path)
        return new_path
    except Exception as e: print(f"Hata oluştu {input_path} , {new_path} : {e}")


# Kullanım örneği:
#input_image = "input.png"
#png_to_webp(input_image)

converted={}
passed={}
NotImage = {}

for path, folder, files in os.walk(os.getcwd()):
    isPass = False
    for folder in path.split(os.getcwd())[1].split(os.sep):
        if folder.startswith('.'):
            passed[folder] = path
            isPass = True
            break
    if isPass: continue
    
    
    print("")
    isExistImageFiles = False
    for file in files:
        combined_path= os.path.join(path,file)
        if os.path.splitext(combined_path)[1].lower() in Image.registered_extensions() and not file.startswith("."):
            try:
                with Image.open(combined_path) as img:
                    saved_path = png_to_webp(combined_path)
                    converted[os.path.basename(combined_path)] = saved_path
            except Exception as e:print(f"Hata oluştu {combined_path} : {e}")
        else:
            print("- PASS :", combined_path)
            NotImage[file] = combined_path
        
    
sleep(1)
print("\n\n\n=============================================================\n     CONVERTING DONE \n=============================================================\n\n")
sleep(1)


if len(NotImage)>0:
    print("     PASSED FILES (not image or starts with '.'):\n")
    for q in NotImage: 
        print(f"{q} -> {NotImage[q].split(os.getcwd())[1]}")
        sleep(0.1)
else: print("No files were found without the image extension.")

print("\n=============================================================\n")
sleep(1)


if len(passed)>0:
    print("\n\n     PASSED FOLDERS: (starts with '.')\n")
    for q in passed: 
        print(f"{q} -> {passed[q].split(os.getcwd())[1]}")
        sleep(0.1)
else: print("No folders were skipped")

print("\n=============================================================\n")
sleep(1)


if len(converted)>0:
    print("\n\n     CONVERTED FILES:\n")
    for q in converted: 
        print(f"{q} -> {converted[q].split(os.getcwd())[1]}")
        sleep(0.1)
else: print("No Files converted")

print("\n=============================================================\n")

print("\n   exit program...\n")

sleep(100000)
