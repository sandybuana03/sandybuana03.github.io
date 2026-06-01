// 1. VARIABEL GLOBAL (Menyimpan data harga sementara untuk AJAX)
let hargaRupiahGlobal = 0;

// Menunggu DOM selesai dimuat
$(document).ready(function () {

    // 2. JQUERY EVENTS: Ketika tombol rekomendasi diklik
    $('#btn-rekomendasi').on('click', function () {
        
        // Mengambil nilai input dan mengubahnya ke tipe angka
        let budget = parseInt($('#budget').val());
        let kebutuhan = $('#kebutuhan').val();

        // Validasi input sederhana
        if (isNaN(budget) || budget <= 0) {
            alert("Silakan masukkan jumlah budget yang valid!");
            return;
        }

        // Variabel untuk menyimpan teks rekomendasi
        let pcTerpilih = "";
        let monitorTerpilih = "";

        // 3. BLOK KONDISIONAL (Logika Penentuan Rekomendasi)
        if (kebutuhan === "gaming") {
            if (budget < 10000000) {
                pcTerpilih = "Core i3 / Ryzen 3, GTX 1650, RAM 8GB, SSD 512GB (PC Entry Gaming)";
                monitorTerpilih = "Monitor 24 Inch IPS 75Hz (Standard)";
                hargaRupiahGlobal = 8500000;
            } else if (budget >= 10000000 && budget <= 20000000) {
                pcTerpilih = "Core i5 / Ryzen 5, RTX 4060, RAM 16GB, SSD 1TB (PC Mid-End Gaming)";
                monitorTerpilih = "Monitor 24 / 27 Inch IPS 144Hz / 165Hz (Gaming Smooth)";
                hargaRupiahGlobal = 15000000;
            } else {
                pcTerpilih = "Core i7 / Ryzen 7, RTX 4070 Ti, RAM 32GB, SSD 2TB (PC High-End Ultra)";
                monitorTerpilih = "Monitor 27 Inch IPS 2K QHD 165Hz / OLED";
                hargaRupiahGlobal = 25000000;
            }
        } else if (kebutuhan === "kerja") {
            if (budget < 7000000) {
                pcTerpilih = "Intel Pentium / Athlon, RAM 8GB, SSD 256GB (Kebutuhan Administrasi)";
                monitorTerpilih = "Monitor 19 / 21 Inch Office Standard";
                hargaRupiahGlobal = 4500000;
            } else {
                pcTerpilih = "Core i5 / Ryzen 5 (Integrated Graphics), RAM 16GB, SSD 512GB (Multitasking Lancar)";
                monitorTerpilih = "Monitor 24 Inch IPS FHD (Nyaman di Mata)";
                hargaRupiahGlobal = 8000000;
            }
        }

        // 4. JQUERY + DOM MANIPULATION: Mengubah teks di halaman web
        $('#spek-pc').text(pcTerpilih);
        $('#spek-monitor').text(monitorTerpilih);
        $('#total-harga').text("Rp " + hargaRupiahGlobal.toLocaleString('id-ID'));
        
        // Sembunyikan hasil konversi lama jika ada, lalu tampilkan section hasil
        $('#harga-usd').addClass('hidden');
        $('#hasil-rekomendasi').removeClass('hidden');
    });


    // 5. JQUERY EVENTS & 6. AJAX: Mengambil data Kurs Currency secara Real-time
    $('#btn-konversi').on('click', function () {
        
        // Menggunakan API gratis tanpa token dari er-api.com
        let urlAPI = "https://open.er-api.com/v6/latest/IDR";

        // Memulai proses AJAX
        $.ajax({
            url: urlAPI,
            type: "GET",
            dataType: "json",
            success: function (response) {
                // Mendapatkan nilai 1 IDR berapa USD
                let kursUSD = response.rates.USD; 
                
                // Menghitung konversi
                let hasilKonversi = hargaRupiahGlobal * kursUSD;

                // Menampilkan hasil ke DOM
                $('#harga-usd').text("Setara: $" + hasilKonversi.toFixed(2) + " USD (Kurs Real-time)")
                              .removeClass('hidden');
            },
            error: function (xhr, status, error) {
                alert("Gagal mengambil data kurs mata uang. Silakan coba lagi.");
                console.error("Detail Error: ", error);
            }
        });
    });

});