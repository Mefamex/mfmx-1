/**
 * @fileoverview MEFAMEX WHO JavaScript file
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2026 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2026-06-22
 * @lastModified 2026-06-22-T00:00:00Z
 */


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGLNZ6jW_6vZofqSLNJ4Wlk5podL8D7Bg",
    authDomain: "mfmx-1website.firebaseapp.com",
    projectId: "mfmx-1website",
    storageBucket: "mfmx-1website.firebasestorage.app",
    messagingSenderId: "534342191957",
    appId: "1:534342191957:web:94d716820c6097d04b3ddc",
    measurementId: "G-6H5LN5T7V3"
};

let debugMode = false;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function generateCustomId() {
    const d = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const randomStr = Math.random().toString(36).substring(2, 6); // 4 haneli rastgele
    return dateStr + randomStr;
}

function generateFingerprint() {
    const nav = navigator;
    const screen = window.screen;
    const rawString = `${nav.userAgent}|${nav.language}|${screen.width}x${screen.height}x${screen.colorDepth}|${nav.hardwareConcurrency}|${nav.deviceMemory}`;

    let h = 0;
    for (let i = 0; i < rawString.length; i++) {
        h = ((h << 5) - h) + rawString.charCodeAt(i);
        h |= 0;
    }
    return ('00000000' + (h >>> 0).toString(16)).slice(-8);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) { const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return match ? decodeURIComponent(match[1]) : null; }

let ziyaretciId = getCookie("mefa_vid");
if (!ziyaretciId) { ziyaretciId = generateCustomId(); setCookie("mefa_vid", ziyaretciId, 365); }

let currentDocId = null;
const startTime = Date.now();
const fingerprint = generateFingerprint();


async function fetchIpAndIsp() {
    const endpoints = [
        { url: "https://ipinfo.io/json", type: "ipinfo" },
        { url: "https://extreme-ip-lookup.com/json/", type: "extreme" },
        { url: "https://api.ipify.org?format=json", type: "ipify" }
    ];

    for (const endpoint of endpoints) {
        try {
            const controller = new AbortController(), timeoutId = setTimeout(() => controller.abort(), 4000), res = await fetch(endpoint.url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!res.ok) continue;
            const data = await res.json();
            if (endpoint.type === "ipinfo" && data.ip) return { ip: data.ip, isp: data.org || "Null", lokasyon: `${data.city || ""}, ${data.country || ""}`.trim() || "Null" };
            else if (endpoint.type === "extreme" && data.query) return { ip: data.query, isp: data.org || data.isp || "Null", lokasyon: `${data.city || ""}, ${data.country || ""}`.trim() || "Null" };
            else if (endpoint.type === "ipify" && data.ip) return { ip: data.ip, isp: "Null (ipify yedek modu)", lokasyon: "Null" };
        } catch (e) { if (debugMode) console.warn(`${endpoint.url} başarısız oldu, sonraki yedek deneniyor...`); }
    }
    return { ip: "Null", isp: "Null", lokasyon: "Null" };
}

async function ilkKaydiOlustur() {
    const netInfo = await fetchIpAndIsp(), nav = navigator;
    const ziyaretVerisi = { Id: ziyaretciId, finger: fingerprint, ip: netInfo.ip, isp: netInfo.isp, lastVisit: serverTimestamp(), platform: nav.platform, lang: nav.language, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, url: window.location.href, referrer: document.referrer || "Direkt/Null", connection: nav.connection ? nav.connection.effectiveType : "Null", hwCc: nav.hardwareConcurrency || "Null", ramGb: nav.deviceMemory || "Null", timeSpend: Math.floor((Date.now() - startTime) / 1000) };
    try {
        const docRef = await addDoc(collection(db, "ziyaretler"), ziyaretVerisi);
        currentDocId = docRef.id;
        if (debugMode) console.log("Ziyaret kaydedildi:", currentDocId);
    }
    catch (e) { if (debugMode) console.error("Kayıt hatası:", e); }
}

async function sureyiGuncelle() {
    if (!currentDocId) return;
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    try { await updateDoc(doc(db, "ziyaretler", currentDocId), { timeSpend: elapsedSeconds }); }
    catch (e) { if (debugMode) console.error("Süre güncellenemedi:", e); }
}

function zamanlayiciyiBaslat() {
    setTimeout(() => ilkKaydiOlustur(), 3000);
    const ilkGuncellemeler = [20, 30, 40, 50, 60];
    ilkGuncellemeler.forEach(saniye => { setTimeout(() => { sureyiGuncelle(); }, saniye * 1000); });
    setTimeout(() => { setInterval(() => { sureyiGuncelle(); }, 30000); }, 60000);
}

window.addEventListener("load", zamanlayiciyiBaslat);

document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && currentDocId) sureyiGuncelle(); });

window.addEventListener("beforeunload", () => { if (currentDocId) sureyiGuncelle(); });