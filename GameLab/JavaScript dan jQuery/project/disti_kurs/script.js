$(document).ready(function() {
    
    // 1. JQUERY EVENTS (Click Event)
    $('#btnConvert').on('click', function() {
        // 2. VARIABEL
        const amount = $('#amountInput').val();
        const base = $('#baseCurrency').val();
        const target = $('#targetCurrency').val();

        // 3. BLOK KONDISIONAL (Validasi Input)
        if (amount <= 0 || amount === "") {
            alert("Harap masukkan jumlah yang valid!");
            return;
        }

        if (base === target) {
            alert("Mata uang asal dan tujuan tidak boleh sama!");
            return;
        }

        // Jalankan Fungsi Utama
        processConversion(amount, base, target);
    });

    // 4. FUNGSI (Mengambil data & memproses)
    function processConversion(amount, base, target) {
        // Efek JQUERY DOM saat loading
        $('#btnConvert').text('Loading...');
        
        // 5. AJAX (Mengambil data kurs berdasarkan pilihan 'base')
        const dynamicURL = `https://open.er-api.com/v6/latest/${base}`;

        $.ajax({
            url: dynamicURL,
            type: "GET",
            success: function(response) {
                // Ambil rate dari hasil respons API
                const rate = response.rates[target];
                const total = amount * rate;

                // 6. JQUERY + DOM (Menampilkan hasil)
                displayFinal(amount, base, target, total);
            },
            error: function() {
                alert("Koneksi gagal atau mata uang tidak didukung.");
            },
            complete: function() {
                $('#btnConvert').text('Konversi Sekarang');
            }
        });
    }

    function displayFinal(amount, base, target, total) {
        $('#convertDetail').text(`${amount} ${base} ke ${target} adalah:`);
        
        // Format angka (Lokale Indonesia)
        let formatted = new Intl.NumberFormat('id-ID').format(total.toFixed(2));
        $('#finalResult').text(`${formatted} ${target}`);

        // Kondisional tambahan (UX/UI Feedback)
        if (total > 100000) {
            $('#statusMessage').text("Nilai konversi cukup besar.");
        } else {
            $('#statusMessage').text("Konversi selesai.");
        }

        $('#resultBox').slideDown();
    }
});