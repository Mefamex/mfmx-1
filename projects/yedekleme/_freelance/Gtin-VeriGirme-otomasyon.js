javascript: (() => {
    console.log('\n\n %c Mefamex Product\n %c April 2025 %c \n\n %c https://mefamex.com', 'color: green; font-size: 1.5rem; font-weight: bold;', 'color: black; font-size: 1rem; font-weight: bold; background-color: yellow; padding: 0.2rem; border-radius: 0.5rem;', '', 'color: blue; font-size: 0.8rem; text-decoration: underline; cursor: pointer;');
    /*  Author  : Mefamex 
            Website     : https://mefamex.com
            Instagram   : https://www.instagram.com/mefamex 
        Date    : 2025-07-14
        Customer: https://bionluk.com/hgunay
        Version 1.0 2025-07-14 -> DEMO - TEST: formdaki inputlari okuma, form otomatik doldurma, barkod kaydetme ve kaydedilen barkodu xlsx ve txt olarak indirme islemleri yapildi.
        Version 1.1 2025-07-14 -> GUI  - TEST: Sayfa ustune block acip okunan degeri, dosyalari indirme, tekli barkod olusturma islemleri yapildi.
        Version 1.2 2025-07-17 -> UTF8 - UTF8 karakteri sorunlari icin bazi Turkce karakterler degistirildi. UTF8 destegi eklendi.
        Version 1.3 2025-07-17 -> UTF8 - UTF8 karakteri sorunlari icin bazi Turkce karakterler degistirildi.
        Version 1.4 2025-07-17 -> UTF8 - UTF8 karakteri sorunlari icin TUM Turkce karakterler degistirildi.
    */


    /*  Bu javascript kodu, chrome tarayicisinda bookmark olarak kullanilmak uzere tasarlanmistir.
        Ilgili sayfada bulunan bir iframe elementinin kaynagini yeni bir sekmede acar.
        Kullanici, bu kodu bir bookmark olarak kaydedebilir ve istedigi zaman calistirabilir.

        Adim 1:
            - 2 kere bu bookmark'u kullanilacak: 
                birinci calistirma: Iframe'i yeni sekmede acicak. 
                ikinci calistirma : yeni sekmede acilan form elementini uzerinde islemler yapilmaya baslanicak. 
        Adim 2: 
            - yeni sekmede acilan form elementini kullanici kendisi dolduracak. 
            - Kayit islemi ile formun icerigi hafizada tutulacak. 
        Adim 3:
            - kullanicinin belirledigi sayi kadar bu form tekrar tekrar doldurulacak. 
            - her doldurma ve ardindan kayit islemleri sonucu olusan barkod numarasi hafizada tutulacak.
        Adim 4: 
            - kullanici hafizada tutulan barkod numaralarini ister xlsx isterse de txt dosyasi olarak indirebilecek.
        Adim 5:
            - kullanici bu bookmark'u tekrar kullanarak yeni bir barkod numarasi olusturma islemini baslatabilecek.
    */
    document.characterSet = 'UTF-8'; document.charset = 'UTF-8';
    /* sayfadaki iframe elementini bul ve yeni sekmede ac */
    const iframeElement = document.getElementById('new-gtin13-iframe');
    if (iframeElement) { const iframeSrc = iframeElement.src; window.open(iframeSrc, '_blank'); console.log("\nOTO: iframe kaynagi yeni sekmede acildi:\n", iframeSrc); return; }
    else {
        const formElement = document.querySelector('form');
        if (formElement) { console.log("\nOTO: Form elementi bulundu, diger islemlere devam ediliyor.\n"); }
        else { console.log("\nOTO: Belirtilen ID'ye sahip iframe veya form elementi bulunamadi.\n"); return; }
    }

    /* Yukleme gostergesinin kaybolmasini bekleyen yardimci fonksiyon */
    function waitForSpinnerToDisappear(timeout = 10000) {
        return new Promise((resolve, reject) => {
            const spinnerSelector = 'ngx-spinner .overlay', startTime = Date.now();
            const checkSpinner = setInterval(() => {
                const spinner = document.querySelector(spinnerSelector);
                if (!spinner || spinner.style.display === 'none' || spinner.style.opacity === '0') { clearInterval(checkSpinner); resolve(); }
                else if (Date.now() - startTime > timeout) { clearInterval(checkSpinner); console.warn("OTO: Yukleme gostergesi zaman asimina ugradi veya kaybolmadi."); reject(new Error("Spinner zaman asimi")); }
            }, 50);
        });
    }

    /* Secim kutusu seceneklerinin dolmasini bekleyen yardimci fonksiyon */
    function waitForOptionsToLoad(selectElement, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkOptions = setInterval(() => {
                if (selectElement && selectElement.options && selectElement.options.length > 1) { clearInterval(checkOptions); resolve(); }
                else if (Date.now() - startTime > timeout) { clearInterval(checkOptions); console.warn(`OTO: ${selectElement ? selectElement.id : 'select element'} icin secenekler zaman asimina ugradi veya yuklenmedi.`); reject(new Error(`Options for ${selectElement ? selectElement.id : 'select element'} did not load in time`)); }
            }, 100);
        });
    }

    /* Bir elementin gorunur olmasini bekleyen yardimci fonksiyon */
    function waitForElementToAppear(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkElement = setInterval(() => {
                const element = document.querySelector(selector);
                if (element && element.offsetParent !== null) { clearInterval(checkElement); resolve(element); }
                else if (Date.now() - startTime > timeout) { clearInterval(checkElement); console.warn(`OTO: Element '${selector}' zaman asimina ugradi veya gorunur olmadi.`); reject(new Error(`Element '${selector}' did not appear in time`)); }
            }, 100);
        });
    }

    /* form elementleri
        - onek numarasi -> <select _ngcontent-c3="" class="form-control ng-untouched ng-pristine ng-valid" formcontrolname="gcpIdNew"><option _ngcontent-c3="" value="">  </option><option _ngcontent-c3="" value="63819"> 86828748 </option></select>
        - marka -> <input _ngcontent-c3="" class="form-control col-md-9 col-lg-9 ng-pristine ng-invalid ng-touched" type="text" placeholder="" maxlength="70"> </input>
        - aciklama -> <input _ngcontent-c3="" class="form-control col-md-9 col-lg-9 ng-pristine ng-invalid ng-touched" type="text" placeholder="" maxlength="500"> </input>
        - hedef pazar -> <select _ngcontent-c0="" class="form-control col-md-10 col-lg-11 ng-untouched ng-pristine ng-invalid"> </select>
        - net miktar -> <input _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid" type="text" placeholder="" maxlength="20"> </input>
        - olcu birimi -> <select _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid"> ..... </select>
        - bolum -> <select _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="segmentId" id="select_segment" name="select_segment"> ..... </select>
        - aile ->  <select _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="familyId" id="select_family" name="select_family"><option _ngcontent-c0="" value=""></option><!-- the option will be loaded after the option before the item is selected --></select>
        - sinif -> <select _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="classId" id="select_class" name="select_class"><option _ngcontent-c0="" value=""></option><!-- the option will be loaded after the option before the item is selected --></select>
        - kategori ->  <select _ngcontent-c0="" class="form-control ng-untouched ng-pristine ng-invalid" formcontrolname="brickId" id="select_brick" name="select_brick"><option _ngcontent-c0="" value=""></option><!--the option will be loaded after the option before the item is selected --></select>
        - Barkod Olustur -> <button _ngcontent-c0="" class="btn btn-gs1orange mx-1">Urun barkod numarasi olustur</button>
            - onayliyorum -> <label for="swal2-checkbox" class="swal2-checkbox font-weight-bold" style="display: flex;"><input type="checkbox" value="1" id="swal2-checkbox"><span class="swal2-label">Onayliyorum</span></label>
            - evet / hayir -> <div class="swal2-actions"><button type="button" class="swal2-confirm swal2-styled" aria-label="" style="display: inline-block; background-color: rgb(48, 133, 214); border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);">Evet</button><button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block; background-color: rgb(221, 51, 51);">Hayir</button></div>
    */

    const FormElementsSelectors = {
        onekNumara: '[formcontrolname="gcpIdNew"]',
        onekNumara2button: '.swal2-cancel',
        marka: 'input[type="text"].form-control[maxlength="70"]',
        aciklama: 'input[type="text"][maxlength="500"]',
        hedefPazar: 'select.form-control.col-md-10.col-lg-11',
        netMiktar: 'input[type="text"][maxlength="20"]',
        olcuBirimi: 'div.px-0.col-md-4.col-lg-4 select.form-control',
        bolum: '#select_segment',
        aile: '#select_family',
        sinif: '#select_class',
        kategori: '#select_brick',
        barkodOlusturButton: 'button.btn-gs1orange',
        onayliyorumCheckbox: '#swal2-checkbox',
        evetButton: 'button.swal2-confirm',
        swal2Content: '#swal2-content',
        swal2ConfirmButton: 'button.swal2-confirm'
    };

    /* gecici olarak simdi deneme verileriyle doldurulacak */
    /* bu veriler daha sonra kullanici tarafindan doldurulacak */
    const FormData = { onekNumara: '', marka: '', aciklama: '', hedefPazar: '', netMiktar: '', olcuBirimi: '', bolum: '', aile: '', sinif: '', kategori: '' };

    const OlusturulanBarkodlar = [];

    function getFormData() {
        Object.keys(FormData).forEach(key => { FormData[key] = ''; });
        let errorCount = 0;
        try { FormData.onekNumara = document.querySelector(FormElementsSelectors.onekNumara).value; } catch (error) { console.error("OTO: Onek numarasi alinirken hata olustu:", error); errorCount++; }
        try { FormData.marka = document.querySelector(FormElementsSelectors.marka).value; } catch (error) { console.error("OTO: Marka alinirken hata olustu:", error); errorCount++; }
        try { FormData.aciklama = document.querySelector(FormElementsSelectors.aciklama).value; } catch (error) { console.error("OTO: Aciklama alinirken hata olustu:", error); errorCount++; }
        try { FormData.hedefPazar = document.querySelector(FormElementsSelectors.hedefPazar).value; } catch (error) { console.error("OTO: Hedef pazar alinirken hata olustu:", error); errorCount++; }
        try { FormData.netMiktar = document.querySelector(FormElementsSelectors.netMiktar).value; } catch (error) { console.error("OTO: Net miktar alinirken hata olustu:", error); errorCount++; }
        try { FormData.olcuBirimi = document.querySelector(FormElementsSelectors.olcuBirimi).value; } catch (error) { console.error("OTO: Olcu birimi alinirken hata olustu:", error); errorCount++; }
        try { FormData.bolum = document.querySelector(FormElementsSelectors.bolum).value; } catch (error) { console.error("OTO: Bolum alinirken hata olustu:", error); errorCount++; }
        try { FormData.aile = document.querySelector(FormElementsSelectors.aile).value; } catch (error) { console.error("OTO: Aile alinirken hata olustu:", error); errorCount++; }
        try { FormData.sinif = document.querySelector(FormElementsSelectors.sinif).value; } catch (error) { console.error("OTO: Sinif alinirken hata olustu:", error); errorCount++; }
        try { FormData.kategori = document.querySelector(FormElementsSelectors.kategori).value; } catch (error) { console.error("OTO: Kategori alinirken hata olustu:", error); errorCount++; }
        if (errorCount > 3) throw new Error(`OTO: Form verileri alinirken ${errorCount} hata olustu. Lutfen form elementlerini kontrol edin.`); else console.log("\nOTO: Form verileri alindi:\n", FormData);
    }

    async function doldurFormDataAsync() {
        function handleError(error) { OTOINFOTextRightdivList.textContent = `OTO: Form doldururken hata olustu: \n${error.message}`; console.error("OTO: Form doldururken hata olustu:", error); throw error; }
        const gcpSelectElement = document.querySelector(FormElementsSelectors.onekNumara);
        if (gcpSelectElement) {
            gcpSelectElement.value ||= gcpSelectElement.querySelector('option[value]:not([value=""])')?.value || '';
            gcpSelectElement.dispatchEvent(new Event('change', { bubbles: true }));
            console.log("OTO: ✅ Onek Numara :", gcpSelectElement.value);
        } else { console.log("OTO: ❌ Onek Numara bulunamadi."); handleError(new Error("Onek Numara elementi bulunamadi.")); }

        let attempts = 0;
        const interval = setInterval(() => {
            const btn = document.querySelector(FormElementsSelectors.onekNumara2button);
            if (btn) { btn.click(); clearInterval(interval); if (attempts % 5 === 1) console.log("OTO: ✅ 2. butona tiklandi."); }
            else if (++attempts >= 75) { clearInterval(interval); console.log("OTO: ❌ 2. buton bulunamadi. "); handleError(new Error("2. buton bulunamadi.")); }
        }, 200);

        const markaInput = document.querySelector(FormElementsSelectors.marka);
        if (markaInput) { markaInput.value = FormData.marka || ''; markaInput.dispatchEvent(new Event('input', { bubbles: true })); console.log("OTO: ✅ Marka degeri ayarlandi:", markaInput.value); }
        else { console.log("OTO: ❌ Marka girisi bulunamadi."); handleError(new Error("Marka girisi bulunamadi.")); }

        const aciklamaInput = document.querySelector(FormElementsSelectors.aciklama);
        if (aciklamaInput) { aciklamaInput.value = FormData.aciklama || ''; aciklamaInput.dispatchEvent(new Event('input', { bubbles: true })); console.log("OTO: ✅ Aciklama degeri ayarlandi:", aciklamaInput.value); }
        else { console.log("OTO: ❌ Aciklama girisi bulunamadi."); handleError(new Error("Aciklama girisi bulunamadi.")); }

        const hedefPazarSelect = document.querySelector(FormElementsSelectors.hedefPazar);
        if (hedefPazarSelect) { hedefPazarSelect.value = FormData.hedefPazar || ''; hedefPazarSelect.dispatchEvent(new Event('change', { bubbles: true })); console.log("OTO: ✅ Hedef pazar degeri ayarlandi:", hedefPazarSelect.value); }
        else { console.log("OTO: ❌ Hedef pazar secimi bulunamadi."); handleError(new Error("Hedef pazar secimi bulunamadi.")); }

        const netMiktarInput = document.querySelector(FormElementsSelectors.netMiktar);
        if (netMiktarInput) { netMiktarInput.value = FormData.netMiktar || ''; netMiktarInput.dispatchEvent(new Event('input', { bubbles: true })); console.log("OTO: ✅ Net miktar degeri ayarlandi:", netMiktarInput.value); }
        else { console.log("OTO: ❌ Net miktar girisi bulunamadi."); handleError(new Error("Net miktar girisi bulunamadi.")); }

        const olcuBirimiSelect = document.querySelector(FormElementsSelectors.olcuBirimi);
        if (olcuBirimiSelect) { olcuBirimiSelect.value = FormData.olcuBirimi || ''; olcuBirimiSelect.dispatchEvent(new Event('change', { bubbles: true })); console.log("OTO: ✅ Olcu birimi degeri ayarlandi:", olcuBirimiSelect.value); }
        else { console.log("OTO: ❌ Olcu birimi secimi bulunamadi."); handleError(new Error("Olcu birimi secimi bulunamadi.")); }

        try {
            const bolumSelect = document.querySelector(FormElementsSelectors.bolum);
            if (bolumSelect) {
                bolumSelect.value = FormData.bolum || '';
                bolumSelect.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("OTO: ✅ Bolum degeri ayarlandi:", bolumSelect.value);
                await waitForSpinnerToDisappear();
                const aileSelectForWait = document.querySelector(FormElementsSelectors.aile);
                if (aileSelectForWait) { await waitForOptionsToLoad(aileSelectForWait); }
                else { console.warn("OTO: Aile select elementi bulunamadi, beklenemedi."); }
            } else { console.log("OTO: ❌ Bolum secimi bulunamadi."); handleError(new Error("Bolum secimi bulunamadi.")); }

            const aileSelect = document.querySelector(FormElementsSelectors.aile);
            if (aileSelect) {
                aileSelect.value = FormData.aile || '';
                aileSelect.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("OTO: ✅ Aile degeri ayarlandi:", aileSelect.value);
                await waitForSpinnerToDisappear();
                const sinifSelectForWait = document.querySelector(FormElementsSelectors.sinif);
                if (sinifSelectForWait) { await waitForOptionsToLoad(sinifSelectForWait); }
                else { console.warn("OTO: Sinif select elementi bulunamadi, beklenemedi."); }
            } else { console.log("OTO: ❌ Aile secimi bulunamadi."); handleError(new Error("Aile secimi bulunamadi.")); }

            const sinifSelect = document.querySelector(FormElementsSelectors.sinif);
            if (sinifSelect) {
                sinifSelect.value = FormData.sinif || '';
                sinifSelect.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("OTO: ✅ Sinif degeri ayarlandi:", sinifSelect.value);
                await waitForSpinnerToDisappear();
                const kategoriSelectForWait = document.querySelector(FormElementsSelectors.kategori);
                if (kategoriSelectForWait) { await waitForOptionsToLoad(kategoriSelectForWait); }
                else { console.warn("OTO: Kategori select elementi bulunamadi, beklenemedi."); }
            } else { console.log("OTO: ❌ Sinif secimi bulunamadi."); handleError(new Error("Sinif secimi bulunamadi.")); }

            const kategoriSelect = document.querySelector(FormElementsSelectors.kategori);
            if (kategoriSelect) {
                kategoriSelect.value = FormData.kategori || '';
                kategoriSelect.dispatchEvent(new Event('change', { bubbles: true }));
                console.log("OTO: ✅ Kategori degeri ayarlandi:", kategoriSelect.value);
            } else { console.log("OTO: ❌ Kategori secimi bulunamadi."); handleError(new Error("Kategori secimi bulunamadi.")); }
        } catch (error) { console.error("OTO: ❌ Kategori secimlerinde bir hata olustu:", error); handleError(error); }
    }


    /* Barkod olusturma butonuna tikla daha sonra bekliyecek  */
    async function barkodOlusturAsync() {
        function handleError(error) { OTOINFOTextRightdivList.textContent = `OTO: Form doldururken hata olustu: \n${error.message}`; console.error("OTO: Form doldururken hata olustu:", error); throw error; }
        if (Object.values(FormData).some(value => !value)) { console.error("OTO: FormData'da bos degerler var."); OTOINFOTextRightdivList.innerHTML = "Lutfen tum form alanlarini doldurun."; return; }
        try {
            const barkodOlusturButton = document.querySelector(FormElementsSelectors.barkodOlusturButton);
            if (barkodOlusturButton) {
                barkodOlusturButton.click(); console.log("OTO: ✅ 'Urun barkod numarasi olustur' butonuna tiklandi.");
                /*await waitForSpinnerToDisappear();
                await new Promise(res => setTimeout(res, 500)); */
                await waitForElementToAppear(FormElementsSelectors.onayliyorumCheckbox, 20000);
                const onayliyorumCheckbox = document.querySelector(FormElementsSelectors.onayliyorumCheckbox);
                if (onayliyorumCheckbox) {
                    onayliyorumCheckbox.click(); console.log("OTO: ✅ 'Onayliyorum' checkbox'ina tiklandi.");
                    const evetButton = document.querySelector(FormElementsSelectors.evetButton);
                    if (evetButton) { evetButton.click(); console.log("OTO: ✅ 'Evet' butonuna tiklandi."); }
                    else { console.log("OTO: ❌ 'Evet' butonu bulunamadi."); handleError(new Error("'Evet' butonu bulunamadi.")); }
                } else { console.log("OTO: ❌ 'Onayliyorum' checkbox'i bulunamadi."); handleError(new Error("'Onayliyorum' checkbox'i bulunamadi.")); }
            } else { console.log("OTO: ❌ 'Urun barkod numarasi olustur' butonu bulunamadi."); handleError(new Error("'Urun barkod numarasi olustur' butonu bulunamadi.")); }
        } catch (error) { console.error("OTO: ❌ Barkod olusturma adimlarinda bir hata olustu:", error); handleError(error); }
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const contentElement = await waitForElementToAppear(FormElementsSelectors.swal2Content);
            const dialogText = contentElement.textContent; console.log("OTO: ✅ Barkod onay pop-up'i metni:", dialogText);
            const barcodeNumbers = dialogText.match(/\d{8,}/g);
            if (barcodeNumbers && barcodeNumbers[0]) { const barcodeNumber = barcodeNumbers[0]; OlusturulanBarkodlar.push(barcodeNumber); console.log(`OTO: 🎉 Urun basariyla eklendi. Barkod Numarasi: ${barcodeNumber}`); }
            else { console.log("OTO: ⚠️ Barkod numarasi pop-up metninden cikarilamadi."); handleError(new Error("Barkod numarasi pop-up metninden cikarilamadi.")); }
            const okButton = await waitForElementToAppear(FormElementsSelectors.swal2ConfirmButton);
            okButton.click(); console.log("OTO: ✅ Onay pop-up'indaki 'OK' butonuna tiklandi.");
        } catch (error) { console.error("OTO: ❌ Barkod onay pop-up'i yonetilirken bir hata olustu:", error); handleError(error); }
    }


    async function FormDoldurBarkodOlustur() {
        try {
            await doldurFormDataAsync();
            console.log("OTO: ✅ Form verileri dolduruldu.");
            await barkodOlusturAsync();
        } catch (masterError) { console.error("OTO: Ana otomasyon surecinde bir hata olustu:", masterError); throw masterError; }

    };
    function SaveXlsxFile() {
        if (OlusturulanBarkodlar.length === 0) { console.error("OTO: Henuz barkod olusturulmadi. Excel dosyasi indirilemedi."); OTOINFOTextRightdivList.textContent = "Henuz barkod olusturulmadi. Excel dosyasi indirilemedi."; return; }
        try {
            const data = [['GTIN'], ...OlusturulanBarkodlar.map(barkod => [barkod])];
            const scriptt = document.createElement('script');
            scriptt.src = 'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js';
            scriptt.onload = () => {
                const ws = XLSX.utils.aoa_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Barkod-OTO-${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(link);
                link.click(); document.body.removeChild(link);
            }; document.body.appendChild(scriptt);
        }
        catch { console.error("OTO: Barkod numaralari xlsx olarak indirilirken bir hata olustu."); }
    }
    function SaveTxtFile() {
        if (OlusturulanBarkodlar.length === 0) { console.error("OTO: Henuz barkod olusturulmadi. Barkod metin dosyasi indirilemedi."); OTOINFOTextRightdivList.textContent = "Henuz barkod olusturulmadi. Barkod metin dosyasi indirilemedi."; return; }
        try {
            const data = [['GTIN'], ...OlusturulanBarkodlar.map(barkod => [barkod])];
            const txtBlob = new Blob([data.map(row => row.join('\t')).join('\n')], { type: 'text/plain' });
            const txtLink = document.createElement('a');
            txtLink.href = URL.createObjectURL(txtBlob);
            txtLink.download = `Barkod-OTO-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(txtLink);
            txtLink.click(); document.body.removeChild(txtLink);
            console.log("OTO: Barkod numaralari txt olarak indirildi.");
        }
        catch { console.error("OTO: Barkod numaralari txt olarak indirilirken bir hata olustu."); }
    }

    /***************************************************** */
    /************ Genel CSS kurallari ekle *************** */
    /***************************************************** */

    const styleeeee = document.createElement('style');
    styleeeee.id = 'OTO_style';
    styleeeee.innerHTML = `

body {padding-top: 11.2rem !important;}

#OTOdiv * {box-sizing: border-box;}

#OTOdiv {
    font-family: cursive;
    box-sizing: border-box;
    z-index: 99999;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    max-width: min( 98vw , 99% );
    height: fit-content;
    min-height: 10rem;
    max-height: 20rem;
    overflow: auto;
    margin: 0.2rem auto;
    padding: 0.2rem 0.5rem;
    justify-self: anchor-center;
    color: rgb(0, 0, 0);
    border-radius: 1rem;
    border: 0.2rem double black;
    border-bottom: 0.4rem solid rgb(0, 0, 126);
    background: linear-gradient(to right, rgb(140, 140, 140) 18rem, rgb(255, 233, 255) 24rem, rgb(186, 217, 254) 100%);
}

#OTOdiv #mfmxDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-start;
    place-self: flex-start;
    align-items: center;
    width: 6rem;
    max-width: 6rem;
    min-height: 6rem;
    height: fit-content;
    padding-block: 0.2rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: white;
    color: black;
    font-weight: bold;
    user-select: none;
    pointer-events: none;
}

#OTOdiv #mfmxDiv img {
    width: 4.5rem;
    height: auto;
    margin-inline: auto;
    object-fit: contain;
    object-position: center;
}

