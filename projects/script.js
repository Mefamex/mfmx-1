/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-03-03
 */

document.addEventListener('DOMContentLoaded', organize_checkbox);

function organize_checkbox() {
    let searchInput = document.getElementById('search') ?? "";
    let checkboxes = "";
    searchInput = document.getElementById('search');
    searchInput.addEventListener('input', handleSearchInput);
    document.getElementById('search-form').addEventListener('submit', (event) => event.preventDefault());


    // Tüm dilleri al ve checkbox'ları oluştur
    const languages = new Set();
    const projectItems = document.querySelectorAll('.card ul li');

    projectItems.forEach(item => {
        const langs = item.getAttribute('data-language')?.toLowerCase().split(',').map(lang => lang.trim()) || [];
        langs.forEach(lang => languages.add(lang)); // Set'e ekleme daha hızlı.
    });

    // fieldset'i temizler
    const fieldset = document.querySelector('#search-form fieldset');
    fieldset.querySelectorAll("label").forEach(label => label.remove());

    // checkbox'ları oluşturur
    languages.forEach(lang => {
        const projectCount = Array.from(projectItems).filter(item => { return (item.getAttribute('data-language')?.toLowerCase().split(',').map(l => l.trim()) || []).includes(lang); }).length;

        const label = document.createElement('label');
        label.innerHTML = `<input type='checkbox' name='language' value='${lang}' id='${lang}'> (${projectCount}) ${lang.toUpperCase()} `;
        fieldset.appendChild(label);
    });

    // checkbox dinleyicileri ekle
    checkboxes = document.querySelectorAll('input[name="language"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => changed_checkbox(checkbox));
        checkbox.style.display = 'none';
    });


    function handleSearchInput() {
        if (this.value.length > 20) this.value = this.value.slice(0, 20);
        updateSearchResults(document.querySelectorAll('ul li'), document.querySelectorAll('input[name="language"]'), this); // parametreleri verimli kullan
    }

    // Checkbox değiştiğinde çalışan fonksiyon
    function changed_checkbox(cb) {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        cb.parentElement.classList.toggle('label-secildi', cb.checked);
        updateSearchResults();
        window.scrollTo(0, scrollPos);
    }

    // Arama sonuçlarını güncelleyen fonksiyon
    function updateSearchResults() {
        const searchTerm = (document.createElement('div').textContent = searchInput.value).toLowerCase().trim();
        const selectedLanguages = new Set(Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value));


        document.querySelectorAll('section.card').forEach(section => {
            let hasVisibleItems = false;

            section.querySelectorAll('.card ul li').forEach(item => {
                const combinedText = (item.textContent + ' ' + Array.from(item.attributes).map(attr => attr.value).join(' ')).toLowerCase();
                const projectLanguages = (item.getAttribute('data-language') || '').toLowerCase().split(',').map(lang => lang.trim());
                const languageMatch = selectedLanguages.size === 0 || Array.from(selectedLanguages).every(selectedLang => projectLanguages.includes(selectedLang));
                item.style.display = (combinedText.includes(searchTerm) && languageMatch) ? '' : 'none';
                if (item.style.display === '') hasVisibleItems = true;
            });

            // Eğer tüm maddeler gizlenmişse, section'ı gizle
            section.style.display = hasVisibleItems ? 'flex' : 'none';
        });
    }
}