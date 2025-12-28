/**
 * @fileoverview MEFAMEX main JavaScript file
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2024-09-13 
 * @lastModified 2025-09-13-T00:00:00Z
 */


// Fonksiyonları sırayla çalıştırma
async function runAll() {
    try { initClarity(); } catch (e) { console.warn("Clarity init failed:", e); }
    try { await displayDeveloperMessage(); } catch (e) { console.warn("Developer message display failed:", e); }
    try { await initChatWidget(); } catch (e) { console.warn("Chat widget init failed:", e); }
} runAll();

async function initClarity() { (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt"; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "t71705cgbn"); };


async function displayDeveloperMessage() {
    const titleStyle = 'font-size:36px; font-weight:900; color:#ffffff; padding:12px 18px; border-radius:1rem; background:linear-gradient(45deg,#0048ac,#007a9bfd); font-family:cursive; letter-spacing:2px';
    const subtitleStyle = 'color:#dfefff; font-size:14px; font-weight:600; font-family:cursive; margin-block:0.5rem; padding-left:3rem;';
    const noteStyle = 'color:#bcdcff; font-size:11px; font-family:cursive';
    const linkline = 'color:#0096ff; text-decoration:none;';
    const linkStyle = 'color:#0096ff; text-decoration:underline;';
    console.log('%cMEFAMEX%c\npersonal website%c\n\n Eğer geliştiriciyseniz, sohbet etmek için neden iletişime geçmiyorsunuz? 📬 %c\n\nİletişim -> %chttps://mefamex.com/contact/ %c\nGithub   -> %chttps://github.com/Mefamex/mfmx-1', titleStyle, subtitleStyle, noteStyle, linkline, linkStyle, linkline, linkStyle);
}


/**
 * Sağ altta görünen Gemini sohbet baloncuğu
 * Not: API anahtarını tarayıcıya koymak güvenli değildir.
 *      Tercihen ters proxy veya backend üzerinden çağrı yapılmalıdır.
 *      Yine de doğrudan kullanmak isterseniz window.MEFMX_GEMINI_API_KEY ile geçebilirsiniz.
 */
async function initChatWidget() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (document.getElementById('mfmx-chat-container')) return;

    const apiKey = window.MEFMX_GEMINI_API_KEY || 'AIzaSyAEjyTEAabZ37Jegq44OXYyl69T-ihHSko';
    const modelName = 'gemini-2.5-flash';

    const style = document.createElement('style');
    style.id = 'mfmx-chat-style';
    style.textContent = [
        '#mfmx-chat-container{position:fixed;z-index:1200;right:1.5rem;bottom:1.5rem;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#f9fbff;} ',
        '#mfmx-chat-toggle{width:3.25rem;height:3.25rem;border-radius:999px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;',
        'background:radial-gradient(circle at 30% 0%, #4a7ede, #22c563 40%, #261580);;box-shadow:0 0.75rem 1.5rem rgba(0,0,0,.6);}',
        '#mfmx-chat-toggle span{font-size:1.4rem;} ',
        '#mfmx-chat-toggle:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 1rem 2rem rgba(0,0,0,.75);} ',
        '#mfmx-chat-panel{position:absolute;right:0;bottom:4rem;width:min(22rem,90vw);max-height:60vh;background:#020617;border-radius:1rem;',
        'border:1px solid rgba(148,163,184,.6);box-shadow:0 1.5rem 3rem rgba(15,23,42,.9);display:none;flex-direction:column;overflow:hidden;} ',
        '#mfmx-chat-container.mfmx-open #mfmx-chat-panel{display:flex;} ',
        '#mfmx-chat-header{display:flex;align-items:center;justify-content:space-between;padding:.6rem .85rem;border-bottom:1px solid rgba(51,65,85,.9);',
        'background:linear-gradient(135deg,#0f172a,#020617);} ',
        '#mfmx-chat-header-title{font-size:.8rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#e5e7eb;} ',
        '#mfmx-chat-header-sub{font-size:.7rem;color:#9ca3af;} ',
        '#mfmx-chat-close{border:none;background:none;color:#9ca3af;cursor:pointer;font-size:1.2rem;line-height:1;} ',
        '#mfmx-chat-close:hover{color:#e5e7eb;} ',
        '#mfmx-chat-messages{flex:1;overflow:auto;padding:.75rem;display:flex;flex-direction:column;gap:.5rem;font-size:.78rem;background:#020617;} ',
        '.mfmx-msg{padding:.4rem .55rem;border-radius:.6rem;max-width:100%;white-space:pre-wrap;word-wrap:break-word;} ',
        '.mfmx-msg-user{align-self:flex-end;background:rgba(59,130,246,.9);color:#f9fafb;} ',
        '.mfmx-msg-bot{align-self:flex-start;background:rgba(15,23,42,.95);border:1px solid rgba(55,65,81,.8);color:#e5e7eb;} ',
        '#mfmx-chat-input{border-top:1px solid rgba(51,65,85,.9);background:#020617;padding:.4rem .5rem;display:flex;flex-direction:column;gap:.25rem;} ',
        '#mfmx-chat-text{resize:none;min-height:2.3rem;max-height:5rem;padding:.35rem .45rem;border-radius:.45rem;border:1px solid rgba(55,65,81,.9);',
        'background:#020617;color:#e5e7eb;font-size:.78rem;} ',
        '#mfmx-chat-text:focus{outline:none;border-color:#22c55e;box-shadow:0 0 0 1px rgba(34,197,94,.5);} ',
        '#mfmx-chat-send-row{display:flex;align-items:center;justify-content:space-between;gap:.4rem;} ',
        '#mfmx-chat-hint{font-size:.65rem;color:#6b7280;} ',
        '#mfmx-chat-send{border:none;border-radius:999px;padding:.25rem .8rem;font-size:.75rem;font-weight:600;cursor:pointer;width:7em;',
        'background:linear-gradient(135deg,#22c55e,#16a34a);color:#ecfdf5;display:inline-flex;align-items:center;gap:.25rem;} ',
        '#mfmx-chat-send[disabled]{opacity:.5;cursor:default;} ',
        '#mfmx-chat-send:hover:not([disabled]){filter:brightness(1.1);} '
    ].join('');
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'mfmx-chat-container';
    container.innerHTML = '' +
        '<button id="mfmx-chat-toggle" aria-label="Yapay zeka ile sohbet başlat">' +
        '  <span>💬</span>' +
        '</button>' +
        '<div id="mfmx-chat-panel" role="dialog" aria-label="Yapay zeka sohbet penceresi" aria-modal="false">' +
        '  <div id="mfmx-chat-header">' +
        '    <div>' +
        '      <div id="mfmx-chat-header-title">MEFAMEX AI CHAT</div>' +
        '      <div id="mfmx-chat-header-sub">Mefamex-ai v1.6  ile desteklenir</div>' +
        '    </div>' +
        '    <button id="mfmx-chat-close" type="button" aria-label="Sohbet penceresini kapat">×</button>' +
        '  </div>' +
        '  <div id="mfmx-chat-messages"></div>' +
        '  <div id="mfmx-chat-input">' +
        '    <textarea id="mfmx-chat-text" rows="2" placeholder="Bir şey sor... (Shift+Enter ile satır ekle)"></textarea>' +
        '    <div id="mfmx-chat-send-row">' +
        '      <div id="mfmx-chat-hint">Mefamex-ai v1.6 | Anahtar tarayıcıda ise herkese görünür olabilir.</div>' +
        '      <button id="mfmx-chat-send" type="button">Gönder</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    document.body.appendChild(container);

    const toggleBtn = document.getElementById('mfmx-chat-toggle');
    const panel = document.getElementById('mfmx-chat-panel');
    const closeBtn = document.getElementById('mfmx-chat-close');
    const messagesEl = document.getElementById('mfmx-chat-messages');
    const textEl = document.getElementById('mfmx-chat-text');
    const sendBtn = document.getElementById('mfmx-chat-send');

    if (!toggleBtn || !panel || !closeBtn || !messagesEl || !textEl || !sendBtn) return;

    function toggle(open) {
        const willOpen = typeof open === 'boolean' ? open : !container.classList.contains('mfmx-open');
        if (willOpen) {
            container.classList.add('mfmx-open');
            setTimeout(() => { try { textEl.focus(); } catch (e) { } }, 50);
        } else {
            container.classList.remove('mfmx-open');
        }
    }

    toggleBtn.addEventListener('click', () => toggle());
    closeBtn.addEventListener('click', () => toggle(false));

    const conversation = [];
    let sending = false;

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = 'mfmx-msg ' + (role === 'user' ? 'mfmx-msg-user' : 'mfmx-msg-bot');
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn('API key is not set. Set window.MFMX_API_KEY before loading the page.');
        appendMessage('bot', 'API anahtarı ayarlanmamış. Lütfen window.MFMX_API_KEY değişkenini tanımlayın.');
    }

    async function sendMessage() {
        const text = (textEl.value || '').trim();
        if (!text || sending) return;
        appendMessage('user', text);
        textEl.value = '';

        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            appendMessage('bot', 'API anahtarı tanımlı değil. Lütfen geliştirici konsolundan window.MFMX_API_KEY değişkenini ayarlayın.');
            return;
        }

        sending = true;
        sendBtn.disabled = true;

        conversation.push({ role: 'user', content: text });

        try {
            const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + encodeURIComponent(apiKey);
            const systemInstruction = 'Sen MEFAMEX.com web sitesi için yardımcı bir yapay zeka asistansın. Kısa, net, Türkçe cevaplar ver. senin ismin mefamex-ai. versionun 1.6. Kullanıcıya nazik ve saygılı davran. sen mefamex-ai, mefamex.com tarafından sağlanan bir hizmetsin.';

            const contents = [];
            contents.push({ role: 'user', parts: [{ text: systemInstruction }] });
            conversation.forEach(msg => {
                contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] });
            });

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: contents
                })
            });

            if (!res.ok) {
                appendMessage('bot', 'Sunucu hatası: ' + res.status + ' ' + res.statusText);
                return;
            }

            const data = await res.json();
            const textResp = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join(' ').trim();
            if (!textResp) {
                appendMessage('bot', 'Boş yanıt alındı veya cevap çözümlenemedi.');
                return;
            }

            conversation.push({ role: 'model', content: textResp });
            appendMessage('bot', textResp);
        } catch (err) {
            console.error('Ai request failed', err);
            appendMessage('bot', 'İstek başarısız oldu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            sending = false;
            sendBtn.disabled = false;
        }
    }

    sendBtn.addEventListener('click', () => { sendMessage(); });
    textEl.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault();
            sendMessage();
        }
    });
}

