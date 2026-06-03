// ================================================================
// AniSearch v2 — Enhanced with 12 Features
// AniList GraphQL API | graphql.anilist.co
// ================================================================

const ANILIST_URL = "https://graphql.anilist.co";

let currentType     = "ANIME";
let currentQuery    = "";
let currentGenre    = "";
let currentTrend    = "TRENDING_DESC";
let isLoading       = false;
let currentPage     = 1;
let totalPages      = 1;
let hasNextPage     = false;
let isInfiniteMode  = true;
const PER_PAGE      = 24;

// Advanced filter state
let filterYear      = { from: null, to: null };
let filterMinScore  = 0;
let filterStatus    = "";
let filterSeason    = "";
let filterMinEps    = null;
let customSort      = null;

// Search history
const MAX_HISTORY   = 8;

// ================================================================
// GRAPHQL QUERIES
// ================================================================

const QUERY_LIST = `
  query ($type: MediaType, $search: String, $genre: String, $sort: [MediaSort],
         $page: Int, $perPage: Int, $status: MediaStatus, $season: MediaSeason,
         $seasonYear: Int, $averageScore_greater: Int, $episodes_greater: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: $type, search: $search, genre: $genre, sort: $sort, isAdult: false,
            status: $status, season: $season, seasonYear: $seasonYear,
            averageScore_greater: $averageScore_greater, episodes_greater: $episodes_greater) {
        id
        title { romaji english }
        type format status genres averageScore popularity
        startDate { year }
        coverImage { large }
        trailer { id site }
        studios(isMain: true) { nodes { name } }
      }
    }
  }
`;

const QUERY_DETAIL = `
  query ($id: Int, $type: MediaType) {
    Media(id: $id, type: $type, isAdult: false) {
      id
      title { romaji english native }
      type format status genres averageScore popularity
      rankings { rank type context allTime }
      episodes chapters duration
      startDate { year }
      season seasonYear
      coverImage { large extraLarge }
      bannerImage
      description(asHtml: false)
      trailer { id site }
      studios(isMain: true) { nodes { name siteUrl } }
      characters(sort: ROLE, perPage: 6) {
        nodes { name { full } image { medium } }
      }
      siteUrl
    }
  }
`;

const QUERY_RECOMMENDATIONS = `
  query ($id: Int) {
    Media(id: $id, isAdult: false) {
      recommendations(perPage: 6, sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id title { romaji english } coverImage { large } averageScore
          }
        }
      }
    }
  }
`;


// ================================================================
// HELPERS
// ================================================================

function getScoreClass(score) {
  if (!score) return "none";
  if (score >= 80) return "high";
  if (score >= 65) return "mid";
  return "low";
}

function getScoreLabel(score) {
  if (!score) return "N/A";
  return "★ " + (score / 10).toFixed(1);
}

function getTitle(item) {
  return item.title.english || item.title.romaji || "Unknown";
}

function stripHtml(str) {
  return str ? str.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim() : "";
}

function fetchAniList(query, variables) {
  return $.ajax({
    url:         ANILIST_URL,
    type:        "POST",
    contentType: "application/json",
    data:        JSON.stringify({ query, variables })
  });
}

// ================================================================
// SEARCH HISTORY
// ================================================================

function getHistory() {
  try { return JSON.parse(localStorage.getItem("ani_search_history") || "[]"); }
  catch(e) { return []; }
}

function saveHistory(query) {
  if (!query || query.length < 2) return;
  let history = getHistory().filter(h => h !== query);
  history.unshift(query);
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem("ani_search_history", JSON.stringify(history));
}

function renderHistoryDropdown() {
  const history = getHistory();
  const $hist = $("#searchHistory");
  if (!history.length) { $hist.hide(); return; }
  $hist.html(
    history.map(h => `
      <div class="history-item">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>${h}</span>
        <button class="history-del" data-q="${h}">✕</button>
      </div>
    `).join("")
  ).show();
}

function clearHistory(q) {
  let history = getHistory().filter(h => h !== q);
  localStorage.setItem("ani_search_history", JSON.stringify(history));
}

// ================================================================
// FAVORITES
// ================================================================

function getFavorites() {
  try { return JSON.parse(localStorage.getItem("ani_favorites") || "[]"); }
  catch(e) { return []; }
}

