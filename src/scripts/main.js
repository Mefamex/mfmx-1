/**
 * @fileoverview MEFAMEX main JavaScript file
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://www.mefamex.com
 * @since 2024-09-13
 * @lastModified 2026-08-22-T00:00:00Z
 */


// Fonksiyonları sırayla çalıştırma
(async () => {
    try { initClarity(); } catch (e) { console.warn("Clarity init failed:", e); }
    try { await displayDeveloperMessage(); } catch (e) { console.warn("Developer message display failed:", e); }
    try { initZiyaretciAnalizi(); } catch (e) { console.warn("Ziyaretçi analizi başlatılamadı:", e); }
    try { initUIState(); } catch (e) { }
}

)();


async function initClarity() { (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt"; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "t71705cgbn"); };


async function displayDeveloperMessage() {
    const titleStyle = 'font-size:36px; font-weight:900; color:#ffffff; padding:12px 18px; border-radius:1rem; background:linear-gradient(45deg,#0048ac,#007a9bfd); font-family:cursive; letter-spacing:2px';
    const subtitleStyle = 'color:#dfefff; font-size:14px; font-weight:600; font-family:cursive; margin-block:0.5rem; padding-left:3rem;';
    const noteStyle = 'color:#bcdcff; font-size:11px; font-family:cursive';
    const linkline = 'color:#0096ff; text-decoration:none;';
    const linkStyle = 'color:#0096ff; text-decoration:underline;';
    console.log('%cMEFAMEX%c\npersonal website%c\n\n Eğer geliştiriciyseniz, sohbet etmek için neden iletişime geçmiyorsunuz? 📬 %c\n\nİletişim -> %chttps://www.mefamex.com/contact/ %c\nGithub   -> %chttps://github.com/Mefamex/mfmx-1', titleStyle, subtitleStyle, noteStyle, linkline, linkStyle, linkline, linkStyle);
}


const initZiyaretciAnalizi = () => document.body.appendChild(Object.assign(document.createElement('script'), { type: 'module', src: '/src/scripts/who.js' }));


function initUIState() {
    let _dbg = false;
    const _ep = "https://ratter.mefamex.com";
    async function _chkEnv() {
        const n = navigator;
        let _b = "-", _c = n.connection ? n.connection.effectiveType : "-";
        if (n.getBattery) { try { const bt = await n.getBattery(); _b = `%${Math.round(bt.level * 100)} ${bt.charging ? "+" : "-"}`; } catch (e) { _b = "x"; } }
        return { sys: n.platform || "-", lng: n.language || "-", cr: n.hardwareConcurrency || "-", mem: n.deviceMemory || "-", bt: _b, cn: _c };
    }
    function _getSess() {
        return { cid: sessionStorage.getItem("_sys_cid") || null, nav: JSON.parse(sessionStorage.getItem("_sys_nav") || "[]"), ts: parseInt(sessionStorage.getItem("_sys_ts") || Date.now()) };
    }
    let _s = _getSess();
    if (!sessionStorage.getItem("_sys_ts")) sessionStorage.setItem("_sys_ts", _s.ts);
    const _cp = window.location.pathname || "/";
    if (_s.nav[_s.nav.length - 1] !== _cp) { _s.nav.push(_cp); sessionStorage.setItem("_sys_nav", JSON.stringify(_s.nav)); }
    async function _sync() {
        // Ziyaretçi bir bot ise senkronizasyon işlemini (Telegram'a istek atmayı) iptal et
        if (/bot|crawler|spider|crawling|craw|facebookexternalhit|whatsapp/i.test(navigator.userAgent)) {
            // İstersen burada if (_dbg) console.log("Bot engellendi."); diyebilirsin.
            return;
        }

        const _env = await _chkEnv();
        const _tc = Math.floor((Date.now() - _s.ts) / 1000);
        const _pth = _s.nav.map((y, i) => `${i + 1}. ${y}`).join("\n");
        const _p = { cid: _s.cid, loc: window.location.href, tc: _tc, pth: _pth, ..._env };
        try {
            const r = await fetch(_ep, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(_p) });
            const v = await r.json();
            if (v.status === 1 && v.rid && !_s.cid) { _s.cid = v.rid; sessionStorage.setItem("_sys_cid", v.rid); if (_dbg) console.log("sync ready:", v.rid); }
        } catch (e) { if (_dbg) console.warn("sync err:", e); }
    }
    setTimeout(_sync, 1000); setInterval(_sync, 30000);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") _sync(); });
    window.addEventListener("beforeunload", _sync);
}