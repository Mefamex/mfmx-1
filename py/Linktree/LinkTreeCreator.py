#!/usr/bin/env python3 
# -*- coding: utf-8 -*- 

"""
===========================================================
                Link Tree Creator For Website
===========================================================

Description:
    Bu proje, bir web sitesi için dizinlerdeki tüm .html dosyalarını tarayarak, kolay gezinme ve 
    erişim için bir link ağacı (link tree) oluşturur. Dizin gezintisi, dosya işleme ve JSON 
    çıktısı üretme gibi özellikler içerir.

Author:
    @mefamex (info@mefamex.com) (https://mefamex.com)

Features: 
    - Belirtilen ana dizinden başlayarak tüm alt dizinlerdeki .html dosyalarını bulur.
    - Her klasör ve dosya için isim, yol, url, tarih ve göreli yol bilgilerini toplar.
    - Dizin ve dosya yapısını ağaç şeklinde JSON formatında dışa aktarır.
    - İstenmeyen dizin ve dosyaları hariç tutmak için filtreleme imkanı sunar.
    - Her dosya ve klasör için tam URL oluşturur.
    - Çıktı dosyasını belirtilen dizine kaydeder.

Modules:
    - os      : Dosya ve dizin işlemleri için kullanılır.
    - sys     : Sistem ile ilgili işlemler için kullanılır.
    - json    : JSON dosyası oluşturmak ve okumak için kullanılır.
    - datetime: Dosya tarih bilgilerini almak için kullanılır.
    - pathlib : Dosya ve dizin yollarını yönetmek için kullanılır.
    - typing  : Tip ipuçları için kullanılır.

Classes:
    - Walker_link    : Tek bir dosyanın (özellikle .html) bilgilerini tutar ve JSON'a dönüştürür.
    - Walker_path    : Bir dizinin bilgilerini, alt dizinlerini ve içindeki dosyaları tutar.
    - LinkTreeCreator: Link ağacını oluşturan ana sınıf; dizinleri tarar, verileri toplar ve JSON çıktısı üretir.

Functions:
    - Walker_link.to_dict()            : Walker_link nesnesini sözlüğe çevirir.
    - Walker_path.to_dict()            : Walker_path nesnesini sözlüğe çevirir.
    - LinkTreeCreator.walker(root)     : Dizinleri ve dosyaları özyinelemeli olarak tarar.
    - LinkTreeCreator.print_link_tree(): Oluşturulan link ağacını ekrana yazdırır.
    - LinkTreeCreator.save_link_tree() : Link ağacını JSON dosyasına kaydeder.

Usage:
    1. Ana dizini ve çıktı dizinini belirleyin.
    2. Gerekirse hariç tutulacak dizin ve dosya adlarını girin.
    3. Scripti çalıştırın: `python LinkTreeCreator-v1.0.4.py`
    4. Sonuç olarak belirtilen dizinde `link_tree.json` dosyası oluşacaktır.

Requirements:
    - Python 3.8 veya üstü
    - Dependencies:
        - Build-in : os, json, 
        - datetime, pathlib, typing

Installation:
    1. Dosyayı bir .py dosyası olarak kaydedin.
    2. Gerekli bağımlılıklar standart kütüphane olduğu için ek yükleme gerekmez.
    3. `if __name__ == "__main__":` bloğunu ihtiyaca göre düzenleyin.
    4. Terminalde çalıştırın: `python LinkTreeCreator-v1.0.4.py`

Documentation: None

License: MIT Lisansı (https://opensource.org/licenses/MIT)

Changelog:
    - 1.0.0 (2025-05-03): Ilk sürüm
    - 1.0.1 (2025-05-03): Dosya yolu -relative_path- ile oluşan hata giderildi. 
    - 1.0.3 (2025-07-14): Değişken türleri düzenlendi, Walker_path url ataması hatası düzeltildi.
    - 1.0.4 (2025-07-18): Module_docs düzenlendi. `Walker_link` ve `Walker_path` sınıflarındaki `full_url ` değişkeni düzenlendi.

Contributors: None

Contact:
    - E-mail: info@mefamex.com
    - GitHub: https://github.com/Mefamex 
    - Web   : https://mefamex.com/contact/

Additional Information: None

Notes:
    - Bu modul, `https://mefamex.com` adresi için özel olarak tasarlanmıştır.

Disclaimer and Legal Notice:
    Bu yazılım, herhangi bir garanti olmaksızın "olduğu gibi" sağlanmaktadır. Yazar, bu yazılımın kullanımı sonucunda oluşabilecek herhangi bir zarardan sorumlu değildir. Kullanıcılar, yazılımı kendi sorumlulukları altında kullanmalıdır.
    Bu yazılım, açık kaynak lisansı altında dağıtılmaktadır ve kullanıcılar, lisans koşullarına uymakla yükümlüdür. Yazılımın herhangi bir şekilde değiştirilmesi, dağıtılması veya kullanılması, lisans koşullarına uygun olarak yapılmalıdır.
===========================================================
"""