#OTOdiv #mfmxDiv p {
    font-size: 0.6em;
    line-height: 1;
    font-weight: bold;
    max-width: 100%;
    height: auto;
    margin-inline: auto;
    margin-block: 0.2rem 0;
    padding: 0;
    object-fit: contain;
    object-position: center;
    text-align: center;
    color: rgb(0, 0, 0);
}

#OTOdiv #OTOActionDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    place-self: flex-start;
    width: fit-content;
    height: 100%;
    padding: 0.2rem 0.5rem;
    margin-inline: 0.7rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: white;
    color: black;
}

#OTOdiv button{
    width : fit-content;
    min-width: 10rem;
    max-width: 100%;
    height: auto;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem auto;
    border-radius: 0.5rem;
    color: black;
    background-color: rgb(177, 255, 167);
    font-size: 0.9em;
    font-weight: bold;
    font-family: sans-serif;
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:hover {
        border-color: rgb(48, 133, 214);
        scale : 1.03;
        transform: translateY(-0.05rem);
    }
}

#OTOdiv #OTOActionDiv #OTOActionButtonRead {
    background-color: rgb(155, 206, 255);
}

#OTOdiv #OTOActionDiv #OTOActionButtonTek {
    background-color: rgb(255, 202, 118);
}

#OTOdiv .OTOSplitter {
    width: 100%;
    height: 0.1rem;
    background-color: black;
    margin: 0.2rem 0;
}