function isFavorite(id) {
  return getFavorites().some(f => f.id === id);
}

function toggleFavorite(item) {
  let favs = getFavorites();
  const idx = favs.findIndex(f => f.id === item.id);
  if (idx > -1) {
    favs.splice(idx, 1);
    showToast(`Dihapus dari favorit`);
  } else {
    favs.unshift(item);
    showToast(`❤ Ditambah ke favorit!`);
  }
  localStorage.setItem("ani_favorites", JSON.stringify(favs));
  updateFavCount();
}

function updateFavCount() {
  const count = getFavorites().length;
  $("#favCount").text(count).toggleClass("has-items", count > 0);
}

function renderFavPanel() {
  const favs = getFavorites();
  const $list = $("#favList");
  if (!favs.length) {
    $list.html(`<div class="fav-empty"><span>♡</span><p>Belum ada favorit.</p><p>Klik ❤ di detail anime untuk menyimpan.</p></div>`);
    return;
  }
  $list.html(favs.map(f => `
    <div class="fav-item" data-id="${f.id}">
      <img src="${f.coverImage?.large || ''}" alt="${getTitle(f)}" loading="lazy"/>
      <div class="fav-item-info">
        <div class="fav-item-title">${getTitle(f)}</div>
        <div class="fav-item-meta">${f.format || ''} · ${f.startDate?.year || '—'}</div>
        <div class="fav-score ${getScoreClass(f.averageScore)}">${getScoreLabel(f.averageScore)}</div>
      </div>
      <button class="fav-remove" data-id="${f.id}" title="Hapus">✕</button>
    </div>
  `).join(""));
}

// ================================================================
// TOAST
// ================================================================

let toastTimeout;
function showToast(msg) {
  clearTimeout(toastTimeout);
  const $t = $("#toast");
  $t.text(msg).addClass("show");
  toastTimeout = setTimeout(() => $t.removeClass("show"), 2500);
}

// ================================================================
// VOICE SEARCH
// ================================================================

function initVoiceSearch() {
  const $btn = $("#voiceBtn");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { $btn.hide(); return; }

  const rec = new SpeechRecognition();
  rec.lang = "id-ID";
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  $btn.on("click", () => {
    $btn.addClass("listening");
    showToast("🎤 Mendengarkan...");
    rec.start();
  });

  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    $("#searchInput").val(transcript);
    $btn.removeClass("listening");
    currentQuery = transcript;
    currentGenre = "";
    saveHistory(transcript);
    fetchData(currentQuery, currentGenre, 1);
  };

  rec.onerror = rec.onend = () => {
    $btn.removeClass("listening");
  };
}

// ================================================================
// DARK / LIGHT MODE
// ================================================================

function initTheme() {
  const saved = localStorage.getItem("ani_theme") || "dark";
  applyTheme(saved);
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  $(".icon-moon").toggle(theme === "dark");
  $(".icon-sun").toggle(theme === "light");
  localStorage.setItem("ani_theme", theme);
}

