/**
 * ziyaretciInfo.js
 * (Kişisel kullanım için) Tarayıcı üzerinden erişilebilen maksimum ziyaretçi / cihaz bilgilerini toplar.
 * Deneyseldir. 
 * Bu bilgiler alınır ve hizmet kalitesini arttırmak için kullanılır.
 * Kullanıcıların siteyi ziyaret etmeleri bu bilgileri toplamak için izin verdiğini varsayar.
 * ÖNEMLİ NOTLAR:
 *  - Konum (Geolocation) ve Clipboard gibi hassas API'ler kullanıcı izni olmadan vermez.
 */

// Kullanıcı erişimi için global değişken (hazır değilken undefined olabilir)
window.__VISITOR_INFO_READY = false;
window.__VISITOR_INFO = {};

/** Küçük yardımcı: Güvenli şekilde özellik oku */
function safe(getter, fallback = null) {
    try { return getter(); } catch { return fallback; }
}

function collectSyncInfo() {
    const nav = navigator || {};
    const screenObj = window.screen || {};
    const doc = document || {};

    return {
        timestamp: new Date().toISOString(),
        location_href: safe(() => location.href),
        referrer: safe(() => doc.referrer),
        userAgent: safe(() => nav.userAgent),
        platform: safe(() => nav.platform),
        language: safe(() => nav.language),
        languages: safe(() => nav.languages),
        cookieEnabled: safe(() => nav.cookieEnabled),
        doNotTrack: safe(() => nav.doNotTrack),
        hardwareConcurrency: safe(() => nav.hardwareConcurrency),
        deviceMemoryGB: safe(() => nav.deviceMemory),
        maxTouchPoints: safe(() => nav.maxTouchPoints),
        vendor: safe(() => nav.vendor),
        product: safe(() => nav.product),
        productSub: safe(() => nav.productSub),
        webdriver: safe(() => nav.webdriver),
        online: safe(() => nav.onLine),
        // Ekran
        screen: {
            width: safe(() => screenObj.width),
            height: safe(() => screenObj.height),
            availWidth: safe(() => screenObj.availWidth),
            availHeight: safe(() => screenObj.availHeight),
            colorDepth: safe(() => screenObj.colorDepth),
            pixelDepth: safe(() => screenObj.pixelDepth),
            orientation: safe(() => screenObj.orientation && screenObj.orientation.type)
        },
        viewport: {
            innerWidth: safe(() => window.innerWidth),
            innerHeight: safe(() => window.innerHeight),
            outerWidth: safe(() => window.outerWidth),
            outerHeight: safe(() => window.outerHeight),
            devicePixelRatio: safe(() => window.devicePixelRatio)
        },
        timezone: Intl && Intl.DateTimeFormat ? safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone) : null,
        locale: safe(() => Intl.DateTimeFormat().resolvedOptions().locale),
        performanceTiming: safe(() => ({
            navType: performance.getEntriesByType ? performance.getEntriesByType('navigation').map(n => ({
                type: n.type,
                startTime: n.startTime,
                domContentLoaded: n.domContentLoadedEventEnd,
                loadEventEnd: n.loadEventEnd
            })) : null,
            memory: safe(() => performance.memory ? {
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                usedJSHeapSize: performance.memory.usedJSHeapSize
            } : null)
        })),
        // Özdeşlik benzeri parmak izi bileşenleri (kendi içinde)
        fingerprintPieces: {
            userAgent: safe(() => nav.userAgent),
            lang: safe(() => nav.language),
            platform: safe(() => nav.platform),
            screen: safe(() => `${screenObj.width}x${screenObj.height}x${screenObj.colorDepth}`),
            timezone: Intl && Intl.DateTimeFormat ? safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone) : null,
            hardwareConcurrency: safe(() => nav.hardwareConcurrency),
            deviceMemory: safe(() => nav.deviceMemory),
            touch: safe(() => nav.maxTouchPoints),
        }
    };
}

function getWebGLInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return null;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const data = {
        vendor: safe(() => gl.getParameter(gl.VENDOR)),
        renderer: safe(() => gl.getParameter(gl.RENDERER)),
        unmaskedVendor: debugInfo ? safe(() => gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)) : null,
        unmaskedRenderer: debugInfo ? safe(() => gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : null,
        shadingLanguageVersion: safe(() => gl.getParameter(gl.SHADING_LANGUAGE_VERSION)),
        version: safe(() => gl.getParameter(gl.VERSION)),
    };
    return data;
}