#OTOdiv #OTOActionDiv #OTOActionInput {
    width: 80%;
    min-width: 5rem;
    height: 2rem;
    margin: 0.2rem auto;
    padding: 0.2rem 0.5rem;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
}

#OTOdiv #OTOActionDiv #OTOActionInput:focus {
    outline: none;
    border-color: rgb(48, 133, 214);
    box-shadow: 0 0 0.2rem rgb(48, 133, 214);
}

#OTOdiv #OTOInfoDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    width: 100%;
    height: 100%;
    max-height: 12rem;
    overflow: auto;
}

#OTOdiv #OTOInfoDiv #OTOInfoButtonDiv{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: center;
    place-self: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    max-height: 100%;
    padding: 0.1rem 0.7rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: white;
    color: black;
    transform: translateY(-0.2rem);
}

#OTOdiv #OTOInfoDiv button{
    width : fit-content !important;
    min-width: 0 !important;
    margin-inline: 0.2rem !important;
    background-color: rgb(255, 200, 200);
}

#OTOdiv #OTOInfoDiv #OTOInfoTextDiv{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    max-height: 9rem;
    overflow: auto;
}

#OTOdiv #OTOInfoDiv #OTOINFOTextLeftdiv{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: center;
    place-self: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    max-height: 8.5rem;
    padding: 0.1rem 0.7rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: white;
    color: black;
}

