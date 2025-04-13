javascript: (async () => {
    /* sayfa yuklenmesini bekle */
    if (document.readyState !== 'complete') await new Promise(resolve => window.addEventListener('load', resolve));
    console.log('\n\n %c Mefamex Product\n %c April 2025 %c \n\n %c https://mefamex.com', 'color: green; font-size: 1.5rem; font-weight: bold;', 'color: black; font-size: 1rem; font-weight: bold; background-color: yellow; padding: 0.2rem; border-radius: 0.5rem;', '', 'color: blue; font-size: 0.8rem; text-decoration: underline; cursor: pointer;');


    /***************************************************** */
    /************* Genel CSS kurallari ekle *************** */
    /***************************************************** */

    const styleeeee = document.createElement('style');
    styleeeee.id = 'myMainDiv_style';
    styleeeee.innerHTML = `
#mainMydiv * {box-sizing: border-box;}

#mainMydiv {
    box-sizing: border-box;
    z-index: 99999;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.2rem;
    top: 0;
    left: 0.7vw;
    width: -webkit-fill-available;
    max-width: min( 98vw , 99% );
    height: fit-content;
    min-height: 10rem;
    margin-inline: auto;
    margin-top: 5px;
    padding: 0.2rem 0.5rem;
    color: rgb(0, 0, 0);
    border-radius: 1rem;
    border: 0.2rem double black;
    background-color: rgb(207, 207, 207);
}

#mainMydiv #mfmxdiv {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-start;
    place-self: flex-start;
    align-items: center;
    top: 0;
    left: 0.2rem;
    width: 5rem;
    max-width: 5rem;
    min-height: 5rem;
    height: fit-content;
    padding-block: 0.2rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: rgba(67, 67, 67, 0.4);
    color: white;
    font-weight: bold;
    user-select: none;
    pointer-events: none;
}

#mainMydiv #mfmxdiv img {
    width: 3.5rem;
    max-width: 100%;
    height: auto;
    margin-inline: auto;
    object-fit: contain;
    object-position: center;
}

#mainMydiv #mfmxdiv p {
    font-size: 0.4em;
    max-width: 100%;
    height: auto;
    margin-inline: auto;
    margin-block: 0;
    padding: 0;
    object-fit: contain;
    object-position: center;
    text-align: center;
    color: rgb(0, 0, 0);
}

#mainMydiv #uygulamaicerik {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    max-width: 100%;
    height: fit-content;
    border-radius: 1rem;
    background-color: rgba(67, 67, 67, 0.4);
}

#mainMydiv #uygulamaicerik #uygulamaIhaleBilgileri {
    display: flex;
    flex: 1 1 20%;
    flex-direction: column;
    justify-content: center;
    width: 20rem;
    max-width: fit-content;
    height: fit-content;
    max-height: 100%;
    padding: 0.2rem;
    margin-inline: 0.2rem auto;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: rgb(126, 126, 126);
    color: rgb(0, 0, 0);
}

#mainMydiv #uygulamaicerik h2 {
    width: fit-content;
    height: fit-content;
    padding: 0.2rem 1rem;
    margin-inline: auto;
    margin-block: 0;
    border-radius: 1rem;
    border: 0.05rem double green;
    background-color: rgb(235, 235, 235);
    color: rgb(0, 0, 0);
}

#mainMydiv #uygulamaicerik #uygulamaIhaleBilgileri #uygulamaIhaleBilgileriText {
    background-color: rgb(177, 177, 177);
    color: rgb(0, 0, 0);
    font-size: 1em;
    text-align: left;
    line-height: 1.5em;
    margin: 0;
    padding: 0.2rem;
    border-radius: 0.5rem;
}

#mainMydiv #uygulamaicerik #uygulamaIhaleBilgileri #uygulamaIhaleBilgileriText span {
    color: rgb(255 255 255);
    background-color: rgb(83 83 83);
    padding: 0.01rem 0.5rem;
    border-radius: 0.5rem;
    border: 0.05rem double black;
}


#mainMydiv #uygulamaicerik #uygulamaIhaleSag {
    display: flex;
    flex: 1 1 20%;
    flex-direction: column;
    width: 20rem;
    max-width: 100%;
    height: fit-content;
    padding: 0.2rem;
    margin-inline: 0.2rem auto;
    align-self: flex-start;
    justify-content: center;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: rgb(177, 177, 177);
    color: rgb(0, 0, 0);
}
#mainMydiv #uygulamaicerik #uygulamaIhaleSag button{
    padding: 0.2rem;
    height: fit-content !important;
    line-height: 1.2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid red;
}

#mainMydiv #uygulamaicerik #uygulamaIhaleSag #uygulamaIhaleSagContainer>*{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    padding: 0.2rem;
    margin-inline: auto;
    margin-block: 0.2rem;
    border-radius: 1rem;
    border: 0.2rem double green;
    background-color: rgb(210, 210, 210);
    color: rgb(0, 0, 0);
}

#mainMydiv #uygulamaicerik #uygulamaIhaleSag #uygulamaIhaleSagContainer #uygulamaIhaleSagTeklifBotuGrubuText1{
    padding: 0.2rem;
    height: fit-content !important;
    line-height: 1.2rem;
    border-radius: 0.5rem;
}
`;
    if (document.getElementById('myMainDiv_style')) document.getElementById('myMainDiv_style').remove();
    document.head.appendChild(styleeeee);
    /***************************************************** */
    /***************************************************** */






    /***************************************************** */
    /**************  Ana Elementi olustur ******************/
    /***************************************************** */
    const mainMydiv = document.createElement('div');
    if (document.getElementById('mainMydiv')) document.getElementById('mainMydiv').remove();
    /* #mainMydiv * {box-sizing: border-box;} */
    mainMydiv.id = 'mainMydiv';
    document.body.insertBefore(mainMydiv, document.body.firstChild);
    /***************************************************** */
    /***************************************************** */








    /***************************************************** */
    /*************** yapimci imzasi ************************/
    /***************************************************** */
    const mfmxdiv = document.createElement('div');
    mfmxdiv.id = 'mfmxdiv';

    const mfmximg = document.createElement('img');
    mfmximg.src = 'https://raw.githubusercontent.com/Mefamex/Mefamex/refs/heads/main/mefamex_logo_bgb(2).png';
    mfmxdiv.appendChild(mfmximg);

    const mfmxtext = document.createElement('p');
    mfmxtext.innerHTML = 'Mefamex <br> Product <br> April 2025';
    mfmxdiv.appendChild(mfmxtext);

    mainMydiv.appendChild(mfmxdiv);
    /***************************************************** */
    /***************************************************** */







    /***************************************************** */
    /************** Ana Icerik Elementi ********************/
    /***************************************************** */
    const uygulamaicerik = document.createElement('div');
    uygulamaicerik.id = 'uygulamaicerik';

    mainMydiv.appendChild(uygulamaicerik);
    /***************************************************** */
    /***************************************************** */










    /***************************************************** */
    /********** Ihale Bilgileri (sol icerik) ***************/
    /***************************************************** */
    let mfmxIhaleAdi = 'Ihale Adi'; /* #ihaleBaslik */
    let mfmxIhaleTarihBaslangic = 'Ihale Baslangıc'; /* #ihaleBaslangicTarihi altındaki 2. span (2. çocuk) */
    let mfmxIhaleTarihBitis = 'Ihale Bitis'; /* #ihaleBitisTarihi altındaki 2. span (2. çocuk) */
    let mfmxIhaleMuhammenBedel = "Muhammen Bedel"; /* #muhammenBedeli altındaki 2. span (2. çocuk) */
    let mfmxIhaleBaslangicBedel = "Baslangic Bedeli"; /* #ihaleBaslangicBedeli */
    let mfmxIhaleEnYuksekTeklif = "Son Teklif"; /* #ihaleSonTeklif */
    let mfmxIhaleSistematikKalanSure = 'Sistematik Hesaplama'; /* son tarih ve saate bakarak hesaplanır DD gün : HH:MM:SS:sss*/

    const uygulamaIhaleBilgileri = document.createElement('div');
    uygulamaIhaleBilgileri.id = 'uygulamaIhaleBilgileri';

    const uygulamaIhaleBilgileriBaslik = document.createElement('h2');
    uygulamaIhaleBilgileriBaslik.textContent = 'Ihale Bilgileri';
    uygulamaIhaleBilgileri.appendChild(uygulamaIhaleBilgileriBaslik);

    const uygulamaIhaleBilgileriText = document.createElement('p');
    uygulamaIhaleBilgileriText.id = 'uygulamaIhaleBilgileriText';
    uygulamaIhaleBilgileri.appendChild(uygulamaIhaleBilgileriText);

    const uygulamaIhaleBilgileriAdi = document.createElement('span');
    uygulamaIhaleBilgileriAdi.id = 'uygulamaIhaleBilgileriAdi';
    const uygulamaIhaleBilgileriTarihBaslangic = document.createElement('span');
    uygulamaIhaleBilgileriTarihBaslangic.id = 'uygulamaIhaleBilgileriTarihBaslangic';
    const uygulamaIhaleBilgileriTarihBitis = document.createElement('span');
    uygulamaIhaleBilgileriTarihBitis.id = 'uygulamaIhaleBilgileriTarihBitis';
    const uygulamaIhaleBilgileriMuhammenBedel = document.createElement('span');
    uygulamaIhaleBilgileriMuhammenBedel.id = 'uygulamaIhaleBilgileriMuhammenBedel';
    const uygulamaIhaleBilgileriBaslangicBedel = document.createElement('span');
    uygulamaIhaleBilgileriBaslangicBedel.id = 'uygulamaIhaleBilgileriBaslangicBedel';
    const uygulamaIhaleBilgileriEnYuksekTeklif = document.createElement('span');
    uygulamaIhaleBilgileriEnYuksekTeklif.id = 'uygulamaIhaleBilgileriEnYuksekTeklif';
    const uygulamaIhaleBilgileriSistematikKalanSure = document.createElement('span');
    uygulamaIhaleBilgileriSistematikKalanSure.id = 'uygulamaIhaleBilgileriSistematikKalanSure';
    /* teklifler */
    const uygulamaIhaleBilgileriVerdigimTeklifler = document.createElement('span');
    uygulamaIhaleBilgileriVerdigimTeklifler.id = 'uygulamaIhaleBilgileriVerdigimTeklifler';
    uygulamaIhaleBilgileriVerdigimTeklifler.textContent = '  ';



    uygulamaIhaleBilgileriText.innerHTML = 'Ihale Adi: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriAdi);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Ihale Baslangic: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriTarihBaslangic);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Ihale Bitis: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriTarihBitis);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Muhammen Bedel: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriMuhammenBedel);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Baslangic Bedeli: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriBaslangicBedel);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Son Teklif: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriEnYuksekTeklif);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Kalan Sure: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriSistematikKalanSure);
    uygulamaIhaleBilgileriSistematikKalanSure.textContent = mfmxIhaleSistematikKalanSure;
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriSistematikKalanSure);
    uygulamaIhaleBilgileriText.innerHTML += '<br> Verdigim Teklifler: ';
    uygulamaIhaleBilgileriText.appendChild(uygulamaIhaleBilgileriVerdigimTeklifler);

    function bilgileriGuncelle() {
        mfmxIhaleAdi = document.getElementById('ihaleBaslik').textContent || " -- ";
        mfmxIhaleTarihBaslangic = document.getElementById('ihaleBaslangicTarihi').children[1].textContent || " -- ";
        mfmxIhaleTarihBitis = document.getElementById('ihaleBitisTarihi').children[1].textContent || " -- ";
        mfmxIhaleMuhammenBedel = document.getElementById('muhammenBedeli').textContent || " -- ";
        mfmxIhaleBaslangicBedel = document.getElementById('ihaleBaslangicBedeli').textContent || " -- ";
        mfmxIhaleEnYuksekTeklif = document.getElementById('ihaleSonTeklif').textContent || " -- ";
        document.getElementById('uygulamaIhaleBilgileriAdi').textContent = mfmxIhaleAdi;
        document.getElementById('uygulamaIhaleBilgileriTarihBaslangic').textContent = mfmxIhaleTarihBaslangic;
        document.getElementById('uygulamaIhaleBilgileriTarihBitis').textContent = mfmxIhaleTarihBitis;
        document.getElementById('uygulamaIhaleBilgileriMuhammenBedel').textContent = mfmxIhaleMuhammenBedel;
        document.getElementById('uygulamaIhaleBilgileriBaslangicBedel').textContent = mfmxIhaleBaslangicBedel;
        document.getElementById('uygulamaIhaleBilgileriEnYuksekTeklif').textContent = mfmxIhaleEnYuksekTeklif;
        document.getElementById('uygulamaIhaleBilgileriSistematikKalanSure').textContent = mfmxIhaleSistematikKalanSure;
    }

    const INTERVAL_IhaleBilgileri = 'myMainDiv_IhaleBilgileri_guncelleme';
    if (window[INTERVAL_IhaleBilgileri]) { clearInterval(window[INTERVAL_IhaleBilgileri]); window[INTERVAL_IhaleBilgileri] = null; }
    window[INTERVAL_IhaleBilgileri] = setInterval(() => { try { bilgileriGuncelle(); } catch (error) { console.error('DOM Güncelleme Hatası:', error); } }, 2345);

    uygulamaicerik.appendChild(uygulamaIhaleBilgileri);
    /***************************************************** */
    /***************************************************** */






    /***************************************************** */
    /****************** Sistematik Kalan *******************/
    /***************************************************** */

    let mfmxIhaleSistematikKalanGun = 0;
    let mfmxIhaleSistematikKalanSaat = 0;
    let mfmxIhaleSistematikKalanDakika = 0;
    let mfmxIhaleSistematikKalanSaniye = 0;
    let mfmxIhaleSistematikKalanMilisaniye = 0;
    mfmxIhaleSistematikKalanSure = '00000'; /* DD gün : HH:MM:SS:sss */

    function kalanSureHesapla() {
        try {
            const bitisTarihi = document.getElementById('ihaleBitisTarihi').children[1].textContent || " -- ";
            const [tarih, saat] = bitisTarihi.split(' ');
            const [gun, ay, yil] = tarih.split('/');
            const [saat_, dakika] = saat.split(':');
            const bitisTarihiObj = new Date(yil, ay - 1, gun, saat_, dakika);
            const simdi = new Date();
            const kalanSure = bitisTarihiObj - simdi;

            if (kalanSure > 0) {
                mfmxIhaleSistematikKalanGun = Math.floor(kalanSure / (1000 * 60 * 60 * 24));
                mfmxIhaleSistematikKalanSaat = Math.floor((kalanSure % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                mfmxIhaleSistematikKalanDakika = Math.floor((kalanSure % (1000 * 60 * 60)) / (1000 * 60));
                mfmxIhaleSistematikKalanSaniye = Math.floor((kalanSure % (1000 * 60)) / 1000);
                mfmxIhaleSistematikKalanMilisaniye = kalanSure % 1000;
                const formatNumber = num => String(num).padStart(2, '0');
                mfmxIhaleSistematikKalanSure = `${mfmxIhaleSistematikKalanGun} gün : ${formatNumber(mfmxIhaleSistematikKalanSaat)}:${formatNumber(mfmxIhaleSistematikKalanDakika)}:${formatNumber(mfmxIhaleSistematikKalanSaniye)}:${String(mfmxIhaleSistematikKalanMilisaniye).padStart(3, '0')}`;
            } else mfmxIhaleSistematikKalanSure = 'İhale Süresi Doldu';
            document.getElementById('uygulamaIhaleBilgileriSistematikKalanSure').textContent = mfmxIhaleSistematikKalanSure;
        } catch (error) {
            console.error('Kalan süre hesaplama hatası:', error);
            mfmxIhaleSistematikKalanSure = 'Hesaplanamadı';
            document.getElementById('uygulamaIhaleBilgileriSistematikKalanSure').textContent = mfmxIhaleSistematikKalanSure;
        }
    }

    const INTERVAL_SistematikKalanSure = 'myMainDiv_SistematikKalanSure_guncelleme';
    if (window[INTERVAL_SistematikKalanSure]) { clearInterval(window[INTERVAL_SistematikKalanSure]); window[INTERVAL_SistematikKalanSure] = null; }
    window[INTERVAL_SistematikKalanSure] = setInterval(() => { try { kalanSureHesapla(); } catch (error) { console.error('Kalan Süre Hesaplama Hatası:', error); } }, 100);

    /***************************************************** */
    /***************************************************** */










    /***************************************************** */
    /********** Ihale Bilgileri (sag icerik) ***************/
    /***************************************************** */

    var uygulamaMinArtisMiktari = 0.00;
    var uygulamaMaxVerilecekTeklif = 0.00;

    const uygulamaIhaleSag = document.createElement('div');
    uygulamaIhaleSag.id = 'uygulamaIhaleSag';

    const uygulamaIhaleSagBaslik = document.createElement('h2');
    uygulamaIhaleSagBaslik.textContent = 'İşlem Bilgileri';
    uygulamaIhaleSag.appendChild(uygulamaIhaleSagBaslik);

    const uygulamaIhaleSagContainer = document.createElement('div');
    uygulamaIhaleSagContainer.id = 'uygulamaIhaleSagContainer';
    uygulamaIhaleSag.appendChild(uygulamaIhaleSagContainer);

    /* Minimum Teklif Artış Miktarı */
    const uygulamaIhaleSagMinGrubu = document.createElement('div');
    uygulamaIhaleSagMinGrubu.id = 'uygulamaIhaleSagMinGrubu';
    uygulamaIhaleSagContainer.appendChild(uygulamaIhaleSagMinGrubu);
    const uygulamaIhaleSagMinGrubuText = document.createElement('span');
    uygulamaIhaleSagMinGrubuText.id = 'uygulamaIhaleSagMinGrubuText';
    uygulamaIhaleSagMinGrubuText.innerHTML = 'Minimum Artış: ';
    uygulamaIhaleSagMinGrubu.appendChild(uygulamaIhaleSagMinGrubuText);
    const uygulamaIhaleSagMinGrubuTextSpan = document.createElement('span');
    uygulamaIhaleSagMinGrubuTextSpan.id = 'uygulamaIhaleSagMinGrubuTextSpan';
    uygulamaIhaleSagMinGrubuTextSpan.textContent = '0.00 TL';
    uygulamaIhaleSagMinGrubuText.appendChild(uygulamaIhaleSagMinGrubuTextSpan);
    const uygulamaIhaleSagMinGrubuInput = document.createElement('input');
    uygulamaIhaleSagMinGrubuInput.id = 'uygulamaIhaleSagMinGrubuInput';
    uygulamaIhaleSagMinGrubuInput.type = 'number';
    uygulamaIhaleSagMinGrubuInput.value = '0.00';
    uygulamaIhaleSagMinGrubuInput.step = '0.01';
    uygulamaIhaleSagMinGrubuInput.min = '0.00';
    uygulamaIhaleSagMinGrubuInput.max = '99999999999.99';
    uygulamaIhaleSagMinGrubuInput.placeholder = '0.00 TL';
    uygulamaIhaleSagMinGrubuInput.addEventListener('input', function () {
        try {
            uygulamaMinArtisMiktari = parseFloat(uygulamaIhaleSagMinGrubuInput.value);
            const formattedNumber = uygulamaMinArtisMiktari.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            uygulamaIhaleSagMinGrubuTextSpan.textContent = formattedNumber + ' TL';
        } catch (error) {
            console.error('Minimum teklif artış miktarı alınamadı:', error);
        }
    });
    uygulamaIhaleSagMinGrubu.appendChild(uygulamaIhaleSagMinGrubuInput);
    const uygulamaIhaleSagMinGrubuOtomatikGetir = document.createElement('button');
    uygulamaIhaleSagMinGrubuOtomatikGetir.id = 'uygulamaIhaleSagMinGrubuOtomatikGetir';
    uygulamaIhaleSagMinGrubuOtomatikGetir.textContent = 'Otomatik Al';
    uygulamaIhaleSagMinGrubuOtomatikGetir.addEventListener('click', function () {
        try {
            const formattedNumber = parseFloat(minTeklifArtisMiktari).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            uygulamaIhaleSagMinGrubuTextSpan.textContent = formattedNumber + ' TL';
            uygulamaIhaleSagMinGrubuInput.value = parseFloat(minTeklifArtisMiktari);
            uygulamaMinArtisMiktari = parseFloat(minTeklifArtisMiktari);
        } catch (error) {
            console.error('Minimum teklif artış miktarı alınamadı:', error);
        }
    });
    uygulamaIhaleSagMinGrubuOtomatikGetir.click();
    uygulamaIhaleSagMinGrubu.appendChild(uygulamaIhaleSagMinGrubuOtomatikGetir);
    /****************************************************** */
    /* Maximum Teklif Miktarı */
    const uygulamaIhaleSagMaxGrubu = document.createElement('div');
    uygulamaIhaleSagMaxGrubu.id = 'uygulamaIhaleSagMaxGrubu';
    uygulamaIhaleSagContainer.appendChild(uygulamaIhaleSagMaxGrubu);
    const uygulamaIhaleSagMaxGrubuText = document.createElement('span');
    uygulamaIhaleSagMaxGrubuText.id = 'uygulamaIhaleSagMaxGrubuText';
    uygulamaIhaleSagMaxGrubuText.innerHTML = 'Maximum Teklif: ';
    uygulamaIhaleSagMaxGrubu.appendChild(uygulamaIhaleSagMaxGrubuText);
    const uygulamaIhaleSagMaxGrubuTextSpan = document.createElement('span');
    uygulamaIhaleSagMaxGrubuTextSpan.id = 'uygulamaIhaleSagMaxGrubuTextSpan';
    uygulamaIhaleSagMaxGrubuTextSpan.textContent = '0.00 TL';
    uygulamaIhaleSagMaxGrubuText.appendChild(uygulamaIhaleSagMaxGrubuTextSpan);
    const uygulamaIhaleSagMaxGrubuInput = document.createElement('input');
    uygulamaIhaleSagMaxGrubuInput.id = 'uygulamaIhaleSagMaxGrubuInput';
    uygulamaIhaleSagMaxGrubuInput.type = 'number';
    uygulamaIhaleSagMaxGrubuInput.value = '0.00';
    uygulamaIhaleSagMaxGrubuInput.step = '0.01';
    uygulamaIhaleSagMaxGrubuInput.min = '0.00';
    uygulamaIhaleSagMaxGrubuInput.max = '99999999999.99';
    uygulamaIhaleSagMaxGrubuInput.placeholder = '0.00 TL';
    uygulamaIhaleSagMaxGrubuInput.addEventListener('input', function () {
        try {
            uygulamaMaxVerilecekTeklif = parseFloat(uygulamaIhaleSagMaxGrubuInput.value);
            const formattedNumber = uygulamaMaxVerilecekTeklif.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            uygulamaIhaleSagMaxGrubuTextSpan.textContent = formattedNumber + ' TL';
        } catch (error) {
            console.error('Maximum teklif miktarı alınamadı:', error);
        }
    });
    uygulamaIhaleSagMaxGrubu.appendChild(uygulamaIhaleSagMaxGrubuInput);
    /****************************************************** */

    /* Teklif Ver */

    /* botun aktif veya aktif olmadığını gösteren bir span olucak */
    /* botu aktif veya pasif yapacak bir buton olucak */
    /* max teklifin kaç olduğunu ve şu anki miktardan kaç fazlasını teklif vereceğini gösterecek bir span */
    var uygulamaBotDurumu = false;

    const uygulamaIhaleSagTeklifBotuGrubu = document.createElement('div');
    uygulamaIhaleSagTeklifBotuGrubu.id = 'uygulamaIhaleSagTeklifBotuGrubu';
    uygulamaIhaleSagContainer.appendChild(uygulamaIhaleSagTeklifBotuGrubu);

    const uygulamaIhaleSagTeklifBotuGrubuText1 = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText1.id = 'uygulamaIhaleSagTeklifBotuGrubuText1';
    uygulamaIhaleSagTeklifBotuGrubuText1.innerHTML = 'BOT DURUMU: ';
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuText1);
    const uygulamaIhaleSagTeklifBotuGrubuTextSpan = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuTextSpan.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan';
    uygulamaIhaleSagTeklifBotuGrubuTextSpan.textContent = uygulamaBotDurumu ? 'Aktif' : 'Pasif';
    uygulamaIhaleSagTeklifBotuGrubuText1.appendChild(uygulamaIhaleSagTeklifBotuGrubuTextSpan);
    const uygulamaIhaleSagTeklifBotuGrubuText2 = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText2.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan2';
    uygulamaIhaleSagTeklifBotuGrubuText2.textContent = 'Max Teklif: ';
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuText2);
    const uygulamaIhaleSagTeklifBotuGrubuText2Span = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText2Span.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan2Span';
    uygulamaIhaleSagTeklifBotuGrubuText2Span.textContent = uygulamaMaxVerilecekTeklif + ' TL';
    uygulamaIhaleSagTeklifBotuGrubuText2.appendChild(uygulamaIhaleSagTeklifBotuGrubuText2Span);
    const uygulamaIhaleSagTeklifBotuGrubuText3 = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText3.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan3';
    uygulamaIhaleSagTeklifBotuGrubuText3.textContent = 'Min Artış: ';
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuText3);
    const uygulamaIhaleSagTeklifBotuGrubuText3Span = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText3Span.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan3Span';
    uygulamaIhaleSagTeklifBotuGrubuText3Span.textContent = uygulamaMinArtisMiktari + ' TL';
    uygulamaIhaleSagTeklifBotuGrubuText3.appendChild(uygulamaIhaleSagTeklifBotuGrubuText3Span);
    /* son verilen teklif */
    const uygulamaIhaleSagTeklifBotuGrubuText4 = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText4.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan4';
    uygulamaIhaleSagTeklifBotuGrubuText4.textContent = 'Son verilmiş: ';
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuText4);
    const uygulamaIhaleSagTeklifBotuGrubuText4Span = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText4Span.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan4Span';
    uygulamaIhaleSagTeklifBotuGrubuText4Span.textContent = sonTeklif + ' TL';
    uygulamaIhaleSagTeklifBotuGrubuText4.appendChild(uygulamaIhaleSagTeklifBotuGrubuText4Span);
    /* benim son verdiğim teklif değişkeni şu: son_verilen */
    const uygulamaIhaleSagTeklifBotuGrubuText5 = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText5.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan5';
    uygulamaIhaleSagTeklifBotuGrubuText5.textContent = 'Benim Son: ';
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuText5);
    const uygulamaIhaleSagTeklifBotuGrubuText5Span = document.createElement('span');
    uygulamaIhaleSagTeklifBotuGrubuText5Span.id = 'uygulamaIhaleSagTeklifBotuGrubuTextSpan5Span';
    uygulamaIhaleSagTeklifBotuGrubuText5Span.textContent = '00000';/*son_verilen + ' TL';*/
    uygulamaIhaleSagTeklifBotuGrubuText5.appendChild(uygulamaIhaleSagTeklifBotuGrubuText5Span);







    const uygulamaIhaleSagTeklifBotuGrubuButton = document.createElement('button');
    uygulamaIhaleSagTeklifBotuGrubuButton.id = 'uygulamaIhaleSagTeklifBotuGrubuButton';
    uygulamaIhaleSagTeklifBotuGrubuButton.textContent = uygulamaBotDurumu ? 'Durdur' : 'Başlat';

    uygulamaIhaleSagTeklifBotuGrubuButton.addEventListener('click', function () {
        try {
            uygulamaBotDurumu = !uygulamaBotDurumu;
            uygulamaIhaleSagTeklifBotuGrubuTextSpan.textContent = uygulamaBotDurumu ? 'Aktif' : 'Pasif';
            uygulamaIhaleSagTeklifBotuGrubuButton.textContent = uygulamaBotDurumu ? 'Durdur' : 'Başlat';
            if (uygulamaBotDurumu) {
                uygulamaIhaleSagTeklifBotuGrubuTextSpan.style.backgroundColor = 'green';
                uygulamaIhaleSagTeklifBotuGrubuText1.style.backgroundColor = 'green';
            }
            else {
                uygulamaIhaleSagTeklifBotuGrubuTextSpan.style.backgroundColor = 'red';
                uygulamaIhaleSagTeklifBotuGrubuText1.style.backgroundColor = 'red';
            }
        } catch (error) {
            console.error('Teklif Botu Durumu Hatası:', error);
        }
    });
    uygulamaIhaleSagTeklifBotuGrubu.appendChild(uygulamaIhaleSagTeklifBotuGrubuButton);

    uygulamaicerik.appendChild(uygulamaIhaleSag);



    function DurumGrubuGuncelle() {
        const KullaniciSon = document.getElementById('kullaniciMaxTeklifDiv').textContent.replace(/\./g, '').replace(',', '.');
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan2Span').textContent = parseFloat(uygulamaMaxVerilecekTeklif).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan3Span').textContent = parseFloat(uygulamaMinArtisMiktari).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan4Span').textContent = parseFloat(sonTeklif).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan4Span').textContent = parseFloat(sonTeklif).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan5Span').textContent = parseFloat(KullaniciSon).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan').textContent = uygulamaBotDurumu ? 'Aktif' : 'Pasif';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuTextSpan').style.backgroundColor = uygulamaBotDurumu ? 'green' : 'red';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuText1').style.backgroundColor = uygulamaBotDurumu ? 'green' : 'red';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuButton').textContent = uygulamaBotDurumu ? 'Durdur' : 'Başlat';
        document.getElementById('uygulamaIhaleSagTeklifBotuGrubuButton').style.backgroundColor = uygulamaBotDurumu ? 'green' : 'red';
    }

    const INTERVAL_BotDurumuGrubu = 'myMainDiv_Bot_Durumu_Grubu_guncelleme';
    if (window[INTERVAL_BotDurumuGrubu]) { clearInterval(window[INTERVAL_BotDurumuGrubu]); window[INTERVAL_BotDurumuGrubu] = null; }
    window[INTERVAL_BotDurumuGrubu] = setInterval(() => { try { DurumGrubuGuncelle(); } catch (error) { console.error('Teklif Botu Durumu Hatası:', error); } }, 987);

    /***************************************************** */
    /***************************************************** */




    /***************************************************** */
    /*****************  Otomatik Teklif Verme **************/
    /***************************************************** */

    let UygSonTeklif = parseFloat(document.getElementById('ihaleSonTeklif').textContent.replace(/\./g, '').replace(',', '.'));
    let = parseFloat(document.getElementById('kullaniciMaxTeklifDiv').textContent.replace(/\./g, '').replace(',', '.'));

    function UygulamaTeklifVer() {
        console.log('TEKLİF VERME İŞLEMİ');
        let uygKullaniciSonTeklif = parseFloat(document.getElementById('kullaniciMaxTeklifDiv').textContent.replace(/\./g, '').replace(',', '.'));
        let sonVerilenTeklif = parseFloat(document.getElementById('ihaleSonTeklif').textContent.replace(/\./g, '').replace(',', '.'));
        let uygulamaMinArtisMiktari = parseFloat(document.getElementById('uygulamaIhaleSagMinGrubuTextSpan').textContent.replace(/\./g, '').replace(',', '.'));
        if (parseFloat(minTeklifArtisMiktari) > uygulamaMinArtisMiktari) uygulamaMinArtisMiktari = parseFloat(minTeklifArtisMiktari);
        if (parseFloat(sonTeklif) > sonVerilenTeklif) sonVerilenTeklif = parseFloat(sonTeklif);
        let YeniTeklifDegeri = sonVerilenTeklif + uygulamaMinArtisMiktari;

        console.log('max Verilecek Teklif ', uygulamaMaxVerilecekTeklif, '\nSon verilen: ', sonVerilenTeklif, '\nKullanıcı Son: ', uygKullaniciSonTeklif, '\nYeni Teklif: ', YeniTeklifDegeri, '\nMin Artış: ', uygulamaMinArtisMiktari);

        if (!uygulamaBotDurumu) { console.log('Teklif Botu Pasif'); return; };
        /* max teklifimizden buyuk olmayacak */
        if (uygulamaMaxVerilecekTeklif < YeniTeklifDegeri) { console.log('Teklif Verilecek Miktar Kullanıcıdan Büyük. Teklif Verilmiyor'); return; };
        /* son verdigimiz teklif , son verilenden kücükse teklif ver */
        if (uygKullaniciSonTeklif > (sonVerilenTeklif - 1)) { console.log('Teklif Verilecek Miktar Kullanıcıdan Küçük. Teklif Verilmiyor'); return; };
        /* Teklif Veriliyor */
        console.log('Teklif Veriliyor: ', YeniTeklifDegeri);
        const uygElementInput = document.getElementById('teklifMiktari');
        uygElementInput.value = YeniTeklifDegeri.toFixed(2).replace('.', ',');

        /* teklif verme butonu a tagındaki onclick=IlanDetayi.teklifEkle(); olan*/
        const uygElementTeklifVer = document.querySelector('a[onclick="IlanDetayi.teklifEkle();"]');
        document.getElementById('uygulamaIhaleBilgileriVerdigimTeklifler').textContent += ' ; ' + parseFloat(YeniTeklifDegeri).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL' + ' TL';
        if (uygElementTeklifVer) {
            uygElementTeklifVer.click();
            console.log('\n\n\nTeklif Verildi:', YeniTeklifDegeri, '\n\n\n');
        } else console.error('Teklif verme butonu bulunamadı!');

        /* Tekliften Sonraki Onay Butonu */
        let confirmAttemptStart = Date.now();
        function _teklifVermeOnay() {
            if (document.querySelector('button[data-bb-handler="confirm"]')) return true;
            if (Date.now() - confirmAttemptStart > 2000) return false;
            _teklifVermeOnay();
        }
        if (_teklifVermeOnay()) {
            const confirmButton = document.querySelector('button[data-bb-handler="confirm"]');
            if (confirmButton) confirmButton.click(); else console.error('Teklif verme onayı butonu bulunamadı!');
        }
    }

    let sonTeklifObserver;
    function setupSonTeklifObserver() {
        if (sonTeklifObserver) { sonTeklifObserver.disconnect(); sonTeklifObserver = null; }
        sonTeklifObserver = new MutationObserver((mutations) => {
            try {
                UygSonTeklif = parseFloat(document.getElementById('ihaleSonTeklif').textContent.replace(/\./g, '').replace(',', '.'));
                console.log('Son Teklif Gözlemcisi Tetiklendi');
                if (uygulamaBotDurumu) UygulamaTeklifVer();
            } catch (error) { console.error('Son Teklif Değişim Hatası:', error); }
        });
        sonTeklifObserver.observe(document.getElementById('ihaleSonTeklif'), { childList: true, characterData: true, subtree: true, characterDataOldValue: true });
    } setupSonTeklifObserver();

    function SonTeklifDegistiMi() {
        try {
            const sonTeklifElement = document.getElementById('ihaleSonTeklif');
            if (sonTeklifElement) {
                const yeniSonTeklif = parseFloat(sonTeklifElement.textContent.replace(/\./g, '').replace(',', '.'));
                if (yeniSonTeklif !== UygSonTeklif) {
                    UygSonTeklif = yeniSonTeklif;
                    console.log('Son Teklif Değişti:', sonTeklif);
                    UygulamaTeklifVer();
                }
            }
            if (sonTeklif !== UygSonTeklif) {
                sonTeklif = UygSonTeklif;
                console.log('Son Teklif Değişti:', sonTeklif);
            }
        } catch (error) { console.error('Son Teklif Değişim Hatası:', error); }
    }
    const INTERVAL_SonTeklifKontrol = 'myMainDiv_Bot_son_teklif';
    if (window[INTERVAL_SonTeklifKontrol]) { clearInterval(window[INTERVAL_SonTeklifKontrol]); window[INTERVAL_SonTeklifKontrol] = null; }
    window[INTERVAL_SonTeklifKontrol] = setInterval(() => { try { SonTeklifDegistiMi(); } catch (error) { console.error('Teklif Botu Durumu Hatası:', error); } }, 20);







    /***************************************************** */
    /**************  Sayfa Ustune bosluk ekle **************/
    /***************************************************** */
    const INTERVAL_TopMargin_Id = 'myMainDiv_element_yukseltme';
    if (window[INTERVAL_TopMargin_Id]) { clearInterval(window[INTERVAL_TopMargin_Id]); window[INTERVAL_TopMargin_Id] = null; }
    window[INTERVAL_TopMargin_Id] = setInterval(() => {
        try {
            const currentHeight = (mainMydiv.clientHeight + 13) + 'px';
            const body = document.querySelector('body');
            const header = document.getElementById('top') || document.querySelectorAll('.page-header')[0];
            mfmxdiv.style.setProperty('margin-top', currentHeight, 'important');
            if (body) body.style.setProperty('margin-top', currentHeight, 'important');
            if (header) header.style.setProperty('margin-top', currentHeight, 'important');
        } catch (error) {
            console.error('Margin ayarlama hatasi:', error);
            if (mainMydiv) mainMydiv.innerHTML = `<div style="color: red">Hata: ${error.message}</div>`;
        }
    }, 1234);
    /***************************************************** */
    /***************************************************** */
})().catch(error => { console.error('\n\nGenel hata:', error); });;