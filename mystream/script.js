/**
 * @fileoverview MEFAMEX pages-mystream Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-03-16
 */

buttonAllEmojisList = { 'options': ['ⓘ', '⚙️'], 'like': ['👍', '👏', '❤️', '💖', '💙', '💚', '🤍', '🩷'], 'comment': ['💬', '🗨️', '📝', '💭', '✍️'], 'share': ['🔄', '🔁', '🔗', '🚀'] };
function buttonRandomEmoji(buttonType) { const emojis = buttonAllEmojisList[buttonType]; return emojis[Math.floor(Math.random() * emojis.length)] || " "; }

document.addEventListener('DOMContentLoaded', async () => {
    try {
        /* IntersectionObserver ile sayfa yüklendiğinde görünen elementleri göster */
        const sections = document.querySelectorAll('main > section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
        }, { threshold: 0.2, rootMargin: '0px' });
        sections.forEach(section => { observer.observe(section); section.style.opacity = 0; });
    } catch (error) { console.error('Hata:', error); return; }

    try {
        /* Sayfa yüklendiğinde sayfayı varsa hash'e kaydır */
        setTimeout(() => { window.location.hash && (el => el && window.scrollTo({ top: el.offsetTop - (5 * parseFloat(getComputedStyle(document.documentElement).fontSize)), behavior: 'smooth' }))(document.querySelector(window.location.hash)); }, 500);
    } catch (error) { console.error('Hata:', error); return; }

    try {
        /* herhangi bir postun içinde postHeader görene kadar bekle */
        await new Promise((resolve) => {
            const check = () => { if (document.querySelector('.post .postHeader')) { resolve(); } else { setTimeout(check, 100); } };
            check();
        });
        /* tüm Options butonlarını yeniden yönlendir */
        document.querySelectorAll('.buttonOptions').forEach(button => { button.onclick = buttonOptionsClicked });
        buttonOptionsChangeTextInterval();
        /* Tüm beğen butonlarını yeniden yönlendir */
        document.querySelectorAll('.buttonLike').forEach(button => { button.onclick = buttonLikeClicked; });
        buttonLikeChangeTextInterval();
        /* Tüm yorum butonlarını yeniden yönlendir */
        document.querySelectorAll('.buttonComment').forEach(button => { button.onclick = buttonCommentClicked; });
        buttonCommentChangeTextInterval();
        /* Tüm paylaş butonlarını yeniden yönlendir */
        document.querySelectorAll('.buttonShare').forEach(button => { button.onclick = buttonShareClicked; });
        buttonShareChangeTextInterval();
        console.log('✅✅✅ Tüm butonlar ayarlandı');
    } catch (error) { console.error('Hata:', error); return; }
});

/* OPTIONS BUTONU */

const buttonOptionDefText = button => { const text = `${buttonRandomEmoji('options')}`; if (button) { button.innerText = text; } return text; };
function buttonOptionsChangeTextInterval() { document.querySelectorAll('.buttonOptions').forEach(button => { if (!button.dataset.lastClicked) { buttonOptionDefText(button); } }); setTimeout(() => { buttonOptionsChangeTextInterval() }, 3000 + Math.random() * 1000); }
function buttonOptionsClicked(event) {
    const button = event.currentTarget;
    button.dataset.lastClicked = Date.now();
    button.innerText = 'devre \n dışı';
    setTimeout(() => { button.style.display = 'none'; }, 1000);
    setTimeout(() => { buttonOptionsClickedAfterDelay(button) }, 3000);
}

function buttonOptionsClickedAfterDelay(button) {
    if (!button.dataset.lastClicked || Date.now() - button.dataset.lastClicked < 3000) return;
    button.style.display = ''; buttonOptionDefText(button); delete button.dataset.lastClicked;
}

/* BEGEN BUTONU */

const buttonLikeDefText = button => { const text = ` ${buttonRandomEmoji('like')} Beğen`; if (button) { button.innerText = text; } return text; };
function buttonLikeChangeTextInterval() { document.querySelectorAll('.buttonLike').forEach(button => { if (!button.dataset.lastClicked) { buttonLikeDefText(button); } }); setTimeout(() => { buttonLikeChangeTextInterval() }, 3000 + Math.random() * 1000); }
function buttonLikeClicked(event) {
    const button = event.currentTarget;
    // const post = button.closest('.post'); if (!post) return;
    const likedCount = (parseInt(button.dataset.likedCount) || 0) + 1;
    button.dataset.likedCount = likedCount; button.dataset.lastClicked = Date.now();
    const messages = [` ${buttonRandomEmoji('like')} `, 'mesai saatleri dışındayız!', ` ${buttonRandomEmoji('like')} `, 'mesai', 'saatleri', 'dışındayız!', ` ${buttonRandomEmoji('like')} `, 'yetmez mi?!', '...', 'neyse...'];
    button.innerText = likedCount <= messages.length ? messages[likedCount - 1] : buttonLikeDefText(button);
    setTimeout(() => { buttonLikeClickedAfterDelay(button) }, 3000);
}

