# Advanced Ad Blocker (Pop-up & Overlay v3)

**Advanced Ad Blocker** adalah UserScript inovatif yang dirancang untuk memblokir iklan pop-up, overlay, dan notifikasi yang mengganggu di berbagai situs web. Skrip ini menawarkan berbagai fitur canggih untuk memastikan pengalaman menjelajah Anda tetap bersih dan bebas gangguan.

## 🎯 Fitur Utama

- **Pemblokiran Pop-Up dan Overlay**: Menghapus elemen iklan yang sering mengganggu aktivitas pengguna.
- **Whitelist Dinamis**: Mendukung penyesuaian domain yang tidak ingin diblokir melalui penyimpanan lokal.
- **Pemblokiran Berdasarkan Kata Kunci**: Mendeteksi dan menghapus elemen yang mengandung teks tertentu dengan dukungan ekspresi reguler.
- **Auto-Close**: Klik otomatis pada tombol "close" pada elemen iklan tertentu.
- **Blokir Notifikasi Browser**: Menonaktifkan permintaan izin notifikasi dari situs web.
- **Pemantauan Real-Time**: Menggunakan MutationObserver untuk mendeteksi dan menghapus elemen iklan baru secara langsung.
- **Pembersihan Berkala**: Menjamin iklan tetap terblokir dengan mekanisme pembersihan otomatis setiap beberapa detik.

## 📦 Instalasi

1. Install **Tampermonkey** atau ekstensi manajemen UserScript lainnya pada browser Anda:

   - [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/gngmhiphkjpdilfjlfdjgpohkghcmjoh)

2. Klik [tautan ini](https://raw.githubusercontent.com/elstrom/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js) untuk membuka file skrip.

3. Tampermonkey akan memuat skrip, klik **Install** untuk mengaktifkannya.

## 🛠️ Cara Kerja

1. **Pemblokiran Iklan**:

   - Skrip mencari elemen HTML dengan selektor tertentu atau teks yang mencurigakan.
   - Elemen yang cocok akan langsung dihapus dari halaman.

2. **Whitelist**:

   - Domain yang dimasukkan ke whitelist tidak akan diblokir.
   - Anda dapat memperbarui daftar whitelist melalui penyimpanan lokal browser.

3. **Pembersihan Real-Time**:

   - MutationObserver memantau perubahan DOM untuk mendeteksi elemen iklan baru.

4. **Kata Kunci dengan Ekspresi Reguler**:

   - Dukungan untuk ekspresi reguler memperluas kemampuan skrip mendeteksi teks iklan yang bervariasi.

## 📋 Daftar Kata Kunci dan Selektor

- **Selektor HTML**:

  - Elemen dengan atribut spesifik seperti `data-element`, `class`, atau `src`.
  - Contoh: `'div[data-element="close-cross"]'`, `'iframe[src*="ads"]'`.

- **Kata Kunci**:

  - "promo", "advertisement", "sponsored", "iklan", "free spins".
  - Dapat diperluas sesuai kebutuhan pengguna.

## 💡 Saran Penggunaan

- Untuk menambahkan domain ke whitelist:

  - Buka konsol browser (F12).
  - Tambahkan domain ke penyimpanan lokal dengan perintah:
    ```javascript
    localStorage.setItem('adBlockerWhitelist', JSON.stringify(['example.com', 'anotherexample.com']));
    ```

- Untuk memperbarui daftar kata kunci atau selektor:

  - Edit file `.user.js` langsung di editor favorit Anda.

## 📞 Pembaruan

- **Update URL**: [Cek pembaruan terbaru](https://raw.githubusercontent.com/elstrom/AdvancedAdBlocker/main/AdvancedAdBlocker.user.js)

---

**Advanced Ad Blocker** adalah solusi ideal bagi siapa saja yang menginginkan pengalaman menjelajah bebas gangguan. Install sekarang dan nikmati internet yang lebih bersih!