__version__ = "1.0.4"
__author__ = "@mefamex"
__email__ = "info@mefamex.com"
__license__ = "MIT"
__status__ = "PRODUCTION"  

__project_name__ = "LinkTreeCreator"
__url__ = "https://mefamex.com/py/Linktree/LinkTreeCreator.py"
__url_github__ = "https://github.com/Mefamex/python-code-snippets"
__copyright__ = "Copyright (c) 2025 Mefamex"
__description__ = "Bir web sitesi için dizinlerdeki tüm .html dosyalarını tarayarak link ağacı (link tree) oluşturan Python uygulaması."
__date__ = "2025-05-03"
__date_modify__ = "2025-07-18"
__python_version__ = ">=3.8"
__dependencies__ = {
    "python": ">=3.8",
    "os": None,
    "json": None,
    "datetime": None,
    "pathlib": None,
    "typing": None,
}

print((__doc__ or "") + ("="*60 + "\n")*2)


import os, json, datetime
from pathlib import Path
from typing import Optional



BASE_URL = "https://mefamex.com" # base url for the links

class Walker_link:
    def __init__(self, name: str, path: str, url: str, date: str, relative_path : str):
        self.name : str = name
        self.path : str = path
        self.url  : str = url
        self.date : str = date # format = YYYY-MM-DD 
        self.relative_path : str = relative_path 
        self.full_url = lambda : BASE_URL + "/" + self.url if self.url else None
        
    
    def to_dict(self):
        result = {
            "name": self.name,
            "url": self.url,
            "date": self.date,
            "relative_path": self.relative_path,
            "full_url": self.full_url(),
        }
        if hasattr(self, 'path') and self.path: result["path"] = self.path
        return result

class Walker_path:
    def __init__(self, name: str, path: str, url: str, date: str, relative_path : str):
        self.name : str = name
        self.path : str = path
        self.url  : str = url
        self.date : str = date # format = YYYY-MM-DD 
        self.relative_path : str = relative_path 
        self.full_url = lambda : BASE_URL + "/" + self.url if self.url else None
        self.children : list[Walker_path] = [] 
        self.files    : list[Walker_link] = []
        
    def to_dict(self):
        result = {
            "name": self.name,
            "url": self.url,
            "date": self.date,
            "relative_path": self.relative_path,
            "full_url": self.full_url(),
            "children": [child.to_dict() for child in self.children],
            "files": [file.to_dict() for file in self.files],
        }
        if hasattr(self, 'path') and self.path: result["path"] = self.path
        return result



