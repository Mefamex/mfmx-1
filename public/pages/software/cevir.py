import json


def txtToJson():
    data = {}
    cc1, cc2 = 0, 0

    with open("C:/Users/Mefamex/Desktop/mfmx-1/public/pages/software/Yazilim_Ayrintili.txt", "r") as f:
        for line in f:
            line = line.strip()
            if line in ["", " ", "  ", "\n", " \n", " \n "]:
                pass
            elif line.startswith("---"):
                cc1 = line[3:-3].strip()
                data[cc1] = {}
            elif ":" in line:
                value = line.strip()
                if cc1 is not None:
                    data[cc1][cc2].append(value.split(":"))
            else:
                cc2 = line[:].strip()
                data[cc1][cc2] = []

    print(data)

    # Sözlüğü JSON formatına dönüştür
    json_data = json.dumps(data, indent=4)

    with open("C:/Users/Mefamex/Desktop/mfmx-1/public/pages/software/output.json", "w") as f:
        json.dump(data, f, indent=4)






def jsonToList():
    with open("./public/pages/software_lang/output.json", "r") as f:
        data = json.load(f)

    categories = []
    for category, subcategories in data.items():
        for subcategory, values in subcategories.items():
            for value in values:
                categories.append((category, subcategory, value))

    for q in categories:
        print(type(q))







def jsonToJson():
    with open("C:/Users/Mefamex/Desktop/mfmx-1/public/pages/software/output.json", "r") as f:
        data = json.load(f)

    print(json.dumps(data, indent=4))






txtToJson()
jsonToJson()