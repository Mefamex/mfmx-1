/**
 * @fileoverview MEFAMEX pages-mystream Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-12-08
 * @lastModified 2025-03-12
 */

document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('main > section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Bir kez görününce gözlemlemeyi bırak
            }
        });
    }, { threshold: 0.2, rootMargin: '0px' });
    sections.forEach(section => { observer.observe(section); section.style.opacity = 0; });
});

