# -*- coding: utf-8 -*-
# Created on Sunday, August 25 13:30:00 2024
# @author: mefamex

print(
    "\n",
    "#" * 30,
    """
    **Dizin Yapısı Görselleştirme Aracı**

    Bu Python uygulaması, belirtilen bir dizin yolundaki tüm dosya ve dizinleri detaylı bir şekilde analiz eder.
    Dosya boyutları, oluşturulma tarihleri, dizin hiyerarşisi gibi bilgileri görsel ve metinsel olarak sunar.
    Sistem yöneticileri, geliştiriciler ve veri bilimcileri için disk kullanımını optimize etmek, dosya yönetimini
    kolaylaştırmak ve veri analizi yapmak için ideal bir araçtır.

    **Ana Özellikler:**
    * **Rekürsif Dizin Gezimi:** Belirtilen dizin ve tüm alt dizinlerini inceler.
    * **Detaylı Bilgi Toplama:** Dosya boyutu, oluşturulma tarihi, dizin derinliği gibi bilgileri hesaplar.
    * **Formatlı Çıkış:** Tablo şeklinde okunaklı bir terminal çıktısı sunar.
    * **Metin Dosyasına Kaydetme:** Sonuçları bir metin dosyasına kaydeder.
    * **Özelleştirilebilir:** Çıkış formatı, analiz derinliği gibi ayarlar yapılabilir.

    **Kullanılan Modüller:**
    * os modülü
    * datetime modülü

    **Uyarılar:**
    * Çok büyük dizinlerde performans düşüşü yaşanabilir.
    * Dosya erişim hakları konusunda dikkatli olunmalıdır.
##################################################################################""",
    sep="",
)

import os, datetime


