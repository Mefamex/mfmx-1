document.addEventListener('DOMContentLoaded', organize_checkbox);

let searchInput = document.getElementById('search') ?? "";
let checkboxes = "";

function organize_checkbox() {
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
        // projectItems'ı diziye dönüştür
        const projectItemsArray = Array.from(projectItems); // Veya [...projectItems] ile spread operatörü kullanın

        const projectCount = projectItemsArray.filter(item => {
            const langs = item.getAttribute('data-language')?.toLowerCase().split(',').map(l => l.trim()) || [];
            return langs.includes(lang);
        }).length;

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
}

function handleSearchInput() {
    if (this.value.length > 20) this.value = this.value.slice(0, 20);
    updateSearchResults(document.querySelectorAll('ul li'), document.querySelectorAll('input[name="language"]'), this); // parametreleri verimli kullan
}

// Checkbox değiştiğinde çalışan fonksiyon
function changed_checkbox(checkbox) {
    checkbox.parentElement.classList.toggle('label-secildi', checkbox.checked);
    updateSearchResults();
}

// Arama sonuçlarını güncelleyen fonksiyon
function updateSearchResults() {

    const searchTerm = sanitizeInput(searchInput.value).toLowerCase().trim();
    const selectedLanguages = new Set(Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value));

    const projectSections = document.querySelectorAll('section.card');

    projectSections.forEach(section => {
        const projectItems = section.querySelectorAll('.card ul li');
        let hasVisibleItems = false;

        projectItems.forEach(item => {
            const combinedText = (item.textContent + ' ' + Array.from(item.attributes).map(attr => attr.value).join(' ')).toLowerCase();
            const projectLanguages = (item.getAttribute('data-language') || '').toLowerCase().split(',').map(lang => lang.trim());
            const languageMatch = selectedLanguages.size === 0 || projectLanguages.some(lang => selectedLanguages.has(lang));
            item.style.display = (combinedText.includes(searchTerm) && languageMatch) ? '' : 'none';
            if (item.style.display === '') hasVisibleItems = true;
        });

        // Eğer tüm maddeler gizlenmişse, section'ı gizle
        section.style.display = hasVisibleItems ? 'flex' : 'none';
    });
}
// Kullanıcıdan alınan girişi temizleyen fonksiyon
function sanitizeInput(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
}