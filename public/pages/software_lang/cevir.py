import json

# input.txt dosyasını oku
with open("./public/pages/software_lang/input.txt", "r") as f:
    lines = f.readlines()

# Başlıkları ve alt başlıkları ayrıştır
data = {}
current_category = None
for line in lines:
    line = line.strip()
    if line.startswith("---"):
        # Yeni bir kategori başlıyor
        current_category = line
        data[current_category] = []
    elif line.startswith("+"):
        # Yeni bir değer eklenecek
        value = line[2:].strip()
        data[current_category].append(value)

# Sözlüğü JSON formatına dönüştür
json_data = json.dumps(data, indent=4)

with open("./public/pages/software_lang/output.json", "w") as f:
    json.dump(data, f, indent=4)
