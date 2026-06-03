/*
 * ============================================================
 *  CineSearch — script.js
 *
 *  Fitur yang diimplementasikan (sesuai syarat Tugas Akhir):
 *  1. Variabel           – const / let untuk semua state app
 *  2. Blok Kondisional   – if / else untuk validasi & logika
 *  3. Fungsi             – searchMovies(), showDetail(), dll.
 *  4. jQuery Events      – .on('click'), .on('keypress'), dll.
 *  5. jQuery + DOM       – .html(), .addClass(), .removeClass()
 *  6. AJAX               – $.ajax() ke OMDb API
 * ============================================================
 */

// ============================================================
// 1. VARIABEL — State global aplikasi
// ============================================================
const API_KEY      = "b3d4e5f6"; // Demo key OMDb (ganti dengan key kamu jika perlu)
const API_BASE_URL = "https://www.omdbapi.com/";
const FALLBACK_KEY = "trilogy";   // kata kunci fallback jika key tidak valid

let lastQuery      = "";          // menyimpan query terakhir
let isLoading      = false;       // status loading

// ============================================================
// 3. FUNGSI — Menampilkan pesan status
// ============================================================
function showStatus(message, isError = false) {
  const $status = $("#statusMsg");
  $status.text(message);

  // 2. BLOK KONDISIONAL — beri class error atau hapus
  if (isError) {
    $status.addClass("error");
  } else {
    $status.removeClass("error");
  }
}

// ============================================================
// 3. FUNGSI — Membuat HTML kartu film
// ============================================================
function createMovieCard(movie) {
  // 1. VARIABEL — data tiap film
  const title    = movie.Title   || "Judul Tidak Tersedia";
  const year     = movie.Year    || "–";
  const type     = movie.Type    || "movie";
  const imdbID   = movie.imdbID  || "";
  const posterUrl = (movie.Poster && movie.Poster !== "N/A")
                    ? movie.Poster
                    : null;

  // 2. BLOK KONDISIONAL — tentukan label tipe
  let typeLabel = "Film";
  if (type === "series")       typeLabel = "Serial";
  else if (type === "episode") typeLabel = "Episode";

  // 1. VARIABEL — gambar poster atau emoji placeholder
  const posterHTML = posterUrl
    ? `<img src="${posterUrl}" alt="${title}" loading="lazy" />`
    : `<div class="no-poster">🎬</div>`;

  // 5. jQuery + DOM — bangun elemen card dan pasang data
  const $card = $(`
    <div class="movie-card" data-imdbid="${imdbID}">
      ${posterHTML}
      <div class="card-info">
        <div class="card-title">${title}</div>
        <div class="card-meta">
          <span class="card-year">${year}</span>
          <span class="card-type ${type}">${typeLabel}</span>
        </div>
      </div>
    </div>
  `);

  return $card;
}

// ============================================================
// 3. FUNGSI — Tampilkan detail film (AJAX kedua)
// ============================================================
function showDetail(imdbID) {
  // 2. BLOK KONDISIONAL — jangan fetch jika ID kosong
  if (!imdbID) {
    showStatus("ID film tidak valid.", true);
    return;
  }

  // Tampilkan modal dengan loading state
  $("#modalContent").html(`
    <div class="loader" style="display:block; padding:40px 0;">
      <div class="spinner"></div>
      <p>Memuat detail film...</p>
    </div>
  `);
  $("#modal").removeClass("hidden");

  // 6. AJAX — ambil detail film berdasarkan imdbID
  $.ajax({
    url: API_BASE_URL,
    method: "GET",
    data: {
      apikey: API_KEY,
      i:      imdbID,
      plot:   "full"
    },
    success: function(data) {
      // 2. BLOK KONDISIONAL — cek apakah respon valid
      if (data.Response === "True") {
        renderDetail(data);
      } else {
        // Jika key tidak valid, coba CORS proxy sebagai fallback
        fetchWithProxy(imdbID);
      }
    },
    error: function() {
      fetchWithProxy(imdbID);
    }
  });
}

