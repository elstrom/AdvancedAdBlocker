// ==UserScript==
// @name         Advanced Ad Blocker (Pop-up & Overlay v3)
// @namespace    https://github.com/elstrom/AdvancedAdBlocker
// @version      3.4
// @description  Blokir iklan pop-up, overlay, dan notifikasi yang mengganggu.
// @author       Elstrom
// @include      *github.com*
// @exclude      *api.github*
// @match        *://*/*
// @grant        none
// @supportURL   https://raw.githubusercontent.com/elstrom/AdvancedAdBlocker
// @updateURL    https://raw.githubusercontent.com/elstrom/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js
// @downloadURL  https://raw.githubusercontent.com/elstrom/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Whitelist untuk domain tertentu dengan penyimpanan dinamis
    const getWhitelist = () => {
        try {
            const storedWhitelist = localStorage.getItem('adBlockerWhitelist'); // Ambil whitelist dari penyimpanan lokal
            return storedWhitelist ? JSON.parse(storedWhitelist) : ['example.com', 'anotherexample.com']; // Jika tidak ada, gunakan default
        } catch (e) {
            console.error("Ad Blocker: Gagal membaca whitelist dari penyimpanan lokal.", e);
            return ['example.com', 'anotherexample.com'];
        }
    };

    const whitelist = getWhitelist();

    const isWhitelisted = () => {
        return whitelist.some(domain => window.location.hostname.includes(domain)); // Periksa apakah hostname ada dalam whitelist
    };

    if (isWhitelisted()) {
        console.log("Ad Blocker: Situs dalam whitelist, tidak diblokir."); // Log jika situs di-whitelist
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
        'img[src*="ba8bed274a.0daa70aafd.com"]', // Gambar dalam iklan
        'div[class*="popup"]', // Elemen pop-up umum
        'iframe[src*="ads"]' // Iframe untuk iklan
    ];

    // Kata kunci untuk mendeteksi iklan berdasarkan teks (dengan dukungan ekspresi reguler)
    const adKeywords = [
        /promo/i, // Kata "promo" sering digunakan dalam iklan
        /advertisement/i, // Kata "advertisement"
        /sponsored/i, // Kata "sponsored"
        /iklan/i, // Kata "iklan" dalam bahasa Indonesia
        /free spins/i, // Contoh teks yang sering digunakan dalam iklan perjudian
        /bonus/i, // Kata "bonus" sering digunakan dalam promosi
        /casino/i, // Kata "casino" untuk iklan perjudian
        /jackpot/i // Kata "jackpot" sering digunakan dalam iklan
    ];

    // Fungsi untuk menghapus elemen iklan berdasarkan kata kunci
    const removeAdsByKeywords = () => {
        document.querySelectorAll('*').forEach(el => { // Iterasi semua elemen
            const textContent = el.textContent.toLowerCase(); // Ambil teks elemen dalam huruf kecil
            if (adKeywords.some(keyword => keyword.test(textContent))) { // Periksa apakah teks cocok dengan ekspresi reguler
                el.remove(); // Hapus elemen
                console.log(`Ad Blocker: Removed element containing keyword.`); // Log elemen yang dihapus
            }
        });
    };

    // Fungsi untuk mencegah notifikasi browser
    const blockNotifications = () => {
        if ("Notification" in window) { // Periksa apakah API Notification tersedia
            Notification.requestPermission = () => Promise.resolve('denied'); // Override permintaan izin
            console.log("Ad Blocker: Notifications blocked."); // Log jika notifikasi diblokir
        }
    };

    // Fungsi untuk menghapus elemen iklan
    const removeAds = () => {
        const startTime = performance.now(); // Mulai pengukuran waktu
        specificAdSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.remove(); // Hapus elemen sesuai selektor
                console.log(`Ad Blocker: Removed element - ${selector}`); // Log elemen yang dihapus
            });
        });
        const endTime = performance.now(); // Akhiri pengukuran waktu
        console.log(`Ad Blocker: removeAds executed in ${endTime - startTime} ms.`); // Log waktu eksekusi
    };

    // Fungsi untuk klik otomatis tombol "Close" jika diperlukan
    const autoClickClose = () => {
        document.querySelectorAll('div[data-element="close-cross"]').forEach(el => {
            el.click(); // Klik tombol close
            console.log(`Ad Blocker: Auto-clicked close button.`); // Log aksi klik otomatis
        });
    };

    // Menggunakan MutationObserver untuk memantau elemen baru
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) { // Jika ada node yang ditambahkan
                removeAds(); // Hapus iklan
                autoClickClose(); // Klik otomatis
                removeAdsByKeywords(); // Hapus iklan berdasarkan kata kunci
            }
        });
    });

    // Konfigurasi observer untuk memantau semua perubahan DOM
    observer.observe(document.body, {
        childList: true, // Pantau perubahan anak elemen
        subtree: true // Pantau seluruh subtree
    });

    // Pembersihan berkala
    setInterval(() => {
        removeAds(); // Jalankan pemblokiran iklan
        removeAdsByKeywords(); // Jalankan pemblokiran berdasarkan kata kunci
    }, 5000); // Setiap 5 detik

    // Jalankan fungsi saat halaman pertama kali dimuat
    blockNotifications(); // Blokir notifikasi
    removeAds(); // Hapus iklan
    autoClickClose(); // Klik otomatis tombol close
    removeAdsByKeywords(); // Hapus berdasarkan kata kunci

    console.log("Ad Blocker: Skrip berjalan. Semua elemen iklan yang spesifik akan diblokir."); // Log status skrip
})();