/**
 * @fileoverview MEFAMEX main JavaScript file
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2024-09-13 
 * @lastModified 2026-06-22-T00:00:00Z
 */


// Fonksiyonları sırayla çalıştırma
(async () => {
        try { initClarity(); } catch (e) { console.warn("Clarity init failed:", e); }
        try { await displayDeveloperMessage(); } catch (e) { console.warn("Developer message display failed:", e); }
        try { initZiyaretciAnalizi(); } catch (e) { console.warn("Ziyaretçi analizi başlatılamadı:", e); }
    }

)();


async function initClarity() { (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt"; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "t71705cgbn"); };


async function displayDeveloperMessage() {
    const titleStyle = 'font-size:36px; font-weight:900; color:#ffffff; padding:12px 18px; border-radius:1rem; background:linear-gradient(45deg,#0048ac,#007a9bfd); font-family:cursive; letter-spacing:2px';
    const subtitleStyle = 'color:#dfefff; font-size:14px; font-weight:600; font-family:cursive; margin-block:0.5rem; padding-left:3rem;';
    const noteStyle = 'color:#bcdcff; font-size:11px; font-family:cursive';
    const linkline = 'color:#0096ff; text-decoration:none;';
    const linkStyle = 'color:#0096ff; text-decoration:underline;';
    console.log('%cMEFAMEX%c\npersonal website%c\n\n Eğer geliştiriciyseniz, sohbet etmek için neden iletişime geçmiyorsunuz? 📬 %c\n\nİletişim -> %chttps://mefamex.com/contact/ %c\nGithub   -> %chttps://github.com/Mefamex/mfmx-1', titleStyle, subtitleStyle, noteStyle, linkline, linkStyle, linkline, linkStyle);
}


const initZiyaretciAnalizi = () => document.body.appendChild(Object.assign(document.createElement('script'), { type: 'module', src: '/src/scripts/who.js' }));
