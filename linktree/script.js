/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-04-14
 */

let json_data = null;

function getScriptPath() {
    if (document.currentScript?.src) return new URL(document.currentScript.src).toString();
    const currentScript = Array.from(document.getElementsByTagName('script')).find(script => script.src?.includes('importHeaderFooter.js'));
    if (currentScript?.src) return new URL(currentScript.src).toString();
    const fallbackPath = new URL('/linktree/script.js', window.location.origin).toString();
    console.log('⚠️ HeaderFooter Script yolu bulunamadı! Varsayılan konum kullanılıyor:', fallbackPath);
    return fallbackPath;
};

document.addEventListener('DOMContentLoaded', domLoaded);

async function domLoaded() {
    try {
        for (let i = 0; i < 20; i++) {
            try {
                //await new Promise(resolve => setTimeout(resolve, 1000));
                const success = await catch_linktree_file();
                if (!(success && json_data)) {
                    console.log(`❌ Deneme ${i + 1}/20 başarısız, tekrar deneniyor...`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    continue;
                }
                break;
            } catch (error) { console.error('Deneme sırasında hata:', error); }
        } if (!json_data) { console.log('❌ Deneme 20/20 başarısız, lütfen daha sonra tekrar deneyin.'); return; }

        const mainContent = document.getElementById('mainContent');
        const mainUl = document.createElement('ul');
        mainContent.appendChild(mainUl);
        // json_data'nın içindeki "files" dizisini döngüye al
        json_to_list(json_data, mainUl);

        function json_to_list(json, parentUl) {

            json.files.forEach(file => {
                if (file.name == "index.html") {
                    if ( json.files.length == 1 && json.children.length == 0)  parentUl.remove();
                }
                else {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = file.full_url;
                    a.className = "linkFile";
                    a.textContent = file.name;
                    li.appendChild(a);
                    parentUl.appendChild(li);
                }
            });

            json.children.forEach(child => {
                const Newli = document.createElement('li');
                const Newa = document.createElement('a');
                Newa.href = child.full_url;
                Newa.className = "linkDir";
                Newa.textContent = child.name;
                Newli.appendChild(Newa);
                Newli.innerHTML += `<span class="lastDate">(${child.date})</span>`;
                parentUl.appendChild(Newli);

                const Newul = document.createElement('ul');
                Newli.appendChild(Newul);
                json_to_list(child, Newul);
            });
        }


    }
    catch (error) {
        console.log('\n❌ Linktree Error: please contact to @mefamex with screenshots');
        console.error(error);
        setTimeout(domLoaded, 1000);
    }
}

async function catch_linktree_file() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "./link_tree.json", true);
        xhr.responseType = 'json';

        xhr.onload = function () {
            if (xhr.status === 200) {
                json_data = xhr.response;
                console.log('✅ Linktree data loaded successfully');
                resolve(true);
            } else {
                console.error('❌ Error loading linktree data:', xhr.statusText);
                resolve(false);
            }
        };

        xhr.onerror = function () {
            console.error('❌ Error loading linktree data:', xhr.statusText);
            resolve(false);
        };

        xhr.send();
    });
}