#OTOdiv #OTOInfoDiv #OTOINFOTextLeftdivList {
    width: 100%;
    max-height: 100%;
    overflow-x: hidden;
    padding-inline: 0 0.2rem;
    padding-block: 0.5rem;
    font-family: monospace;
    font-size: 0.8rem;
    line-height: 1.5;
}

#OTOdiv #OTOInfoDiv #OTOINFOTextRightdiv{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
    place-self: flex-start;
    align-items: center;
    width: 100%;
    height: fit-content;
    max-height: 8.5rem;
    padding: 0.1rem 0.5rem;
    margin-left: 0.3rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: white;
    color: black;
}

#OTOdiv #OTOInfoDiv #OTOINFOTextRightdivList {
    width: 100%;
    max-height: 100%;
    overflow: auto;
    padding-block: 0.5rem;
    font-family: monospace;
    font-size: 0.8rem;
    line-height: 1.3;
}
#OTOdiv #OTOInfoDiv #OTOINFOTextRightdivList strong {
    font-weight: bold;
    font-size: 0.9rem;
    font-family: sans-serif;
    background-color: rgb(220 220 220);
    padding-inline: 0.3rem;
    border-radius: 0 0.6rem 0.6rem 0;
}
`;

    /***************************************************** */
    /**********  GUI Elementlerini olustur *************** */
    /***************************************************** */
    if (document.getElementById('OTO_style')) document.getElementById('OTO_style').remove();
    document.head.appendChild(styleeeee);

    function SetGui() {
        if (document.getElementById('OTOdiv')) document.getElementById('OTOdiv').remove();
        const OTOdiv = document.createElement('div'); OTOdiv.id = 'OTOdiv'; document.body.insertBefore(OTOdiv, document.body.firstChild);

        const mfmxDiv = document.createElement('div'); mfmxDiv.id = 'mfmxDiv';
        const mfmxImg = document.createElement('img'); mfmxImg.src = 'https://raw.githubusercontent.com/Mefamex/Mefamex/refs/heads/main/mefamex_logo_bgb(2).png'; mfmxDiv.appendChild(mfmxImg);
        const mfmxText = document.createElement('p'); mfmxText.innerHTML = 'Mefamex Product <br> July 2025';
        mfmxDiv.appendChild(mfmxText);
        OTOdiv.appendChild(mfmxDiv);

        const OTOActionDiv = document.createElement('div'); OTOActionDiv.id = 'OTOActionDiv';
        const OTOActionButtonRead = document.createElement('button'); OTOActionButtonRead.id = 'OTOActionButtonRead'; OTOActionButtonRead.textContent = 'ICERIKLERI OKU'; OTOActionDiv.appendChild(OTOActionButtonRead);
        const OTOActionButtonTek = document.createElement('button'); OTOActionButtonTek.id = 'OTOActionButtonTek'; OTOActionButtonTek.textContent = 'TEK BARKOD OLUSTUR'; OTOActionDiv.appendChild(OTOActionButtonTek);
        OTOActionButtonTek.addEventListener('click', async () => {
            try {
                if (Object.values(FormData).some(value => !value)) { console.error("OTO: FormData'da bos degerler var."); OTOINFOTextRightdivList.innerHTML = "Lutfen tum form alanlarini doldurun."; return; }
                await FormDoldurBarkodOlustur(); console.log("OTO: Barkod numarasi olusturuldu:");
            } catch (error) { console.error("OTO: Barkod olusturulurken hata olustu:", error); OTOINFOTextRightdivList.textContent = "Barkod olusturulurken hata olustu. " + error; }
        });

        const OTOSplitter = document.createElement('span'); OTOSplitter.className = 'OTOSplitter';
        OTOActionDiv.appendChild(OTOSplitter);

        const OTOActionInput = document.createElement('input'); OTOActionInput.id = 'OTOActionInput'; OTOActionInput.type = 'number'; OTOActionInput.placeholder = 'Barkod Sayisi'; OTOActionInput.value = 1; OTOActionInput.min = 1; OTOActionInput.max = 10000; OTOActionDiv.appendChild(OTOActionInput);
        OTOActionInput.addEventListener('input', () => { const value = parseInt(OTOActionInput.value, 10); if (isNaN(value) || value < 1) OTOActionInput.value = 1; else if (value > 10000) OTOActionInput.value = 10000; else OTOActionInput.value = value; });
        const OTOActionStartFull = document.createElement('button'); OTOActionStartFull.id = 'OTOActionStartFull'; OTOActionStartFull.textContent = 'BASLA'; OTOActionDiv.appendChild(OTOActionStartFull);
        OTOActionStartFull.addEventListener('click', async () => { createMultipleBarcodes(); });

        OTOdiv.appendChild(OTOActionDiv);

        const OTOInfoDiv = document.createElement('div'); OTOInfoDiv.id = 'OTOInfoDiv';

        const OTOInfoButtonDiv = document.createElement('div'); OTOInfoButtonDiv.id = 'OTOInfoButtonDiv'; OTOInfoButtonDiv.innerHTML = '<span>Olusturulan Numaralari Indir :</span>';
        const OTOInfoButtonXlsx = document.createElement('button'); OTOInfoButtonXlsx.id = 'OTOInfoButtonXlsx'; OTOInfoButtonXlsx.textContent = 'Excel (.xlsx)';
        OTOInfoButtonXlsx.addEventListener('click', SaveXlsxFile);
        OTOInfoButtonDiv.appendChild(OTOInfoButtonXlsx);
        const OTOInfoButtonTxt = document.createElement('button'); OTOInfoButtonTxt.id = 'OTOInfoButtonTxt'; OTOInfoButtonTxt.textContent = 'Metin (.txt)';
        OTOInfoButtonTxt.addEventListener('click', SaveTxtFile);
        OTOInfoButtonDiv.appendChild(OTOInfoButtonTxt);
        OTOInfoDiv.appendChild(OTOInfoButtonDiv);

        const OTOInfoTextDiv = document.createElement('div'); OTOInfoTextDiv.id = 'OTOInfoTextDiv';
        const OTOINFOTextLeftdiv = document.createElement('div'); OTOINFOTextLeftdiv.id = 'OTOINFOTextLeftdiv'; OTOInfoTextDiv.appendChild(OTOINFOTextLeftdiv);
        const OTOINFOTextLeftdivTitle = document.createElement('span'); OTOINFOTextLeftdivTitle.textContent = 'Olusturulan Barkodlar'; OTOINFOTextLeftdiv.appendChild(OTOINFOTextLeftdivTitle); OTOINFOTextLeftdivTitle.style.fontWeight = 'bold';
        const OTOINFOTextLeftSplitter = document.createElement('span'); OTOINFOTextLeftSplitter.className = 'OTOSplitter'; OTOINFOTextLeftdiv.appendChild(OTOINFOTextLeftSplitter);
        const OTOINFOTextLeftdivList = document.createElement('div'); OTOINFOTextLeftdivList.id = 'OTOINFOTextLeftdivList'; OTOINFOTextLeftdivList.textContent = 'YOK'; OTOINFOTextLeftdiv.appendChild(OTOINFOTextLeftdivList);
        function updateInfoText() { OTOINFOTextLeftdivTitle.textContent = OlusturulanBarkodlar.length > 0 ? 'Adet: ' + OlusturulanBarkodlar.length : 'Olusturulanlar:'; OTOINFOTextLeftdivList.innerHTML = OlusturulanBarkodlar.length > 0 ? OlusturulanBarkodlar.map(barkod => `${barkod}`).join('<br>') : 'YOK'; } updateInfoText();
        const originalPush = OlusturulanBarkodlar.push; OlusturulanBarkodlar.push = function (...args) { const result = originalPush.apply(this, args); updateInfoText(); return result; };
        const OTOINFOTextRightdiv = document.createElement('div'); OTOINFOTextRightdiv.id = 'OTOINFOTextRightdiv'; OTOInfoTextDiv.appendChild(OTOINFOTextRightdiv);
        const OTOINFOTextRightdivTitle = document.createElement('span'); OTOINFOTextRightdivTitle.textContent = 'Form Icerigi'; OTOINFOTextRightdiv.appendChild(OTOINFOTextRightdivTitle); OTOINFOTextRightdivTitle.style.fontWeight = 'bold';
        const OTOINFOTextRightSplitter = document.createElement('span'); OTOINFOTextRightSplitter.className = 'OTOSplitter'; OTOINFOTextRightdiv.appendChild(OTOINFOTextRightSplitter);
        const OTOINFOTextRightdivList = document.createElement('div'); OTOINFOTextRightdivList.id = 'OTOINFOTextRightdivList'; OTOINFOTextRightdivList.textContent = 'YOK'; OTOINFOTextRightdiv.appendChild(OTOINFOTextRightdivList);
        function updateInfoRightText() { const formDataSiralama = ["Onek", "Marka", "Aciklama", "Hedef Pazar", "Net Miktar", "Olcu Birimi", "Bolum", "Aile", "Sinif", "Kategori"]; const formDataKeySirali = ['onekNumara', 'marka', 'aciklama', 'hedefPazar', 'netMiktar', 'olcuBirimi', 'bolum', 'aile', 'sinif', 'kategori']; OTOINFOTextRightdivList.innerHTML = formDataSiralama.map((key, index) => { const value = FormData[formDataKeySirali[index]] || 'YOK'; return `<strong >${key}:</strong> ${value}`; }).join('<br>'); } updateInfoRightText();
        OTOActionButtonRead.addEventListener('click', () => { try { getFormData(); updateInfoRightText(); OTOINFOTextRightdivTitle.textContent = 'Form Verileri Okundu'; setTimeout(() => { OTOINFOTextRightdivTitle.textContent = 'Form Icerigi'; }, 2000); } catch (error) { console.error("OTO: Form verileri okunurken bir hata olustu:", error); OTOINFOTextRightdivList.textContent = 'OTO: Form verileri okunurken bir hata olustu: ' + error.message; } });
        OTOInfoDiv.appendChild(OTOInfoTextDiv);
        OTOdiv.appendChild(OTOInfoDiv);

    }
    SetGui();

    async function createMultipleBarcodes() {
        if (Object.values(FormData).some(value => !value)) { console.error("OTO: FormData'da bos degerler var."); OTOINFOTextRightdivList.innerHTML = "Lutfen tum form alanlarini doldurun."; return; }
        let countt = 0;
        try { countt = parseInt(OTOActionInput.value, 10); if (isNaN(countt) || countt < 1) { OTOINFOTextRightdivList.innerHTML = "Lutfen gecerli bir barkod sayisi girin."; return; } }
        catch (error) { console.error("OTO: Toplu barkod olusturmak icin sayiyi okurken bir hata olustu:", error); OTOINFOTextRightdivList.textContent = "Toplu barkod olusturmak icin sayiyi okurken bir hata olustu: " + error; }
        if (countt < 1 || countt > 10000) { console.error("OTO: Barkod sayisi 1 ile 10000 arasinda olmalidir."); OTOINFOTextRightdivList.textContent = "Barkod sayisi 1 ile 10000 arasinda olmalidir."; return; }
        for (let i = 0; i < countt; i++) {
            try { await FormDoldurBarkodOlustur(); }
            catch (error) { console.error(`OTO: Toplu Barkod ${i + 1} olusturulurken hata olustu:`, error); OTOINFOTextRightdivList.textContent = ` Toplu Barkod ${i + 1} olusturulurken hata olustu: ` + error.message; break; }
        }
    }


})();