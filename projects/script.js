/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-03-11
 */

document.addEventListener('DOMContentLoaded', domLoaded);


var searchInput = "";
var checkboxes = "";
var languages = new Set();
var projectItems = "";
const fieldset = document.querySelector('#search-form fieldset');


async function domLoaded() {
    document.getElementById('projects-search').style.display = 'flex';

    searchInput = document.getElementById('search') ?? "";
    checkboxes = document.querySelectorAll('input[name="language"]');
    searchInput.addEventListener('input', updateSearchResults);
    document.getElementById('search-form').addEventListener('submit', (event) => event.preventDefault());

    get_languages();
    create_checkboxes();
    listener_for_checkboxes();
}


// Checkboxları dinler
function listener_for_checkboxes() {
    // checkbox dinleyicileri ekle
    checkboxes = document.querySelectorAll('input[name="language"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => changed_checkbox(checkbox));
        checkbox.style.display = 'none';
    });
}


// Checkboxları oluşturur
function create_checkboxes() {
    fieldset.querySelectorAll("label").forEach(label => label.remove());

    languages.forEach(lang => {
        let projectCount = Array.from(projectItems).filter(item => { return (item.getAttribute('data-language')?.toLowerCase().split(',').map(l => l.trim()) || []).includes(lang); }).length;

        let label = document.createElement('label');
        label.innerHTML = `<input type='checkbox' name='language' value='${lang}' id='${lang}'> (${projectCount}) ${lang.toUpperCase()} `;
        fieldset.appendChild(label);
    });

}


// Tüm dilleri al
function get_languages() {
    languages = new Set();
    projectItems = document.querySelectorAll('.card ul li');

    projectItems.forEach(item => {
        let langs = item.getAttribute('data-language')?.toLowerCase().split(',').map(lang => lang.trim()) || [];
        langs.forEach(lang => languages.add(lang));
    });
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
    }); checkboxes_modify();
}

// arama sonucuna göre modifiye eder
function checkboxes_modify() {
    checkboxes = document.querySelectorAll('input[name="language"]');
    const visibleProjects = Array.from(document.querySelectorAll('.card ul li')).filter(item => item.style.display !== 'none');

    // For each language checkbox, count visible projects with that language
    checkboxes.forEach(checkbox => {
        const lang = checkbox.value;
        const count = visibleProjects.filter(item => {
            return ((item.getAttribute('data-language') || '').toLowerCase().split(',').map(l => l.trim())).includes(lang);
        }).length;

        // Update the count in the label
        const updatedText = checkbox.parentElement.textContent.replace(/\(\d+\)/, `(${count})`);
        checkbox.parentElement.style.opacity = count === 0 ? '0.3' : '1';
        checkbox.parentElement.innerHTML = `<input type='checkbox' name='language' value='${lang}' id='${lang}'${checkbox.checked ? ' checked' : ''}> ${updatedText}`;
    });
    
    // Reattach event listeners since we modified the HTML
    listener_for_checkboxes();
}