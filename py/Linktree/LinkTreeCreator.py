#!/usr/bin/env python3 
# -*- coding: utf-8 -*- 

__project_name__ = "LinkTreeCreator For Website"
__project_version__ = "1.0.1"
__author__ = "mefamex"
__email__ = "info@mefamex.com"
__url__ = "https://mefamex.com/projects/linktreecreator"
__license__ = "MIT"
__copyright__ = "Telif Hakki (c) 2025 mefamex"
__description__ = "LinkTreeCreator, web siteniz icin bir link agaci olusturmanizi saglayan bir Python uygulamasidir."
__url_github__ = "https://github.com/mefamex/linktreecreator"
__status__ = "Development" 
__date__ = "2025-05-03" 
__date_modify__ = "2025-05-03" 
__python_version__ = ">=3.8" 
__dependencies__ = {
    "python": ">=3.8"
}

___doc___ = """
Proje Adi: LinkTreeCreator For Website

Aciklama:
LinkTreeCreator, web siteniz icin bir link agaci olusturmanizi saglayan bir Python uygulamasidir.

Ozellikler: 
    - Verilen dizindeki her klasor içindeki .html dosyalarini okuyarak bir link agaci olusturur.
    - Her bir .html dosyasini bir link olarak ekler.
    - Çıktı olarak bir json dosyasi olusturur.

Moduller:
- os: Dosya ve dizin islemleri icin kullanilir.
- sys: Sistem ile ilgili islemler icin kullanilir.
- json: JSON dosyasi olusturmak ve okumak icin kullanilir.
- datetime: Tarih ve saat islemleri icin kullanilir.
- ...

Siniflar:
- LinkTreeCreator: Link agaci olusturmak icin gerekli olan sinif.
- ...

Fonksiyonlar:
- fonksiyon2(parametre1): [Fonksiyon 2 aciklamasi]
- ...

Kullanim:
[Projeyi nasil kullanacağinizi aciklayin. Ornekler ekleyebilirsiniz.]

Gereksinimler:
- ...
- Bağimliliklar:
    - paket1 (>= surum)
    - paket2
    - ...

Kurulum:
    - Proje klonlama: `git clone [repo adresi]` 
    - Gerekli bağimliliklari kurma: `pip install -r requirements.txt`

Belgeler: 
    - Detayli belgeler icin: `README.md` 

Lisans:
MIT Lisansi (https://opensource.org/licenses/MIT)

Yazar:
mefamex (info@mefamex.com) (https://mefamex.com)

Tarihce:
- 1.0.0 (2025-05-03): Ilk surum
- 1.0.1 (2025-05-03): dosya yolu -relative_path- ile oluşan hata giderildi. 
- 1.0.3 (2025-07-14): değişken türleri düzenlendi, Walker_path url ataması hatası düzeltildi.

Iletisim:
    - E-mail: info@mefamex.com
    - Web   : https://mefamex.com/contact/
    - GitHub: https://github.com/Mefamex 


Sorumluluk Reddi: 
    Bu yazilim "olduğu gibi" sunulmaktadir. Yazar, bu yazilimin kullanimi sonucunda ortaya cikan herhangi bir zarardan sorumlu değildir.
"""
print(___doc___+("-"*20+"\n")*2)

import os, sys, json, datetime, time
from pathlib import Path
from typing import Optional

time.sleep(1) 

BASE_URL = "https://mefamex.com" # base url for the links

class Walker_link:
    def __init__(self, name: str, path: str, url: str, date: str, relative_path : str):
        self.name : str = name
        self.path : str = path
        self.url  : str = url
        self.date : str = date # format = YYYY-MM-DD 
        self.relative_path : str = relative_path 
        self.full_url : str = BASE_URL + self.url
        
    def to_dict(self):
        result = {
            "name": self.name,
            "url": self.url,
            "date": self.date,
            "relative_path": self.relative_path,
            "full_url": self.full_url,
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
            self.full_url : str = BASE_URL + "/" + self.url 
            self.children : list[Walker_path] = [] 
            self.files    : list[Walker_link] = []
            
        def to_dict(self):
            result = {
                "name": self.name,
                "url": self.url,
                "date": self.date,
                "relative_path": self.relative_path,
                "full_url": self.full_url,
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
    