async function getBatteryInfo() {
    if (!navigator.getBattery) return null;
    try {
        const b = await navigator.getBattery();
        return {
            charging: b.charging,
            chargingTime: b.chargingTime,
            dischargingTime: b.dischargingTime,
            level: b.level
        };
    } catch { return null; }
}

function getConnectionInfo() {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return null;
    return {
        downlink: c.downlink,
        effectiveType: c.effectiveType,
        rtt: c.rtt,
        saveData: c.saveData
    };
}

async function getLocalIPs(timeoutMs = 1500) {
    // Modern tarayıcılar mDNS host dönebilir veya tamamen maskeleyebilir.
    return new Promise(resolve => {
        const ips = new Set();
        let pc;
        try {
            pc = new RTCPeerConnection({ iceServers: [] });
        } catch {
            resolve([]); return;
        }
        pc.createDataChannel('x');
        pc.onicecandidate = e => {
            if (!e.candidate) return;
            const c = e.candidate.candidate;
            const ipMatch = c.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
            if (ipMatch) ips.add(ipMatch[1]);
        };
        pc.createOffer().then(o => pc.setLocalDescription(o));
        setTimeout(() => {
            try { pc.close(); } catch { }
            resolve(Array.from(ips));
        }, timeoutMs);
    });
}

async function getGeolocation(accuracy = 'coarse') {
    if (!navigator.geolocation) return null;
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                resolve({
                    accuracy: pos.coords.accuracy,
                    // lat/long izin verdiğiniz sürece
                    latitude: accuracy === 'precise' ? pos.coords.latitude : parseFloat(pos.coords.latitude.toFixed(3)),
                    longitude: accuracy === 'precise' ? pos.coords.longitude : parseFloat(pos.coords.longitude.toFixed(3)),
                    altitude: pos.coords.altitude,
                    altitudeAccuracy: pos.coords.altitudeAccuracy,
                    heading: pos.coords.heading,
                    speed: pos.coords.speed,
                    timestamp: pos.timestamp
                });
            },
            err => resolve({ error: err.message, code: err.code }),
            { enableHighAccuracy: accuracy === 'precise', timeout: 5000, maximumAge: 0 }
        );
    });
}

async function fetchPublicIP() {
    // Dış servislere istek: internet kapalıysa başarısız olabilir.
    const endpoints = [
        'https://api.ipify.org?format=json',
        'https://ipinfo.io/json',
        'https://ifconfig.me/all.json'
    ];
    for (const url of endpoints) {
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 4000);
            const res = await fetch(url, { signal: ctrl.signal });
            clearTimeout(t);
            if (!res.ok) continue;
            const json = await res.json().catch(() => ({}));
            // Normalize ip
            const ip = json.ip || json.IP || json.ip_addr || json.address;
            if (ip) {
                return { endpoint: url, ip, raw: json };
            }
        } catch (e) { /* ignore */ }
    }
    return null;
}

function hashString(str) {
    if (typeof str !== 'string') return null;
    let h = 0, i, chr;
    if (str.length === 0) return '0';
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        h = ((h << 5) - h) + chr;
        h |= 0; // 32bit
    }
    return ('00000000' + (h >>> 0).toString(16)).slice(-8);
}

function buildFingerprint(pieces) {
    try {
        const concat = Object.keys(pieces).sort().map(k => `${k}:${pieces[k]}`).join('|');
        return hashString(concat);
    } catch { return null; }
}

async function collectVisitorInfo(options = {}) {
    const {
        wantGeolocation = false,
        preciseLocation = false,
        wantPublicIP = true,
        wantLocalIPs = false,
        // Yeni opsiyonlar
        wantExtended = false,          // izin istemeden alınabilen ek özellikler + bazı izin sorguları
        wantHeavy = false,             // canvas/audio fingerprint gibi daha "ağır" işlemler
        wantClipboard = false,         // izin verilirse pano metnini dene
        wantMediaDevices = false,      // cihaz listesi (izin gerekebilir, label'lar izin sonrası gelir)
        wantPermissions = true,        // permission status sorgula
        wantFonts = false              // font tespiti (heuristic & yavaş olabilir)
    } = options;

    const base = collectSyncInfo();
    base.webgl = getWebGLInfo();
    const [battery, conn, geo, pubIP, localIPs, storageEstimate] = await Promise.all([
        getBatteryInfo(),
        Promise.resolve(getConnectionInfo()),
        wantGeolocation ? getGeolocation(preciseLocation ? 'precise' : 'coarse') : Promise.resolve(null),
        wantPublicIP ? fetchPublicIP() : Promise.resolve(null),
        wantLocalIPs ? getLocalIPs() : Promise.resolve([]),
        getStorageEstimate()
    ]);

    base.battery = battery;
    base.connection = conn;
    base.geolocation = geo;
    base.publicIP = pubIP;
    base.localIPs = localIPs;
    base.storageEstimate = storageEstimate;

    if (wantExtended || wantHeavy || wantClipboard || wantMediaDevices || wantPermissions || wantFonts) {
        base.extended = await getExtendedInfo({ wantHeavy, wantClipboard, wantMediaDevices, wantPermissions, wantFonts });
    }

    base.fingerprintPieces.webgl = base.webgl ? (base.webgl.unmaskedRenderer || base.webgl.renderer) : null;
    base.fingerprint = buildFingerprint(base.fingerprintPieces);

    return base;
}