$("#themeToggle").on("click", () => {
  const current = document.body.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

// ================================================================
// SKELETON LOADING
// ================================================================

function showSkeleton() {
  const count = 12;
  let html = '<div class="skeleton-grid">';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton-card">
        <div class="sk sk-poster"></div>
        <div class="sk-body">
          <div class="sk sk-title"></div>
          <div class="sk sk-meta"></div>
        </div>
      </div>`;
  }
  html += '</div>';
  $("#skeletonGrid").html(html).show();
}

function hideSkeleton() {
  $("#skeletonGrid").hide();
}

// ================================================================
// RENDER CARDS
// ================================================================

function renderCards(mediaList, pageInfo, append = false) {
  hideSkeleton();
  const $grid = $("#animeGrid");

  if (!append) {
    $grid.empty();
    $("#emptyState").hide();
  }

  if (!mediaList || mediaList.length === 0) {
    if (!append) $("#emptyState").fadeIn(300);
    return;
  }

  totalPages = pageInfo?.lastPage || 1;
  hasNextPage = pageInfo?.hasNextPage || false;
  const typeLabel = currentType === "ANIME" ? "anime" : "manga";
  const total = pageInfo?.total || mediaList.length;

  if (!append) {
    $("#statusBar").html(
      `Menampilkan <span>${mediaList.length}</span> dari <span>${total}</span> ${typeLabel} — halaman <span>${currentPage}</span>/<span>${totalPages}</span>`
    );
  }

  const offset = append ? $grid.children().length : 0;
  mediaList.forEach((item, i) => {
    const title      = getTitle(item);
    const score      = item.averageScore || 0;
    const format     = item.format || "—";
    const year       = item.startDate?.year || "—";
    const genre      = item.genres?.[0] || "—";
    const scoreClass = getScoreClass(score);
    const scoreLabel = getScoreLabel(score);
    const isFav      = isFavorite(item.id);
    const studio     = item.studios?.nodes?.[0]?.name || "";

    const imgHtml = item.coverImage?.large
      ? `<img src="${item.coverImage.large}" alt="${title}" loading="lazy"/>`
      : `<div class="card-poster-placeholder">🎌</div>`;

    const scoreBadge = score
      ? `<div class="score-badge ${scoreClass}">${scoreLabel}</div>`
      : "";

    const $card = $(`
      <div class="anime-card" data-id="${item.id}" style="animation-delay:${(i % 12) * 0.04}s">
        <div class="card-poster">
          ${imgHtml}
          <div class="type-badge">${format}</div>
          ${scoreBadge}
          <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="Favorit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="card-body">
          <div class="card-title">${title}</div>
          <div class="card-meta">
            <span class="card-genre">${genre}</span>
            <span class="card-year">${year}</span>
          </div>
          ${studio ? `<div class="card-studio">${studio}</div>` : ''}
        </div>
      </div>
    `);

    // Store item data for favorites
    $card.data("item", item);
    $grid.append($card);
  });
}

// ================================================================
// MODAL DETAIL
// ================================================================

function openModal(id) {
  const $modal = $("#modal");
  const $box   = $("#modalBox");

  $box.html(`
    <div class="modal-loading">
      <div class="loader-spin" style="margin:0 auto 24px;">
        <div class="spin-ring sr1"></div>
        <div class="spin-ring sr2"></div>
        <div class="spin-ring sr3"></div>
        <div class="spin-core">◈</div>
      </div>
      <p class="loader-text">Memuat detail...</p>
    </div>
  `);
  $modal.addClass("open");

  // Fetch detail + recommendations in parallel
  Promise.all([
    fetchAniList(QUERY_DETAIL, { id, type: currentType }).promise(),
    fetchAniList(QUERY_RECOMMENDATIONS, { id }).promise()
  ]).then(([detailRes, recRes]) => {
    const d    = detailRes.data.Media;
    const recs = recRes.data?.Media?.recommendations?.nodes
      ?.map(n => n.mediaRecommendation)
      ?.filter(Boolean) || [];

    const title   = getTitle(d);
    const native  = d.title.native || "";
    const score   = d.averageScore || 0;
    const format  = d.format || "—";
    const year    = d.startDate?.year || "—";
    const eps     = (currentType === "ANIME" ? d.episodes : d.chapters) || "—";
    const epLabel = currentType === "ANIME" ? "Episodes" : "Chapters";
    const dur     = d.duration ? `${d.duration} min` : "—";
    const studio  = d.studios?.nodes?.[0]?.name || "—";
    const season  = d.season ? `${d.season} ${d.seasonYear || ""}` : "—";

    const rankObj = d.rankings?.find(r => r.allTime && r.type === "RATED");
    const rank    = rankObj ? "#" + rankObj.rank : "—";

    const synopsis = stripHtml(d.description);
    const shortSyn = synopsis.length > 500
      ? synopsis.substring(0, 500) + "..."
      : synopsis || "Tidak ada sinopsis.";

    const genreHtml = (d.genres || [])
      .map(g => `<span class="genre-pill">${g}</span>`)
      .join("");

    const imgHtml = d.coverImage?.extraLarge || d.coverImage?.large
      ? `<img src="${d.coverImage.extraLarge || d.coverImage.large}" alt="${title}"/>`
      : `<div class="modal-poster-placeholder">🎌</div>`;

    const scoreClass = getScoreClass(score);
    const scoreLabel = getScoreLabel(score);
    const scoreHtml  = score
      ? `<div class="modal-score ${scoreClass}">${scoreLabel}</div>`
      : `<div class="modal-score none">N/A</div>`;

    // Trailer
    const trailerHtml = (d.trailer && d.trailer.site === "youtube")
      ? `<a class="trailer-btn" href="https://www.youtube.com/watch?v=${d.trailer.id}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Tonton Trailer
        </a>` : "";

    // Characters
    const charsHtml = (d.characters?.nodes || []).map(c => `
      <div class="char-item">
        <img src="${c.image?.medium || ''}" alt="${c.name?.full || ''}"/>
        <span>${(c.name?.full || '').split(' ').slice(-1)[0]}</span>
      </div>
    `).join("");

    // Recommendations
    const recsHtml = recs.length ? `
      <div class="modal-recs">
        <div class="modal-section-label">✦ Rekomendasi Serupa</div>
        <div class="recs-grid">
          ${recs.slice(0, 6).map(r => `
            <div class="rec-card" data-id="${r.id}">
              <img src="${r.coverImage?.large || ''}" alt="${getTitle(r)}" loading="lazy"/>
              <div class="rec-title">${getTitle(r)}</div>
              <div class="rec-score ${getScoreClass(r.averageScore)}">${getScoreLabel(r.averageScore)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : "";

    const isFav   = isFavorite(id);
    const favData = JSON.stringify({
      id: d.id,
      title: d.title,
      coverImage: d.coverImage,
      format: d.format,
      startDate: d.startDate,
      averageScore: d.averageScore
    }).replace(/'/g, "&#39;");

    $box.html(`
      ${d.bannerImage ? `<div class="modal-banner" style="background-image:url(${d.bannerImage})"></div>` : ''}
      <div class="modal-top">
        <div class="modal-poster">${imgHtml}</div>
        <div class="modal-info">
          <span class="modal-type-badge">${format}</span>
          <div class="modal-title">${title}</div>
          ${native ? `<div class="modal-title-jp">${native}</div>` : ""}
          <div class="modal-score-row">
            ${scoreHtml}
            <span class="modal-rank">Rank ${rank}</span>
          </div>
          <div class="modal-stats-grid">
            <div class="stat-item">
              <span class="stat-label">Status</span>
              <span class="stat-value">${d.status || "—"}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${epLabel}</span>
              <span class="stat-value">${eps}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Durasi</span>
              <span class="stat-value">${dur}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Season</span>
              <span class="stat-value">${season}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Studio</span>
              <span class="stat-value">${studio}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Tahun</span>
              <span class="stat-value">${year}</span>
            </div>
          </div>
          <div class="modal-actions">
            ${trailerHtml}
            <button class="fav-toggle-btn ${isFav ? 'active' : ''}" data-fav='${favData}'>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              ${isFav ? 'Hapus Favorit' : 'Tambah Favorit'}
            </button>
            ${d.siteUrl ? `<a class="link-btn" href="${d.siteUrl}" target="_blank" rel="noopener">AniList ↗</a>` : ''}
          </div>
        </div>
      </div>
      <div class="modal-body">
        ${genreHtml ? `<div class="modal-genres">${genreHtml}</div>` : ""}
        ${charsHtml ? `
          <div class="modal-section-label">Karakter Utama</div>
          <div class="chars-grid">${charsHtml}</div>
        ` : ""}
        <div class="modal-synopsis-label">Sinopsis</div>
        <p class="modal-synopsis">${shortSyn}</p>
        ${recsHtml}
        <div class="modal-divider"></div>
        <button class="modal-close" id="closeModal">✕ &nbsp; Tutup</button>
      </div>
    `);
  }).catch(() => {
    $box.html(`
      <div style="padding:60px;text-align:center">
        <p style="margin-bottom:20px;color:var(--muted)">Gagal memuat detail.</p>
        <button class="modal-close" id="closeModal">Tutup</button>
      </div>
    `);
  });
}


// ================================================================
// FETCH DATA
// ================================================================

function buildVariables(page) {
  const vars = {
    type: currentType,
    page: page || 1,
    perPage: PER_PAGE
  };

  if (currentQuery) {
    vars.search = currentQuery;
    vars.sort = [customSort || "SEARCH_MATCH"];
  } else if (currentGenre) {
    vars.genre = currentGenre;
    vars.sort = [customSort || currentTrend];
  } else {
    vars.sort = [customSort || currentTrend];
  }

  if (filterStatus) vars.status = filterStatus;
  if (filterSeason) vars.season = filterSeason;
  if (filterMinScore > 0) vars.averageScore_greater = filterMinScore;
  if (filterMinEps) vars.episodes_greater = filterMinEps;

  return vars;
}

function fetchData(query, genre, page, append = false) {
  if (isLoading) return;
  isLoading = true;
  currentPage = page || 1;
  currentQuery = query;
  currentGenre = genre;

  if (!append) {
    $("#welcome").hide();
    $("#animeGrid").empty();
    $("#emptyState").hide();
    $("#statusBar").text("");
    showSkeleton();
  } else {
    $("#loadMoreSpinner").show();
  }

  const variables = buildVariables(currentPage);

  fetchAniList(QUERY_LIST, variables)
    .then(res => {
      hideSkeleton();
      $("#loadMoreSpinner").hide();
      const pageData = res.data?.Page || {};
      const items    = pageData.media || [];
      const pageInfo = pageData.pageInfo || {};
      renderCards(items, pageInfo, append);
    })
    .fail(xhr => {
      hideSkeleton();
      $("#loadMoreSpinner").hide();
      let msg = "Gagal mengambil data. Coba lagi.";
      if (xhr.status === 429) msg = "Terlalu banyak request. Tunggu sebentar.";
      if (xhr.status === 404) msg = "Data tidak ditemukan.";
      if (!append) {
        $("#statusBar").html(`<span style="color:var(--ember-hot)">${msg}</span>`);
        $("#emptyState").fadeIn(300);
      } else {
        showToast(msg);
      }
    })
    .always(() => { isLoading = false; });
}

// ================================================================
// INFINITE SCROLL
// ================================================================

function initInfiniteScroll() {
  const sentinel = document.getElementById("scrollSentinel");
  if (!sentinel) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage && !isLoading && isInfiniteMode) {
      fetchData(currentQuery, currentGenre, currentPage + 1, true);
      currentPage++;
    }
  }, { rootMargin: "100px" });

  observer.observe(sentinel);
}

// ================================================================
// ADVANCED FILTERS
// ================================================================

$("#advToggle").on("click", function() {
  const $panel = $("#advFilters");
  const open = $panel.hasClass("open");
  $panel.toggleClass("open", !open);
  $(this).toggleClass("active", !open);
});

$("#minScore").on("input", function() {
  const val = $(this).val();
  $("#minScoreVal").text(val);
  filterMinScore = parseInt(val) || 0;
});

$("#applyFilters").on("click", function() {
  filterYear.from  = parseInt($("#yearFrom").val()) || null;
  filterYear.to    = parseInt($("#yearTo").val()) || null;
  filterStatus     = $("#filterStatus").val();
  filterSeason     = $("#filterSeason").val();
  filterMinEps     = parseInt($("#minEps").val()) || null;
  customSort       = $("#sortSelect").val() || null;
  fetchData(currentQuery, currentGenre, 1);
});

// ================================================================
// TRENDING TABS
// ================================================================

$(".trend-tab").on("click", function() {
  $(".trend-tab").removeClass("active");
  $(this).addClass("active");
  currentTrend = $(this).data("trend");
  customSort = null;
  currentQuery = "";
  currentGenre = "";
  $("#searchInput").val("");
  $(".chip").removeClass("active");
  $(".chip[data-genre='']").addClass("active");
  fetchData("", "", 1);
});

// ================================================================
// EVENT LISTENERS
// ================================================================

// Search button
$("#searchBtn").on("click", () => {
  const q = $("#searchInput").val().trim();
  if (!q) return;
  saveHistory(q);
  currentQuery = q;
  currentGenre = "";
  $(".chip").removeClass("active");
  $(".chip[data-genre='']").addClass("active");
  $("#searchHistory").hide();
  fetchData(currentQuery, currentGenre, 1);
});

// Enter key
$("#searchInput").on("keydown", function(e) {
  if (e.key !== "Enter") return;
  const q = $(this).val().trim();
  if (!q) return;
  saveHistory(q);
  currentQuery = q;
  currentGenre = "";
  $(".chip").removeClass("active");
  $(".chip[data-genre='']").addClass("active");
  $("#searchHistory").hide();
  fetchData(currentQuery, currentGenre, 1);
});

// Search input focus: show history
$("#searchInput").on("focus", function() {
  if ($(this).val().length === 0) renderHistoryDropdown();
}).on("input", function() {
  if ($(this).val().length === 0) renderHistoryDropdown();
  else $("#searchHistory").hide();
});

// Click outside to hide history
$(document).on("click", function(e) {
  if (!$(e.target).closest(".search-input-wrap").length) {
    $("#searchHistory").hide();
  }
});

// History item click
$(document).on("click", ".history-item span", function() {
  const q = $(this).text();
  $("#searchInput").val(q);
  $("#searchHistory").hide();
  currentQuery = q;
  currentGenre = "";
  fetchData(currentQuery, currentGenre, 1);
});

// History delete
$(document).on("click", ".history-del", function(e) {
  e.stopPropagation();
  clearHistory($(this).data("q"));
  renderHistoryDropdown();
});

// Genre chips
$(".chip").on("click", function() {
  $(".chip").removeClass("active");
  $(this).addClass("active");
  currentGenre = $(this).data("genre");
  currentQuery = "";
  customSort   = null;
  $("#searchInput").val("");
  fetchData(currentQuery, currentGenre, 1);
});

// Tab toggle (Anime / Manga)
$(".toggle-pill").on("click", function() {
  $(".toggle-pill").removeClass("active");
  $(this).addClass("active");
  currentType  = $(this).data("type").toUpperCase();
  currentQuery = "";
  currentGenre = "";
  customSort   = null;
  $("#searchInput").val("");
  $(".chip").removeClass("active");
  $(".chip[data-genre='']").addClass("active");
  fetchData("", "", 1);
});

// Card click → modal
$("#animeGrid").on("click", ".anime-card", function(e) {
  if ($(e.target).closest(".card-fav-btn").length) return;
  const id = $(this).data("id");
  if (id) openModal(id);
});

// Card favorite button
$(document).on("click", ".card-fav-btn", function(e) {
  e.stopPropagation();
  const id   = parseInt($(this).data("id"));
  const $card = $(this).closest(".anime-card");
  const item  = $card.data("item");
  if (!item) return;
  toggleFavorite(item);
  const nowFav = isFavorite(id);
  $(this).toggleClass("active", nowFav)
    .find("svg").attr("fill", nowFav ? "currentColor" : "none");
});

// Modal favorite toggle
$(document).on("click", ".fav-toggle-btn", function() {
  const item = $(this).data("fav");
  toggleFavorite(item);
  const nowFav = isFavorite(item.id);
  $(this)
    .toggleClass("active", nowFav)
    .html(`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="${nowFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      ${nowFav ? 'Hapus Favorit' : 'Tambah Favorit'}
    `);
});

// Recommendation card click
$(document).on("click", ".rec-card", function() {
  const id = parseInt($(this).data("id"));
  if (id) openModal(id);
});

// Favorites panel
$("#favBtn").on("click", () => {
  renderFavPanel();
  $("#favPanel").addClass("open");
});

$("#favClose, .fav-backdrop").on("click", () => {
  $("#favPanel").removeClass("open");
});

// Remove from favs in panel
$(document).on("click", ".fav-remove", function(e) {
  e.stopPropagation();
  const id = parseInt($(this).data("id"));
  let favs = getFavorites().filter(f => f.id !== id);
  localStorage.setItem("ani_favorites", JSON.stringify(favs));
  updateFavCount();
  renderFavPanel();
  showToast("Dihapus dari favorit");
});

// Fav item click → open modal
$(document).on("click", ".fav-item", function(e) {
  if ($(e.target).closest(".fav-remove").length) return;
  const id = parseInt($(this).data("id"));
  if (id) {
    $("#favPanel").removeClass("open");
    openModal(id);
  }
});

// Close modal
$(document).on("click", "#closeModal", () => $("#modal").removeClass("open"));
$(".modal-backdrop").on("click", () => $("#modal").removeClass("open"));
$(document).on("keydown", e => {
  if (e.key === "Escape") {
    $("#modal").removeClass("open");
    $("#favPanel").removeClass("open");
    $("#searchHistory").hide();
  }
});


// ================================================================
// INIT
// ================================================================
$(document).ready(() => {
  initTheme();
  updateFavCount();
  initVoiceSearch();
  initInfiniteScroll();
  fetchData("", "", 1);
});
