/**
 * @fileoverview MEFAMEX - Projects - lisans puan hesaplama Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2025-03-22
 * @lastModified 2025-03-22
 */

// wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', domLoaded);

// global variables
var projectItems;


async function domLoaded() {
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    createOneLesson();
    check_inputDersNotuIsLastUsed();
}

function createOneLesson() {
    /*
                            <input type="text" name="ders_adi_input_01" placeholder="Ders Adı" />
                            <span> &rarr; </span>
                            <select class="ders_kredisi" name="ders_01" title="ders_01">
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2" selected>2</option>
                            </select>
                            <span>:</span>
                            <input type="ders_adi" name="ders_notu_01" placeholder="Not" min="0" max="100" />
                        </li>
    */

    const ull = document.querySelector('#section_hesapla #container_hesapla ul');
    const ull_childs_count = ull.childElementCount + 1;
    const lii_special_count = ull_childs_count < 10 ? '0' + ull_childs_count : ull_childs_count;
    const lii = document.createElement('li');
    const inputDersAdi = document.createElement('input');
    const span1 = document.createElement('span');
    const select = document.createElement('select');
    const span2 = document.createElement('span');
    const inputDersNotu = document.createElement('input');
    const span3 = document.createElement('span');
    const buttonClose = document.createElement('button');

    inputDersAdi.type = 'text';
    inputDersAdi.name = 'ders_adi_input_' + lii_special_count;
    inputDersAdi.placeholder = 'Ders Adı ' + lii_special_count;
    lii.appendChild(inputDersAdi);

    span1.innerHTML = '&rarr;';
    lii.appendChild(span1);

    select.className = 'ders_kredisi_select';
    select.name = 'ders_kredisi_select_' + lii_special_count;
    select.title = 'ders_kredisi_select_' + lii_special_count;
    const option = document.createElement('option');
    option.value = 0;
    option.textContent = 'Kredi';
    select.appendChild(option);
    for (let i = 1; i < 81; i++) {
        const option = document.createElement('option');
        option.value = i / 2;
        option.textContent = (i / 2).toFixed(1);
        select.appendChild(option);
    }
    select.oninput = function () { changed_selectDersKredisi(this); };
    lii.appendChild(select);

    span2.innerHTML = ':';
    lii.appendChild(span2);

    inputDersNotu.type = 'number';
    inputDersNotu.name = 'ders_notu_' + lii_special_count;
    inputDersNotu.placeholder = 'Not';
    inputDersNotu.min = 0;
    inputDersNotu.max = 100;
    inputDersNotu.oninput = function () { changed_inputDersNotu(this); };
    lii.appendChild(inputDersNotu);

    span3.innerHTML = ': 0.00';
    span3.style.display = 'none';
    span3.className = 'ders_notu_agirlikli';
    lii.appendChild(span3);

    buttonClose.innerHTML = '❌';
    buttonClose.className = 'close_li';
    buttonClose.onclick = function () { this.parentElement.remove(); check_inputDersNotuIsLastUsed(); };
    lii.appendChild(buttonClose);

    ull.appendChild(lii);
}

function changed_selectDersKredisi(item) {
    console.log(item.value);
    const li = item.parentElement;
    const inputDersNotu = li.querySelector('input[type="number"]');
    if (item.value == 0) {
        inputDersNotu.value = '';
        console.log(item.parentElement.querySelector('input[type="number"]').value);
    } else if (inputDersNotu.value == '' || inputDersNotu.value < 0) inputDersNotu.value = 0;

    changed_inputDersNotu(inputDersNotu);
}

function changed_inputDersNotu(item) {
    check_inputDersNotuIsLastUsed();
    console.log('\n\nİNPUT ', item);
    // bu inputun ile aynı li'de bulunan selecti bul
    // bu inputun value'sunu al
    // selectin value'sunu al
    // bu ikisini çarp
    // sonucu yazdır
    const li = item.parentElement;
    const inputDersNotuValue = li.querySelector('input[type="number"]').value;
    const select = li.querySelector('select');
    console.log('select.value', select.value);
    console.log('inputDersNotuValue', inputDersNotuValue);

    if (select.value == 0 && !(inputDersNotuValue == '' || inputDersNotuValue < 0)) select.value = 1;
    const selectValue = select.value;
    const span3 = li.querySelector('span:last-child');


    if (inputDersNotuValue == '' || inputDersNotuValue < 0) {
        console.log('inputDersNotu.value', inputDersNotuValue);
        li.querySelectorAll('input').forEach(element => element.style.backgroundColor = '');
        li.querySelectorAll('select').forEach(element => element.style.backgroundColor = '');
        span3.style.display = 'none';
        return;
    }
    /* #container_hesapla ul li input ,#container_hesapla ul li select : backcolor #fff; */
    li.querySelectorAll('input').forEach(element => element.style.backgroundColor = '#fff');
    li.querySelectorAll('select').forEach(element => element.style.backgroundColor = '#fff');

    span3.style.display = '';
    span3.textContent = ': ' + (inputDersNotuValue * selectValue).toFixed(0);

    check_inputDersNotuIsLastUsed();
}

function check_inputDersNotuIsLastUsed() {
    const ull = document.querySelector('#section_hesapla #container_hesapla ul');
    if (!ull || ull.children.length < 2) { createOneLesson(); return; }
    const last_li = ull.lastElementChild;
    try {
        if (last_li.querySelector('input[type="number"]').value) createOneLesson();
        else if (!last_li.previousElementSibling.querySelector('input[type="number"]').value) { ull.removeChild(last_li); check_inputDersNotuIsLastUsed(); }
    } catch (error) { console.error('Ders kontrolünde hata:', error); }
}
