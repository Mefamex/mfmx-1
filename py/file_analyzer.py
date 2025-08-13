# -*- coding: utf-8 -*-
# Created on  : 2025-08-09
# Updated on  : 2025-08-13
# @author     : mefamex
# FOR         : folder depth file

print(
    "\n",
    "#" * 30,
    "\n"
    "**Dizin Yapısı Görselleştirme Aracı**\n\n"
    "Bu Python uygulaması, belirtilen bir dizin yolundaki tüm dosya ve dizinleri detaylı bir şekilde analiz eder.\n"
    "Dosya boyutları, oluşturulma tarihleri, dizin hiyerarşisi gibi bilgileri görsel ve metinsel olarak sunar.\n"
    "Sistem yöneticileri, geliştiriciler ve veri bilimcileri için disk kullanımını optimize etmek, dosya yönetimini\n"
    "kolaylaştırmak ve veri analizi yapmak için ideal bir araçtır.\n\n"
    "**Ana Özellikler:**\n"
    "* **Rekürsif Dizin Gezimi:** Belirtilen dizin ve tüm alt dizinlerini inceler.\n"
    "* **Detaylı Bilgi Toplama:** Dosya boyutu, oluşturulma tarihi, dizin derinliği gibi bilgileri hesaplar.\n"
    "* **Formatlı Çıkış:** Tablo şeklinde okunaklı bir terminal çıktısı sunar.\n"
    "* **Metin Dosyasına Kaydetme:** Sonuçları bir metin dosyasına kaydeder.\n"
    "* **Özelleştirilebilir:** Çıkış formatı, analiz derinliği gibi ayarlar yapılabilir.\n\n"
    "**Kullanılan Modüller:**\n"
    "* os modülü\n"
    "* datetime modülü\n\n"
    "**Uyarılar:**\n"
    "* Çok büyük dizinlerde performans düşüşü yaşanabilir.\n"
    "* Dosya erişim hakları konusunda dikkatli olunmalıdır.\n\n"
    + "#" * 82 + "\n\n"
)

__version__ = '1.0.3'
__last_modified__ = '2025-08-13'

import os,time, datetime
from pathlib import Path

# Hedef Uzantılar
TARGET_EXTENSIONS = {'txt', 'bat', 'md', 'py', 'html', 'css', 'js', 'json', 'webmanifest'}
# starts with or ends with
IGNORED_FOLDERS_NAME = {
    'out', 'build', 'dist', 'bin', 'obj', 'env', 'venv', '.venv', 'node_modules',
    '.git', '.svn', '.hg', '.idea', '.vscode', '__pycache__'
}
IGNORED_FOLDERS_STARTS_WITH = {'.', '__'}
IGNORED_FOLDERS_ENDS_WITH = { '__pycache__' }
# NAME ? 
PROJECT_NAME = "mefamex.com"  # Path(os.getcwd()).name


text = f'# Created for : {PROJECT_NAME}\n# Created on  : ' + datetime.datetime.now().isoformat(timespec='seconds') + 'Z\n'

def count_characters_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            return len(content.replace(" ", "").replace("\n", "").replace("\t", ""))
    except Exception as e:
        print(f"Hata: {file_path} dosyası okunamadı - {str(e)}")
        return 0



def create_table(results, grand_total_char, grand_total_files):
    """Tablo formatında sonuçları oluşturur"""
    
    # Verileri hazırla (char sayısına göre sıralanmış)
    table_data, sorted_exts = [], sorted(results.keys(), key=lambda ext: results[ext]['total_chars'], reverse=True)
    
    for ext in sorted_exts:
        file_count, char_count = len(results[ext]['files']), results[ext]['total_chars']
        if file_count == 0 and char_count == 0: continue
        table_data.append({ 'type': ext.upper(), 'char': f"{char_count:,}" if char_count > 0 else "---", 'file': str(file_count) if file_count > 0 else "---" })
    # Sütun genişliklerini hesapla
    type_width = max(len("TYPE"), max(len(row['type']) for row in table_data)) + 2
    char_width = max(len("CHAR"), max(len(row['char']) for row in table_data)) + 2
    file_width = max(len("FILE"), max(len(row['file']) for row in table_data)) + 2
    
    # Tablo çizimi
    separator = "|" + "=" * type_width + "|" + "=" * char_width + "|" + "=" * file_width + "|"
    header_line = f"|{'TYPE':^{type_width}}|{'CHAR':^{char_width}}|{'FILE':^{file_width}}|"

    table = f"\nANALYZING RESULTS\n\n{separator}\n{header_line}\n"
    table += "|" + "-" * type_width + "|" + "-" * char_width + "|" + "-" * file_width + "|\n"
    
    for row in table_data:
        table += f"|{row['type']:>{type_width-1}} |{row['char']:>{char_width-1}} | {row['file']:<{file_width-1}}|\n"

    table += f"{separator}\n\nTOTAL CHARS : {grand_total_char:,} \nTOTAL FILES : {grand_total_files:,}\n\n"+ f"in {PROJECT_NAME}".rjust(25) + "\n"

    return table