class DirExVis:
    """This class walks a directory tree, gathers information about files and directories, and presents it in a formatted way.

    Bu sınıf, bir dizin yapısını gezerek, dosya ve dizinler hakkında bilgi toplar ve biçimlendirilmiş bir şekilde sunar.
    """

    tab_size: int = 6
    details_size, details_date, details_folderCount = False, False, False
    width: int = 35
    maxNameLength: list = [0, 0]  # name, depth

    @staticmethod
    def unixToDate(unix: int | float) -> str:
        """Unix zaman damgasını okunabilir bir tarih ve saat dizesine çevirir.
        Args:
            unix (int | float): Unix zaman damgası (epoch'tan itibaren geçen saniye sayısı).
        Returns:
            str: Biçimlendirilmiş tarih ve saat dizesi (YYYY-MM-DD HH:MM:SS)."""
        return datetime.datetime.fromtimestamp(unix).strftime("%Y-%m-%d %H:%M:%S")

    def __init__(self, path: str = "", data: dict = {}):
        """This method initializes the DirExVis class.
            It takes an optional path argument, which specifies the starting directory.
            It also takes an optional data dictionary to store file and directory information.

        Args:
            path (str, optional): The starting directory path. Defaults to the current working directory.
            data (dict, optional): A dictionary to store file and directory information. Defaults to an empty dictionary.

        Bu method DirExVis sınıfını başlatır.
        İsteğe bağlı olarak bir başlangıç dizini yolu alan bir path argümanı alır.
        Ayrıca, dosya ve dizin bilgilerini saklamak için isteğe bağlı bir data sözlüğü alır.

        Args:
            path (str, isteğe bağlı): Başlangıç dizini yolu. Varsayılan olarak mevcut çalışma dizini.
            data (dict, isteğe bağlı): Dosya ve dizin bilgilerini saklamak için bir sözlük. Varsayılan olarak boş bir sözlük.
        """
        self.path: str = path if path != "" else os.getcwd()
        os.chdir(self.path)
        self.path = os.getcwd()
        self.datas: dict = (
            {}
        )  # { "name" : [depth(int) ,type (file/dir) , size , date , {childs}]  }

        self.data_str: str = ""
        self.printAll_dotted: bool = True
        self.start()
        self.saveDirExVis()

    def walker(self, path="", depth=0, data: dict = None):
        """Recursively traverses a directory structure and collects file and directory information.

                This method systematically explores a directory and its subdirectories, gathering details
                about each file and directory encountered. Collected information includes the file or
                directory name, type, size, modification time, and depth within the directory hierarchy.
                The gathered data is stored in a dictionary for further processing or analysis.

        Args:
            self: A reference to the `DirExVis` object.
            path (str, optional): The path of the directory to start traversing. Defaults to the current directory.
            depth (int, optional): The current depth level within the directory structure. Defaults to 0.
            data (dict, optional): A dictionary to store file and directory information. Defaults to `self.datas`.

        Returns:
            None


        Bu metot, belirtilen bir dizin yolundan başlayarak tüm alt dizinleri ve dosyaları rekürsif olarak inceler.
                Her bir dosya veya dizin için belirli bilgileri (ad, tür, boyut, son değiştirme tarihi, derinlik)
                toplar ve `data` sözlüğünde saklar.

        Args:
            self: DirExVis sınıfının bir örneği.
            path (str, optional): Gezinilecek dizinin yolu. Varsayılan olarak mevcut çalışma dizini.
            depth (int, optional): Gezinilen dizinin derinliği. Varsayılan olarak 0.
            data (dict, optional): Dosya ve dizin bilgilerini saklamak için bir sözlük. Varsayılan olarak `self.datas`.

        Returns:
            None
        """

        if path == "":
            path = self.path + ""
        if data is None:
            data = self.datas
        files = []
        for entry in os.listdir(path):
            entry_path = os.path.join(path, entry)
            if os.path.isdir(entry_path):
                data[entry] = [
                    depth + 1,
                    "dir",
                    0,
                    self.unixToDate(os.path.getmtime(entry_path)),
                    {},
                ]
                maxNameLength = [
                    max(DirExVis.maxNameLength[0], len(entry)),
                    max(DirExVis.maxNameLength[1], depth),
                ]
                self.printAll(data={entry: data[entry]})
                self.walker(entry_path, depth=depth + 1, data=data[entry][4])
            else:
                files.append(entry)

        for file in files:
            os.chdir(path)
            size = os.path.getsize(file)
            mtime = self.unixToDate(os.path.getmtime(file))
            DirExVis.maxNameLength[0] = max(DirExVis.maxNameLength[0], len(file))
            data[file] = [depth + 1, " file", size, mtime]
            self.printAll(data={file: data[file]})

    def printAll(self, data={}):
        """Recursively prints file and directory information in a formatted manner.

        This method iterates through the provided `data` dictionary, which contains information about files and directories.
        It formats the output using indentation, size, date, and folder count information, and prints it to the console.
        The method also recursively calls itself to print information for subdirectories.

        Args:
            self: A reference to the `DirExVis` object.
            data (dict, optional): A dictionary containing file and directory information. Defaults to `self.datas`.

        Returns:
            None

        Dosya ve dizin bilgilerini formatlı bir şekilde ekrana yazdırır.

            Bu metot, verilen `data` sözlüğündeki dosya ve dizin bilgilerini alır ve indentasyon, boyut, tarih ve klasör sayısı
            gibi bilgileri kullanarak formatlar. Sonra bu formatlanmış çıktıyı ekrana yazdırır. Alt dizinler için de
            aynı işlemi tekrarlar.

        Args:
            self: DirExVis sınıfının nesnesi .
            data (dict, optional): Dosya ve dizin bilgilerini içeren bir sözlük. Varsayılan olarak `self.datas`'ı kullanır.

        Returns:
            None
        """

        if data == {}:
            data = self.datas
        for key in data.keys():
            value = data[key]
            bas: str = ("|" + " " * DirExVis.tab_size) * value[0]
            folderCount: str = (
                ("(" + str(len(value[4])) + ")" if value[1] == "dir" else "")
                if DirExVis.details_folderCount
                else ""
            )
            size: str = (
                str(round(value[2] / (1024 * 1024), 3)) + "mb "
                if DirExVis.details_size
                else ""
            )
            date: str = str(value[3]) if DirExVis.details_date else ""
            arabosluk: str = (
                " "
                * (
                    DirExVis.width
                    + DirExVis.maxNameLength[0]
                    + DirExVis.maxNameLength[1] * DirExVis.tab_size
                    - len(bas + key + folderCount + size + date)
                )
                if len(size + date) > 0
                else ""
            )
            self.printAll_dotted = not self.printAll_dotted
            if self.printAll_dotted:
                arabosluk = arabosluk.replace(" ", "-")
            self.data_str += f"{bas}{key}{folderCount}{arabosluk}{size}{date}\n"
            print(f"{bas}{key}{folderCount}{arabosluk}{size}{date}")
            if value[1] == "dir" and len(value[4]) > 0:
                self.printAll(value[4])

    def saveDirExVis(self):
        """Saves the collected file and directory information to a text file.

        This method writes the formatted output of the file and directory structure to a text file.
        The formatted output is stored in the `data_str` attribute of the `DirExVis` object.

        Filename Generation:
            * A unique filename is created starting with "DirExVis_".
            * The current timestamp is appended in a human-readable format (replacing colons with periods).
            * A ".txt" extension is added to indicate a text file. This ensures that each save operation creates a new file.

        Data Saving:
            * The `data_str` attribute, containing the formatted output, is written to the newly created file.

        Args:
            self: A reference to the `DirExVis` object.

        Returns:
            None

        Toplanan dosya ve dizin bilgilerini bir metin dosyasına kaydeder.

        Bu metot, `walker` metodu tarafından toplanan dosya ve dizin bilgilerini okunaklı bir
        şekilde bir metin dosyasına kaydeder. Kaydedilen bilgiler, `printAll` metodu tarafından
        oluşturulan `data_str` değişkeninde saklanır.

        Dosya Adı Oluşturma:
            * Dosya adı "DirExVis_" ile başlar.
            * Ardından, geçerli zaman damgası insan tarafından okunabilir
              bir formata dönüştürülür (iki nokta yerine nokta kullanılır).
            * Son olarak, ".txt" uzantısı eklenir. Bu sayede, benzersiz
              bir dosya adı oluşturulur ve mevcut dosyaların üzerine yazılmaz.

        Veri Kaydetme:
            * `data_str` değişkeni, açılan metin dosyasına yazılır.

        Args:
            self: DirExVis sınıfının nesnesi.

        Returns:
            None
        """
        os.chdir(self.path)
        with open(
            "DirExVis_"
            + self.unixToDate(datetime.datetime.now().timestamp()).replace(":", ".")
            + ".txt",
            "w",
        ) as f:
            f.write(self.data_str)
        print("File saved at:", os.getcwd(), " and its starts by: DirExVis_******.txt")

    def start(self):
        self.datas = {self.path: [0, "dir", 0, os.path.getmtime(self.path), {}]}
        self.printAll({self.path: self.datas[self.path]})
        self.walker(self.path, 0, self.datas[self.path][4])


if __name__ == "__main__":
    DirExVis()  # you can add here full path
