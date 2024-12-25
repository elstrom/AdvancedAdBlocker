// ==UserScript==
// @name         Advanced Ad Blocker (Pop-up & Overlay v3)
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Blokir iklan pop-up, overlay, dan notifikasi yang mengganggu.
// @author       Elstrom
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/yourusername/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js
// @downloadURL  https://raw.githubusercontent.com/yourusername/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Whitelist untuk domain tertentu
    const whitelist = [
        'example.com', // Tambahkan situs yang di-whitelist
        'anotherexample.com'
    ];

    const isWhitelisted = () => {
        return whitelist.some(domain => window.location.hostname.includes(domain));
    };

    if (isWhitelisted()) {
        console.log("Ad Blocker: Situs dalam whitelist, tidak diblokir.");
        return;
    }

    // Selektor untuk elemen iklan berdasarkan kode HTML yang diberikan
    const specificAdSelectors = [
        'div[class*="_4KjPzfFqnPyBgIgiXkX"]', // Kelas utama dari elemen iklan
        'div[data-element="barcode"]', // Baris kode iklan
        'div[data-element="close-cross"]', // Tombol close (X)
        'div[data-url*="clickadilla.com"]', // Link menuju iklan ClickAdilla
        'div[data-element="branding"]', // Branding Ads By ClickAdilla
        'div[data-element="title"]', // Elemen dengan teks "i8 Slot Gacor"
        'img[src*="ba8bed274a.0daa70aafd.com"]' // Gambar dalam iklan
    ];

    // Fungsi untuk menghapus elemen iklan
    const removeAds = () => {
        specificAdSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.remove();
                console.log(`Ad Blocker: Removed element - ${selector}`);
            });
        });
    };

    // Fungsi untuk klik otomatis tombol "Close" jika diperlukan
    const autoClickClose = () => {
        document.querySelectorAll('div[data-element="close-cross"]').forEach(el => {
            el.click();
            console.log(`Ad Blocker: Auto-clicked close button.`);
        });
    };

    // Menggunakan MutationObserver untuk memantau elemen baru
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeAds();
                autoClickClose();
            }
        });
    });

    // Konfigurasi observer untuk memantau semua perubahan DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Jalankan pemblokiran saat halaman pertama kali dimuat
    removeAds();
    autoClickClose();

    console.log("Ad Blocker: Skrip berjalan. Semua elemen iklan yang spesifik akan diblokir.");
})();