def check_ignored_folders(folder_name):
    ignored_folders_name = IGNORED_FOLDERS_NAME
    ignored_folders_starts_with = IGNORED_FOLDERS_STARTS_WITH
    ignored_folders_ends_with = IGNORED_FOLDERS_ENDS_WITH
    # FULL
    folder_name = folder_name.split(os.sep)[-1]
    for name in ignored_folders_name:
        if folder_name == name.split: return True
    # PREFIX
    for prefix in ignored_folders_starts_with:
        if folder_name.startswith(prefix) and folder_name.strip() != prefix.strip(): return True
    # SUFFIX
    for suffix in ignored_folders_ends_with:
        if folder_name.endswith(suffix) and folder_name.strip() != suffix.strip(): return True
    return False

def analyze_directory(directory):
    global text
    target_extensions = TARGET_EXTENSIONS
    grand_total_char, grand_total_files = 0, 0
    # Anahtarları noktası olmadan oluştur
    results = {ext.lstrip('.'): {'files': [], 'total_chars': 0} for ext in target_extensions}
    ignored_ALL = []
    print("ANALYZING...")
    for root, dirs, files in os.walk(directory):
        ignored = []
        for d in list(dirs):
            if check_ignored_folders(d):
                ignored.append(d)
                dirs.remove(d)
        for d in ignored:
            rel_path = os.path.relpath(os.path.join(root, d), directory)
            if rel_path == ".": rel_path = "\\"
            else: rel_path = "\\" + rel_path.replace("\\", "/")
            print(f"!!! PASS : {rel_path}")
        rel_path = os.path.relpath(root, directory)
        if rel_path == ".": rel_path = "\\"
        else: rel_path = "\\" + rel_path.replace("\\", "/")
        print("reading folder:", root)
        for file in files:
            _, ext = os.path.splitext(file)
            ext_key = ext.lstrip('.')
            if any(ext_key == key.lstrip('.') for key in target_extensions):
                file_path = os.path.join(root, file)
                char_count = count_characters_in_file(file_path)
                results[ext_key]['files'].append(file_path)
                results[ext_key]['total_chars'] += char_count
        ignored_ALL.extend(ignored)
    for ign in ignored_ALL:
        rel_path = os.path.relpath(os.path.join(root, ign), directory)
        print(f"!!! PASS : {rel_path}")

    # Toplam değerleri hesapla
    for ext in results:
        grand_total_char += results[ext]['total_chars']
        grand_total_files += len(results[ext]['files'])

    # Tablo oluştur
    table_output = create_table(results, grand_total_char, grand_total_files)
    text += table_output

    print("\nDONE.\n\n\n")



if __name__ == "__main__":
    current_dir = os.getcwd()
    print(f"Analiz edilen dizin: {current_dir}")
    time.sleep(3)
    
    analyze_directory(current_dir)
    
    # Sonuçları yazdır
    for line in text.split("\n"):
        print(line)
        time.sleep(0.1)

    # Dosyaya kaydet
    filename = f"_folder_analysis_results.txt" #_{datetime.datetime.now().strftime('%Y-%m-%d %H.%M.%S')}.txt"
    with open(filename, "w", encoding="utf-8") as f: f.write(text)

    print(f"\n\nAnalysis results have been saved to '{os.path.abspath(filename)}'.")