// ============================================================
// 3. FUNGSI — Fallback menggunakan proxy publik
// ============================================================
function fetchWithProxy(imdbID) {
  $.ajax({
    url: `https://corsproxy.io/?https://www.omdbapi.com/?apikey=trilogy&i=${imdbID}&plot=full`,
    method: "GET",
    success: function(data) {
      if (data && data.Response === "True") {
        renderDetail(data);
      } else {
        $("#modalContent").html(`<p style="color:var(--accent);padding:20px;">Gagal memuat detail film. Coba lagi.</p>`);
      }
    },
    error: function() {
      $("#modalContent").html(`<p style="color:var(--accent);padding:20px;">Koneksi gagal. Periksa jaringan internet kamu.</p>`);
    }
  });
}

// ============================================================
// 3. FUNGSI — Render konten modal detail film
// ============================================================
function renderDetail(data) {
  // 1. VARIABEL — ekstrak semua data film
  const title    = data.Title    || "–";
  const year     = data.Year     || "–";
  const rated    = data.Rated    || "–";
  const runtime  = data.Runtime  || "–";
  const genre    = data.Genre    || "–";
  const director = data.Director || "–";
  const actors   = data.Actors   || "–";
  const plot     = data.Plot     || "Tidak ada sinopsis tersedia.";
  const language = data.Language || "–";
  const country  = data.Country  || "–";
  const awards   = data.Awards   || "–";
  const imdbRating = data.imdbRating || "N/A";
  const poster   = (data.Poster && data.Poster !== "N/A") ? data.Poster : null;

  // 2. BLOK KONDISIONAL — tampilkan poster atau placeholder
  const posterHTML = poster
    ? `<div class="modal-poster"><img src="${poster}" alt="${title}" /></div>`
    : `<div class="modal-poster"><div class="no-poster" style="height:240px;">🎬</div></div>`;

  // 5. jQuery + DOM — isi konten modal
  $("#modalContent").html(`
    <div class="modal-inner">
      ${posterHTML}
      <div class="modal-details">
        <h2 class="modal-title">${title}</h2>
        <div class="modal-badges">
          <span class="badge">${year}</span>
          <span class="badge">${runtime}</span>
          <span class="badge rated">${rated}</span>
          <span class="badge imdb">⭐ ${imdbRating}</span>
        </div>
        <p class="modal-plot">${plot}</p>
        <table class="modal-table">
          <tr><td>Genre</td><td>${genre}</td></tr>
          <tr><td>Sutradara</td><td>${director}</td></tr>
          <tr><td>Pemeran</td><td>${actors}</td></tr>
          <tr><td>Bahasa</td><td>${language}</td></tr>
          <tr><td>Negara</td><td>${country}</td></tr>
          <tr><td>Penghargaan</td><td>${awards}</td></tr>
        </table>
      </div>
    </div>
  `);
}

// ============================================================
// 3. FUNGSI UTAMA — Cari film menggunakan AJAX
// ============================================================
function searchMovies() {
  // 1. VARIABEL — ambil nilai input
  const query = $("#searchInput").val().trim();
  const type  = $("#typeFilter").val();
  const year  = $("#yearFilter").val().trim();

  // 2. BLOK KONDISIONAL — validasi input
  if (!query) {
    showStatus("Masukkan judul film yang ingin dicari.", true);
    return;
  }

  // 2. BLOK KONDISIONAL — cegah double request
  if (isLoading) return;

  // 1. VARIABEL — simpan query terakhir
  lastQuery = query;
  isLoading = true;

  // 5. jQuery + DOM — tampilkan loader, kosongkan grid
  $("#loader").removeClass("hidden");
  $("#resultsGrid").html("");
  showStatus("");

  // 1. VARIABEL — objek parameter AJAX
  const params = { apikey: API_KEY, s: query, type: type };

  // 2. BLOK KONDISIONAL — tambahkan filter tahun jika diisi
  if (year) params.y = year;

  // 6. AJAX — kirim permintaan ke OMDb API
  $.ajax({
    url: API_BASE_URL,
    method: "GET",
    data: params,
    success: function(data) {
      isLoading = false;
      $("#loader").addClass("hidden");

      // 2. BLOK KONDISIONAL — periksa status respons
      if (data.Response === "True" && data.Search) {
        const total = data.totalResults || data.Search.length;
        showStatus(`Ditemukan ${total} hasil untuk "${query}"`);
        renderResults(data.Search);
      } else if (data.Response === "False") {
        // Coba proxy fallback
        searchWithProxy(query, type, year);
      } else {
        searchWithProxy(query, type, year);
      }
    },
    error: function() {
      isLoading = false;
      $("#loader").addClass("hidden");
      searchWithProxy(query, type, year);
    }
  });
}