// ---- EK ÖZELLİK TOPLAYICILAR ----

async function getStorageEstimate() {
    if (!navigator.storage || !navigator.storage.estimate) return null;
    try { return await navigator.storage.estimate(); } catch { return null; }
}

async function getPermissionsStatus(list = ['geolocation', 'notifications', 'clipboard-read', 'clipboard-write', 'camera', 'microphone']) {
    if (!navigator.permissions || !navigator.permissions.query) return null;
    const result = {};
    for (const name of list) {
        try {
            const perm = await navigator.permissions.query({ name });
            result[name] = perm.state;
        } catch {
            result[name] = 'unsupported';
        }
    }
    return result;
}

async function getMediaDevicesInfo(includeDevices) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return null;
    try {
        if (includeDevices) {
            // Kamera/mikrofon label'ları için önce permission alınmaya çalışılır (sessizce başarısız olabilir)
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            } catch { /* izin reddedilebilir */ }
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.map(d => ({ kind: d.kind, label: d.label, deviceId: d.deviceId, groupId: d.groupId }));
    } catch { return null; }
}

function getPrefers() {
    const mq = q => window.matchMedia ? window.matchMedia(q).matches : null;
    return {
        darkMode: mq('(prefers-color-scheme: dark)'),
        lightMode: mq('(prefers-color-scheme: light)'),
        reducedMotion: mq('(prefers-reduced-motion: reduce)'),
        hdr: mq('(dynamic-range: high)') || mq('(video-dynamic-range: high)')
    };
}

function canvasFingerprint(doImage = true) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 280; canvas.height = 60;
        ctx.textBaseline = 'top';
        ctx.font = "16px 'Arial'";
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 280, 60);
        ctx.fillStyle = '#069';
        ctx.fillText('canvas-fp-test🙂Ω', 2, 2);
        ctx.strokeStyle = 'rgba(120, 10, 200, 0.7)';
        ctx.beginPath();
        ctx.arc(140, 30, 20, 0, Math.PI * 2);
        ctx.stroke();
        const data = canvas.toDataURL();
        return { hash: hashString(data), sample: doImage ? data : undefined };
    } catch { return null; }
}

async function audioFingerprint() {
    try {
        const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
        const osc = ctx.createOscillator();
        const comp = ctx.createDynamicsCompressor();
        osc.type = 'triangle';
        osc.frequency.value = 10000;
        comp.threshold.value = -50;
        comp.knee.value = 40;
        comp.ratio.value = 12;
        comp.attack.value = 0;
        comp.release.value = 0.25;
        osc.connect(comp);
        comp.connect(ctx.destination);
        osc.start(0);
        const buf = await ctx.startRendering();
        let sum = 0;
        const channel = buf.getChannelData(0);
        for (let i = 0; i < channel.length; i += 100) sum += Math.abs(channel[i]);
        return { value: sum.toFixed(4), hash: hashString(sum.toFixed(4)) };
    } catch { return null; }
}

async function getClipboardMaybe(enabled) {
    if (!enabled) return null;
    if (!navigator.clipboard || !navigator.clipboard.readText) return 'unsupported';
    try { return await navigator.clipboard.readText(); } catch (e) { return 'denied'; }
}