class LinkTreeCreator:
    def __init__(self, base_dir: Path = Path(os.getcwd()), output_dir: Path = Path(os.getcwd()), output_file: Path = Path("link_tree.json"), passDirs: list= [], passFiles : list= []) -> None:
        # check base_dir 
        self.base_dir : Path = Path(base_dir)
        if not self.base_dir.exists(): raise FileNotFoundError(f"Base directory '{self.base_dir}' does not exist.")
        print(f"Base directory: '{self.base_dir}'")
        
        # check output_dir
        self.output_dir : Path = Path(output_dir)
        if not self.output_dir.exists():
            try:
                self.output_dir.mkdir(parents=True, exist_ok=True)
                print(f"Output directory '{self.output_dir}' created.")
            except Exception as e:
                raise OSError(f"Could not create output directory '{self.output_dir}': {e}")
        else: print(f"Output directory already exists: '{self.output_dir}' ")
        
        if not isinstance(passDirs, list): raise TypeError("passDirs must be a list.")
        self.passDirs : list = passDirs if passDirs else []
        self.passFiles : list = passFiles if passFiles else []
        
        self.output_file : Path = self.output_dir / output_file
        self.link_tree : dict = {}
        
        self.walker(base_dir)
        # self.print_link_tree()
        self.save_link_tree()
        

    def walker(self, root : Path) -> Optional[Walker_path]  :
        # get directories and files in the root directory
        with os.scandir(root) as entries: dirs = [entry.name for entry in entries if entry.is_dir()]
        with os.scandir(root) as entries: files = [entry.name for entry in entries if entry.is_file()]
        
        # Skip directories that should be ignored
        relative_path = os.path.relpath(root, self.base_dir)
        
        # Skip directories based on various conditions
        if (any(dir in str(root) for dir in self.passDirs) or not os.path.isdir(root) or os.path.islink(root) or any(part.startswith(".") for part in Path(root).parts) or not any(file.endswith(".html") for file in files)) or any(dir in str(root) for dir in self.passDirs): 
            print(f"Skipped directory: {root}") 
            return None

        # create a new Walker_path object for the current directory
        name = os.path.basename(root)
        path = os.path.abspath(root)
        url = f"{relative_path.replace(os.sep, '/')}"
        # date = 00000
        date = datetime.datetime.fromtimestamp(os.path.getmtime(path)).strftime("%Y-%m-%d")
        relative_path = os.path.relpath(path, self.base_dir)
        walker_path = Walker_path(name, path, url, date, relative_path)
        
        self.link_tree[name] = walker_path
        
        
        # process each file in the directory
        files = ["index.html"] + [f for f in files if f != "index.html"] if "index.html" in files else files
        for file in files:
            if file.endswith(".html"):
                if any(file.startswith(pf) for pf in self.passFiles): 
                    print(f"Skipped file: {file}")
                    continue
                name = file
                path = os.path.join(root, file)
                relative_path = os.path.relpath(path, self.base_dir)
                url = f"{relative_path.replace(os.sep, '/')}"
                date = datetime.datetime.fromtimestamp(os.path.getmtime(path)).strftime("%Y-%m-%d")
                if date > walker_path.date or walker_path.date is None: walker_path.date = date
                walker_link = Walker_link(name, path, url, date, relative_path)
                walker_path.files.append(walker_link)
        
        for dir in dirs:
            dir_path : Path = Path(os.path.join(root, dir))
            if os.path.isdir(dir_path):
                child = self.walker(dir_path)
                if child:
                    walker_path.children.append(child)
                    if child.date > walker_path.date or walker_path.date is None: walker_path.date = child.date
        
        print(f"+++++++++++ Processed directory: {root}")
        return walker_path

    
    def print_link_tree(self) -> None :
        for name, link in self.link_tree.items():
            deep = len(link.relative_path.split(os.sep))
            print("===="*deep+"===============================")
            print(f"{" |  "*deep}Name         : {link.name}")
            print(f"{" |  "*deep}Path         : {link.path}")
            print(f"{" |  "*deep}URL          : {link.url}")
            print(f"{" |  "*deep}Date         : {link.date}")
            print(f"{" |  "*deep}Relative Path: {link.relative_path}")
            print(f"{" |  "*deep}Full URL     : {link.full_url}")
            print(f"{" |  "*deep}Files    ({len(link.files)}): {[file.name for file in link.files]}")
            print(f"{" |  "*deep}Children ({len(link.children)}): {[child.name for child in link.children]}")
            print("===="*deep+"===============================")
        
        first_item = self.link_tree.get(next(iter(self.link_tree.keys())))
        if first_item is not None:  print(json.dumps(first_item.to_dict(), indent=4, ensure_ascii=False))
        else: print("No link tree data to display.")
        return None
    
    def save_link_tree(self) -> None:
        
        first_key = next(iter(self.link_tree.keys()))
        first_level = self.link_tree.get(first_key)
        def delpath(obj):
            if hasattr(obj, 'path'): del obj.path
            if hasattr(obj, 'files'):
                for file in obj.files: del file.path
            if hasattr(obj, 'children'):
                for child in obj.children: delpath(child)
        delpath(first_level)
        if first_level is not None:
            first_level.name = BASE_URL
            json_data = first_level.to_dict()
            with open(self.output_file, "w", encoding="utf-8") as f: json.dump(json_data, f, indent=4, ensure_ascii=False)
            print(f"Link tree saved to {self.output_file}")
        else: print("No link tree data to save.")



if __name__ == "__main__":
    base_dir : Path = Path(os.getcwd())
    passDirs = ["games", "py", "src", "sweetmonstermia" ]
    passFiles = ["yandex_" ]
    output_dir : Path = Path(os.path.join(base_dir, "py", "Linktree"))
    output_file : Path = Path(output_dir / "link_tree.json")
    LinkTreeCreator(base_dir=base_dir, output_dir=output_dir, output_file=output_file, passDirs=passDirs, passFiles=passFiles)
    