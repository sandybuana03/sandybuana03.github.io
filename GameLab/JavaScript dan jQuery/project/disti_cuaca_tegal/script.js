// 1. VARIABEL
let lokasi = "Tegal";
let currentUserName = "Teman";

// 3. FUNGSI (Function)
function getGreeting() {
    const hours = new Date().getHours();
    
    // 2. BLOK KONDISIONAL (Kontrol & Seleksi)
    if (hours < 11) {
        return "Selamat Pagi";
    } else if (hours < 15) {
        return "Selamat Siang";
    } else if (hours < 19) {
        return "Selamat Sore";
    } else {
        return "Selamat Malam";
    }
}

// Fungsi untuk mengambil data Cuaca Tegal via API (AJAX)
function fetchWeatherTegal() {
    // Menampilkan loader saat proses AJAX dimulai
    $('#weather-loader').show();
    $('#weather-content').hide();

    // 6. AJAX (Menggunakan API Open-Meteo)
    $.ajax({
        // Koordinat Kota Tegal: Lat -6.8673, Long 109.1256
        url: "https://api.open-meteo.com/v1/forecast?latitude=-6.8673&longitude=109.1256&current_weather=true",
        method: "GET",
        success: function(response) {
            const tempValue = response.current_weather.temperature;
            const weatherCode = response.current_weather.weathercode;

            // 5. JQUERY + DOM (Update isi elemen HTML)
            $('#temp').text(tempValue);
            
            // Logika untuk menentukan keterangan cuaca berdasarkan kode satelit
            let statusCuaca = "Cerah";
            if (weatherCode > 0 && weatherCode <= 3) {
                statusCuaca = "Cerah Berawan";
            } else if (weatherCode > 3) {
                statusCuaca = "Hujan/Mendung";
            }
            
            $('#description').text("Kondisi: " + statusCuaca);

            // Sembunyikan loader dan tampilkan konten dengan efek fade
            $('#weather-loader').hide();
            $('#weather-content').fadeIn(500);
        },
        error: function() {
            alert("Gagal terhubung ke satelit cuaca.");
            $('#weather-loader').text("Gagal memuat data.");
        }
    });
}

// Menjalankan kode setelah dokumen siap (Document Ready)
$(document).ready(function() {
    
    // Set sapaan awal menggunakan DOM
    $('#greeting').text(`${getGreeting()}, ${currentUserName}!`);

    // Panggil fungsi cuaca pertama kali
    fetchWeatherTegal();

    // 4. JQUERY EVENTS (Event Klik)
    
    // Klik tombol Refresh
    $('#btn-refresh').on('click', function() {
        fetchWeatherTegal();
    });

    // Klik tombol Simpan Nama
    $('#btn-save').on('click', function() {
        let inputVal = $('#user-name').val();
        
        // Cek jika input tidak kosong
        if (inputVal.trim() !== "") {
            currentUserName = inputVal; // Update variabel
            
            // Update DOM untuk mengubah sapaan
            $('#greeting').text(`${getGreeting()}, ${currentUserName}!`);
            
            // Kosongkan kembali input
            $('#user-name').val("");
            alert("Nama berhasil diubah!");
        } else {
            alert("Silakan masukkan nama terlebih dahulu.");
        }
    });
});