function detectFeatures() {
    const feats = [
        'serviceWorker', 'bluetooth', 'clipboard', 'credentials', 'gpu', 'keyboard', 'mediaDevices', 'serial', 'usb', 'virtualKeyboard', 'wakeLock'
    ];
    const out = {};
    feats.forEach(f => out[f] = !!navigator[f]);
    out.webgl = !!(function () { try { const c = document.createElement('canvas'); return c.getContext('webgl') || c.getContext('experimental-webgl'); } catch { return null; } }());
    out.webrtc = !!window.RTCPeerConnection;
    out.webassembly = typeof WebAssembly === 'object';
    out.sharedWorker = !!window.SharedWorker;
    out.worker = !!window.Worker;
    out.localStorage = (function () { try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); return true; } catch { return false; } })();
    return out;
}

function measureStorageAreas() {
    function calc(storage) {
        try { let total = 0; for (let i = 0; i < storage.length; i++) { const k = storage.key(i); total += (k.length + storage.getItem(k).length) * 2; } return total; } catch { return null; }
    }
    return {
        localStorageBytes: calc(window.localStorage),
        sessionStorageBytes: calc(window.sessionStorage)
    };
}

async function detectFonts(enable) {
    if (!enable) return null;
    // Basit font ölçümü (heuristic)
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = ['Arial', 'Verdana', 'Tahoma', 'Times New Roman', 'Courier New', 'Georgia', 'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Calibri', 'Cambria', 'Garamond', 'Lucida Console', 'Lucida Sans', 'Palatino', 'Segoe UI'];
    const testStr = 'mmmmmmmmmmlli';
    const size = '72px';
    const span = document.createElement('span');
    span.style.fontSize = size;
    span.innerHTML = testStr;
    const defaultWidth = {};
    baseFonts.forEach(f => {
        span.style.fontFamily = f;
        document.body.appendChild(span);
        defaultWidth[f] = span.offsetWidth;
        document.body.removeChild(span);
    });
    const detected = [];
    testFonts.forEach(font => {
        for (const base of baseFonts) {
            span.style.fontFamily = `${font},${base}`;
            document.body.appendChild(span);
            const w = span.offsetWidth;
            document.body.removeChild(span);
            if (w !== defaultWidth[base]) { detected.push(font); break; }
        }
    });
    return Array.from(new Set(detected));
}

async function getExtendedInfo(opts) {
    const [permissions, mediaDevices, clipboard, fonts, audioFp] = await Promise.all([
        opts.wantPermissions ? getPermissionsStatus() : Promise.resolve(null),
        opts.wantMediaDevices ? getMediaDevicesInfo(true) : Promise.resolve(null),
        getClipboardMaybe(opts.wantClipboard),
        detectFonts(opts.wantFonts),
        opts.wantHeavy ? audioFingerprint() : Promise.resolve(null)
    ]);
    const canvasFp = opts.wantHeavy ? canvasFingerprint(false) : null;
    return {
        permissions,
        mediaDevices,
        clipboardText: clipboard,
        fonts,
        audioFingerprint: audioFp,
        canvasFingerprint: canvasFp,
        prefers: getPrefers(),
        features: detectFeatures(),
        storageAreas: measureStorageAreas()
    };
}

// Otomatik başlat (geolocation istemeden). Kullanıcı daha sonra manuel tetikleyebilir.
(async () => {
    const info = await collectVisitorInfo({ wantGeolocation: false, wantPublicIP: true, wantLocalIPs: false });
    window.__VISITOR_INFO = info;
    window.__VISITOR_INFO_READY = true;
    // Konsola da bas
    if (window.console && console.log) {
        console.log('[ziyaretciInfo] Bilgiler hazır:', info);
    }
})();

// Dışa aktarım (module pattern yoksa globalde zaten)
window.getVisitorInfo = async function (options) {
    // Tekrar topla (örn. geolocation izni vermek için)
    const info = await collectVisitorInfo(options);
    window.__VISITOR_INFO = info;
    window.__VISITOR_INFO_READY = true;
    return info;
};

// JSON indirme yardımcı
window.downloadVisitorInfo = function (filename = 'visitor-info.json') {
    try {
        const blob = new Blob([JSON.stringify(window.__VISITOR_INFO, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) { console.error('downloadVisitorInfo hata', e); }
};

// Basit bekleme yardımcı fonksiyonu
window.waitVisitorInfo = function (timeoutMs = 5000) {
    return new Promise(resolve => {
        if (window.__VISITOR_INFO_READY) return resolve(window.__VISITOR_INFO);
        const start = performance.now();
        const iv = setInterval(() => {
            if (window.__VISITOR_INFO_READY || (performance.now() - start) > timeoutMs) {
                clearInterval(iv);
                resolve(window.__VISITOR_INFO);
            }
        }, 50);
    });
};