// ============================================================
// 3. FUNGSI — Pencarian fallback via proxy
// ============================================================
function searchWithProxy(query, type, year) {
  // 1. VARIABEL — bangun URL proxy
  let proxyUrl = `https://corsproxy.io/?https://www.omdbapi.com/?apikey=trilogy&s=${encodeURIComponent(query)}`;
  if (type) proxyUrl += `&type=${type}`;
  if (year) proxyUrl += `&y=${year}`;

  $("#loader").removeClass("hidden");

  $.ajax({
    url: proxyUrl,
    method: "GET",
    success: function(data) {
      isLoading = false;
      $("#loader").addClass("hidden");

      // 2. BLOK KONDISIONAL — cek hasil proxy
      if (data && data.Response === "True" && data.Search) {
        const total = data.totalResults || data.Search.length;
        showStatus(`Ditemukan ${total} hasil untuk "${query}"`);
        renderResults(data.Search);
      } else {
        showStatus(`Film "${query}" tidak ditemukan. Coba kata kunci lain.`, true);
      }
    },
    error: function() {
      isLoading = false;
      $("#loader").addClass("hidden");
      showStatus("Gagal terhubung ke server. Periksa koneksi internet kamu.", true);
    }
  });
}

// ============================================================
// 3. FUNGSI — Render semua kartu film ke grid
// ============================================================
function renderResults(movies) {
  const $grid = $("#resultsGrid");

  // 2. BLOK KONDISIONAL — cek apakah ada hasil
  if (!movies || movies.length === 0) {
    showStatus("Tidak ada film yang ditemukan.", true);
    return;
  }

  // Iterasi setiap film dan buat card
  $.each(movies, function(index, movie) {
    // 1. VARIABEL — delay animasi berdasarkan index
    const delay = index * 60;
    const $card = createMovieCard(movie);
    $card.css("animation-delay", `${delay}ms`);
    $grid.append($card);
  });
}

// ============================================================
// 4. jQuery EVENTS — Pasang semua event listener
// ============================================================
$(document).ready(function () {

  // 4. jQuery Events — klik tombol CARI
  $("#searchBtn").on("click", function () {
    searchMovies();
  });

  // 4. jQuery Events — tekan Enter di input
  $("#searchInput").on("keypress", function (e) {
    // 2. BLOK KONDISIONAL — hanya proses jika Enter
    if (e.which === 13) {
      searchMovies();
    }
  });

  // 4. jQuery Events — klik kartu film (event delegation)
  $("#resultsGrid").on("click", ".movie-card", function () {
    // 1. VARIABEL — ambil imdbID dari data attribute
    const imdbID = $(this).data("imdbid");
    showDetail(imdbID);
  });

  // 4. jQuery Events — klik tombol tutup modal
  $("#modalClose").on("click", function () {
    $("#modal").addClass("hidden");
  });

  // 4. jQuery Events — klik overlay (area gelap) untuk tutup modal
  $("#modalOverlay").on("click", function () {
    $("#modal").addClass("hidden");
  });

  // 4. jQuery Events — tekan Escape untuk tutup modal
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#modal").addClass("hidden");
    }
  });

  // 4. jQuery Events — animasi hover pada tombol search
  $("#searchBtn").on("mouseenter", function () {
    $(this).css("letter-spacing", "0.14em");
  }).on("mouseleave", function () {
    $(this).css("letter-spacing", "0.08em");
  });

  // Tampilkan pesan awal
  showStatus("Ketik judul film di atas dan tekan CARI 🎬");

  // Auto-fokus ke input saat halaman dimuat
  $("#searchInput").focus();
});