// Memastikan DOM telah siap sepenuhnya
$(document).ready(function () {

    // 1. VARIABEL (Menyimpan status dan data global)
    let currentQuote = "";
    let currentAuthor = "";
    const apiUrl = "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random";

    // 2. FUNGSI (Function untuk menampilkan data ke UI)
    function updateUI(text, author) {
        // 5. JQUERY + DOM (Mengubah konten text pada HTML)
        $("#quote-text").text(`"${text}"`);
        $("#quote-author").text(`- ${author}`);
    }

    // 3. JQUERY EVENTS (Event Click pada tombol "Ambil Quote")
    $("#btn-get-quote").click(function () {
        $("#status-log").text("Status: Sedang mengambil data...");

        // 6. AJAX (Mengambil data dari API publik secara Asynchronous)
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                // API ZenQuotes mengembalikan array dengan objek di dalamnya
                currentQuote = data[0].q;
                currentAuthor = data[0].a;
                
                // Mengambil nilai filter saat ini
                let filterValue = $("#category-select").val();

                // 4. BLOK KONDISIONAL (Pengecekan berdasarkan panjang karakter sesuai filter)
                if (filterValue === "short" && currentQuote.length >= 50) {
                    // Jika user minta pendek tapi dapat panjang, kita beri teks alternatif atau modifikasi
                    updateUI(currentQuote.substring(0, 47) + "...", currentAuthor + " (Potongan)");
                    $("#status-log").text("Status: Sukses (Quote dipotong agar pendek).");
                } else if (filterValue === "long" && currentQuote.length < 50) {
                    // Jika user minta panjang tapi dapat pendek, beri tanda info
                    updateUI(currentQuote, currentAuthor + " (Quote Asli Pendek)");
                    $("#status-log").text("Status: Sukses (Quote asli berukuran pendek).");
                } else {
                    // Kondisi default (Kategori "All" atau sesuai dengan filter)
                    updateUI(currentQuote, currentAuthor);
                    $("#status-log").text("Status: Sukses memuat quote baru!");
                }
            },
            error: function (xhr, status, error) {
                console.error("Detail Error:", error);
                $("#status-log").text("Status: Gagal mengambil data. Coba lagi.");
                updateUI("Gagal memuat quote. Silakan periksa koneksi internet Anda.", "Sistem");
            }
        });
    });

    // JQUERY EVENTS (Event Click untuk tombol Reset)
    $("#btn-clear").click(function () {
        currentQuote = "";
        currentAuthor = "";
        $("#category-select").val("all");
        updateUI("Klik tombol di bawah untuk memuat quotes menarik.", "Kreator");
        $("#status-log").text("Status: Di-reset.");
    });
});