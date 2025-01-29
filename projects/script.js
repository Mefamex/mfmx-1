// Arama kutusuna olay dinleyici ekle
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
    if (this.value.length > 20) this.value = this.value.slice(0, 20); 
    updateSearchResults(); // Giriş güncellendikten sonra sonuçları güncelle
});

// Checkbox'lara olay dinleyici ekle
const languageCheckboxes = document.querySelectorAll('input[name="language"]');
languageCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateSearchResults));

// Arama sonuçlarını güncelleyen fonksiyon
function updateSearchResults() {
    const searchTerm = sanitizeInput(searchInput.value);
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(input => input.value);

    const projectSections = document.querySelectorAll('section.card');

    projectSections.forEach(section => {
        const projectItems = section.querySelectorAll('ul li');
        let hasVisibleItems = false; // Görünen öğe kontrolü

        projectItems.forEach(item => {
            // textContent'i ve tüm attribute'ları al
            const projectName = item.textContent.toLowerCase();
            const attributes = Array.from(item.attributes);
            const attributesText = attributes.map(attr => attr.value.toLowerCase()).join(' ');
            const combinedText = projectName + ' ' + attributesText;

            const projectLanguages = item.getAttribute('data-language').toLowerCase().split(', ');

            const nameMatch = combinedText.includes(searchTerm);
            const languageMatch = selectedLanguages.length === 0 || selectedLanguages.some(lang => projectLanguages.includes(lang));

            if (nameMatch && languageMatch) {
                item.style.display = ''; // Eşleşen projeyi göster
                hasVisibleItems = true; // Görünen öğe var
            } else item.style.display = 'none';
        });

        // Eğer tüm maddeler gizlenmişse, section'ı gizle
        if (!hasVisibleItems) section.style.display = 'none';
        else section.style.display = '';

    });
}

// Kullanıcıdan alınan girişi temizleyen fonksiyon
function sanitizeInput(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input; // Kullanıcı girişini metin olarak ayarlayın
    return tempDiv.innerHTML; // Temizlenmiş HTML'i döndürün
}