function buttonLikeClickedAfterDelay(button) {
    if (!button.dataset.lastClicked || Date.now() - button.dataset.lastClicked < 3000) return;
    buttonLikeDefText(button); delete button.dataset.lastClicked; delete button.dataset.likedCount;
}


/* YORUM BUTONU */

const buttonCommentDefText = button => { const text = ` ${buttonRandomEmoji('comment')} Yorum yapma`; if (button) { button.innerText = text; } return text; };
function buttonCommentChangeTextInterval() { document.querySelectorAll('.buttonComment').forEach(button => { if (!button.dataset.lastClicked) { buttonCommentDefText(button); } }); setTimeout(() => { buttonCommentChangeTextInterval() }, 3000 + Math.random() * 1000); }
function buttonCommentClicked(event) {
    const button = event.currentTarget;
    const post = button.closest('.post'); if (!post) return;
    const commentedCount = (parseInt(button.dataset.commentedCount) || 0) + 1;
    button.dataset.commentedCount = commentedCount; button.dataset.lastClicked = Date.now();
    const messages = [` ${buttonRandomEmoji('comment')} `, 'mesai saatleri dışındayız!', ` ${buttonRandomEmoji('comment')} `, 'mesai', 'saatleri', 'dışındayız!', ` ${buttonRandomEmoji('comment')} `, 'yetmez mi?!', 'Yorum', 'Yapmaa!', '...', 'neyse...'];
    button.innerText = commentedCount <= messages.length ? messages[commentedCount - 1] : buttonCommentDefText(button);

    if (commentedCount >= messages.length && post.querySelector('.commentForm') === null) {
        const tagPforCommentForm = document.createElement('p'); tagPforCommentForm.classList.add('commentForm');
        tagPforCommentForm.innerHTML = 'Görüş ve önerileriniz için <a href="https://mefamex.com/contact/" title="contact-me" aria-label="contant-me" target="_blank" rel="noopener">iletişime geçebilirsiniz</a>. \n post id: ' + post.dataset.postid;
        post.appendChild(tagPforCommentForm);
    }
    setTimeout(() => { buttonCommentClickedAfterDelay(button); }, 3000);
}

function buttonCommentClickedAfterDelay(button) {
    if (!button.dataset.lastClicked || Date.now() - button.dataset.lastClicked < 3000) return;
    buttonCommentDefText(button); delete button.dataset.lastClicked; delete button.dataset.commentedCount;
    button.closest('.post').querySelectorAll('.commentForm').forEach(tagPforCommentForm => { tagPforCommentForm.remove(); });
}


/* SHARE BUTONU */

const buttonShareDefText = button => { const text = ` ${buttonRandomEmoji('share')} Paylaş`; if (button) { button.innerText = text; } return text; };
function buttonShareChangeTextInterval() { document.querySelectorAll('.buttonShare').forEach(button => { if (!button.dataset.lastClicked) { buttonShareDefText(button); } }); setTimeout(() => { buttonShareChangeTextInterval() }, 3000 + Math.random() * 1000); }
function buttonShareClicked(event) {
    const button = event.currentTarget;
    const post = button.closest('.post'); if (!post) return;
    const sharedCount = (parseInt(button.dataset.sharedCount) || 0) + 1;
    button.dataset.sharedCount = sharedCount; button.dataset.lastClicked = Date.now();
    setTimeout(() => { buttonShareClickedAfterDelay(button) }, 3000);
    // URL'yi panoya kopyala
    const shareUrl = `${window.location.origin}${window.location.pathname}#${post.id}`;
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareUrl)
            .then(() => { button.innerText = '✨ Kopyalandı!'; })
            .catch(err => { console.error('Kopyalama hatası:', err); button.innerText = '❌ Kopyalanamadı!'; });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea);
        if (navigator.userAgent.match(/ipad|iphone/i)) { const range = document.createRange(); range.selectNodeContents(textarea); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); textarea.setSelectionRange(0, 999999); } else { textarea.select(); }
        try { document.execCommand('copy'); button.innerText = '✨ Kopyalandı!'; }
        catch (err) { console.error('Kopyalama hatası:', err); button.innerText = '❌ Kopyalanamadı!'; }
        document.body.removeChild(textarea);
    }
}

function buttonShareClickedAfterDelay(button) {
    if (!button.dataset.lastClicked || Date.now() - button.dataset.lastClicked < 3000) return;
    buttonShareDefText(button); delete button.dataset.lastClicked; delete button.dataset.sharedCount;
}
