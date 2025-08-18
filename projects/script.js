/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-08-18-T00:00:00Z
 */
'use strict';
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', domLoaded, { once: true });
else domLoaded();


var searchInput, checkboxes, checkboxContainer, projectItems, languages;

async function domLoaded() {
    try {
        searchInput = document.getElementById('search');
        checkboxes = document.querySelectorAll('#search-form fieldset input[name="language"]');
        checkboxContainer = document.querySelector('#search-form fieldset')
        if (!searchInput || !checkboxContainer) { setTimeout(domLoaded, 100); return; };
        document.getElementById('projects-search').style.display = 'flex';
        create_checkboxes();
        checkboxContainer.addEventListener('change', (event) => changed_checkbox(event.target));
        document.getElementById('search-form').addEventListener('submit', e => e.preventDefault());
        searchInput?.addEventListener('input', () => requestAnimationFrame(updateSearchResults));
        console.log('');
        console.log('✅ Search Form initialized');
    }
    catch (error) {
        console.log('\n❌ Search Form Error: please contact to @mefamex with screenshots');
        console.error(error);
        document.getElementById('projects-searh').style.display = 'none';
        document.getElementById('search-form').style.display = 'none';
        document.querySelectorAll('.card').forEach(item => item.style.display = 'flex');
        document.querySelectorAll('.card ul li').forEach(item => item.style.display = '');
        setTimeout(domLoaded, 1000);
    }
}

/* Dilleri cardlardan al ve Checkboxları oluştur */
function create_checkboxes() {
    /* dilleri al*/
    projectItems = document.querySelectorAll('.card ul li');
    languages = new Set(
        Array.from(projectItems)
            .reduce((langs, item) => {
                const itemLangs = item.getAttribute('data-language')?.toLowerCase() || '';
                item.dataset.languageCache = itemLangs;
                return [...langs, ...itemLangs.split(',').map(l => l.trim())];
            }, []).filter(Boolean)
    );
    document.documentElement.dataset.availableLanguages = [...languages].join(',');
    /* checkboxları oluştur */
    checkboxContainer.innerHTML = '';
    const projectCounts = new Map([...languages].map(lang => [lang, Array.from(projectItems).reduce((sum, item) => sum + ((item.getAttribute('data-language')?.toLowerCase().includes(lang) || 0) ? 1 : 0), 0)]));
    checkboxContainer.appendChild([...languages]
        .sort((a, b) => projectCounts.get(b) - projectCounts.get(a))
        .reduce((fragment, lang) => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" name="language" value="${lang}" id="${lang}"> <span class="count">(${projectCounts.get(lang)})</span> ${lang.toUpperCase()}`;
            fragment.appendChild(label);
            return fragment;
        }, document.createDocumentFragment())
    );
    checkboxes = document.querySelectorAll('#search-form fieldset input[name="language"]');
    checkboxes.forEach(cb => {
        cb.style.display = 'none';
        cb.setAttribute('aria-label', `${cb.value} dilini filtrele`);
    });
}


/* Checkbox değiştiğinde çalışan fonksiyon */
function changed_checkbox(cb) {
    if (!cb?.parentElement) return;
    const scrollPos = window.scrollY;
    requestAnimationFrame(() => {
        cb.parentElement.classList.toggle('label-secildi', cb.checked);
        updateSearchResults();
        Math.abs(window.scrollY - scrollPos) > 0 && window.scrollTo({ top: scrollPos, behavior: 'instant' });
    });
}


/* Arama sonuçlarını güncelleyen fonksiyon*/
function updateSearchResults() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedLangs = new Set(Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value));
    document.querySelectorAll('section.card').forEach(section => {
        const visibleItems = Array.from(section.querySelectorAll('.card ul li')).filter(item => {
            const text = item.dataset.searchCache || (item.dataset.searchCache = `${item.textContent} ${Array.from(item.attributes).map(a => a.value).join(' ')}`.toLowerCase());
            const langs = item.dataset.languageCache || (item.dataset.languageCache = (item.getAttribute('data-language') || '').toLowerCase());
            const languageMatch = selectedLangs.size === 0 || [...selectedLangs].every(lang => langs.split(',').map(l => l.trim()).includes(lang));
            const isVisible = text.includes(searchTerm) && languageMatch;
            item.style.display = isVisible ? '' : 'none';
            return isVisible;
        });
        section.style.display = visibleItems.length ? 'flex' : 'none';
    });
    /* Checkbox sayılarını güncelle */
    const visibleProjects = Array.from(document.querySelectorAll('.card ul li')).filter(item => item.style.display !== 'none');
    checkboxes.forEach(checkbox => {
        const count = visibleProjects.filter(item => (item.getAttribute('data-language') || '').toLowerCase().split(',').map(l => l.trim()).includes(checkbox.value)).length;
        checkbox.parentElement.querySelector('.count').textContent = `(${count})`;
        checkbox.disabled = count === 0;
        /* cursor normal*/
        checkbox.parentElement.style.cursor = count ? '' : 'default';
        checkbox.parentElement.style.opacity = count ? '' : '0.3';
        checkbox.checked = checkbox.checked;
    });
}
