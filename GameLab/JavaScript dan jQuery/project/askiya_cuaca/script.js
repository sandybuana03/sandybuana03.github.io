$(document).ready(function () {

    // 1. JQUERY EVENTS: Mendeteksi klik pada tombol cari
    $('#btn-cari').on('click', function () {

        // 2. VARIABEL: Menyimpan data input dari user
        let namaKota = $('#input-kota').val();

        if (namaKota !== "") {

            // Memanggil fungsi AJAX
            ambilDataCuaca(namaKota);

        } else {
            alert("Silakan masukkan nama kota terlebih dahulu!");
        }
    });

    // 3. FUNGSI: Menjalankan request API
    function ambilDataCuaca(kota) {

        // URL Geocoding
        const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${kota}&count=1&language=id&format=json`;

        $.ajax({
            url: urlGeocoding,
            type: 'GET',
            dataType: 'json',

            success: function (responGeo) {

                if (responGeo.results && responGeo.results.length > 0) {

                    // Ambil koordinat
                    let lat = responGeo.results[0].latitude;
                    let lon = responGeo.results[0].longitude;
                    let namaResmi = responGeo.results[0].name;

                    // URL API Cuaca
                    const urlCuaca = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

                    // AJAX kedua
                    $.ajax({
                        url: urlCuaca,
                        type: 'GET',
                        dataType: 'json',

                        success: function (responCuaca) {

                            let dataSuhu = responCuaca.current_weather.temperature;
                            let kodeCuaca = responCuaca.current_weather.weathercode;

                            // Tampilkan hasil
                            tampilkanHasil(namaResmi, dataSuhu, kodeCuaca);
                        },

                        error: function () {
                            tampilkanError();
                        }
                    });

                } else {
                    tampilkanError();
                }
            },

            error: function () {
                tampilkanError();
            }
        });
    }

    // Fungsi menampilkan hasil
    function tampilkanHasil(kota, suhu, kode) {

        let teksKondisi = "";
        let saranAktivitas = "";

        // Kondisi cuaca
        if (kode === 0) {

            teksKondisi = "Cerah";
            saranAktivitas = "Cuaca sangat bagus! Cocok untuk jalan-jalan outdoor atau olahraga di luar rumah.";

        } else if (kode >= 1 && kode <= 3) {

            teksKondisi = "Berawan / Sedikit Mendung";
            saranAktivitas = "Nyaman untuk aktivitas luar ruangan, tidak terlalu panas.";

        } else {

            teksKondisi = "Hujan / Badai";
            saranAktivitas = "Sedia payung atau jas hujan! Lebih baik bersantai di dalam ruangan sambil minum kopi hangat.";
        }

        // Tambahan berdasarkan suhu
        if (suhu > 30) {

            saranAktivitas += " Gunakan pakaian tipis/adem karena udara cukup gerah.";

        } else if (suhu < 18) {

            saranAktivitas += " Udara cukup dingin, disarankan memakai jaket tebal.";
        }

        // Manipulasi DOM
        $('#nama-kota').text(kota);
        $('#temperatur').text(`${suhu} °C`);
        $('#kondisi').text(teksKondisi);
        $('#saran-aktivitas').text(saranAktivitas);

        // Tampilkan hasil
        $('#hasil-cuaca').removeClass('hidden');
        $('#error-pesan').addClass('hidden');
    }

    // Fungsi error
    function tampilkanError() {

        $('#error-pesan').removeClass('hidden');
        $('#hasil-cuaca').addClass('hidden');
    }
});