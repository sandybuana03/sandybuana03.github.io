let currentAudio = null;
let currentBtn   = null;
let progressInterval = null;

/* ================= AUTOCOMPLETE SUGGESTIONS ================= */
const eurobeatSuggestions = [
  "Dave Rodgers", "Domino", "Gas Gas Gas", "Night of Fire",
  "Running in the 90s", "Super Driver", "Burning", "Go Go Go",
  "Love is in Danger", "Making Love", "Remember Me", "Around the World",
  "Speed King", "Boom Boom Dollar", "Only Me", "Turn Around",
  "Back on the Road", "Space Boy", "Hot Stuff", "Be My Baby",
  "Nothing's Gonna Stop Us", "Forever Together", "Fire", "Hold Me Tonight",
  "Deja Vu", "Break In", "Strike Back", "Dream of You"
];

$("#search").on("input", function () {
  const v = this.value.toLowerCase().trim();
  $("#suggest").empty();
  if (!v) return;
  eurobeatSuggestions
    .filter(s => s.toLowerCase().includes(v))
    .slice(0, 8)
    .forEach(s => $("#suggest").append(`<div onclick="pick('${s}')">${s}</div>`));
});

function pick(s) {
  $("#search").val(s);
  $("#suggest").empty();
}

/* ================= SEARCH ================= */
async function searchMusic(query) {
  if (!query.trim()) return;

  $("#suggest").empty();
  $("#resultsSection").hide();
  $("#results").empty();
  $("#loading").fadeIn(200);
  stopCurrent();

  try {
    // iTunes Search API — returns JSON cross-origin via JSONP/CORS
    const term = encodeURIComponent(query + " eurobeat");
    const url  = `https://itunes.apple.com/search?term=${term}&media=music&limit=20&country=US`;
    const data = await fetch(url).then(r => r.json());

    $("#loading").hide();

    if (!data.results || data.results.length === 0) {
      showNoResults(query);
      return;
    }

    renderResults(data.results, query);
  } catch (err) {
    $("#loading").hide();
    showError();
    console.error(err);
  }
}

/* ================= RENDER ================= */
function renderResults(tracks, query) {
  $("#resultsCount").text(`${tracks.length} TRACKS FOUND FOR "${query.toUpperCase()}"`);
  $("#resultsSection").fadeIn(300);

  tracks.forEach((track, i) => {
    const thumb = (track.artworkUrl100 || "").replace("100x100", "300x300");
    const title  = escHtml(track.trackName   || track.collectionName || "Unknown Track");
    const artist = escHtml(track.artistName  || "Unknown Artist");
    const preview = track.previewUrl || "";

    const imgHtml = thumb
      ? `<img class="card-thumb" src="${thumb}" alt="${title}" loading="lazy">`
      : `<div class="thumb-placeholder">&#9654;</div>`;

    const playHtml = preview
      ? `<button class="play-btn" data-preview="${escHtml(preview)}"
           data-title="${title}" data-artist="${artist}" data-thumb="${escHtml(thumb)}">
           &#9654; PLAY
         </button>`
      : `<button class="play-btn" disabled style="opacity:.35;cursor:not-allowed;">NO PREVIEW</button>`;

    const col = $(`
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card-box">
          <div class="card-thumb-wrap">
            ${imgHtml}
            <div class="card-thumb-overlay"></div>
          </div>
          <div class="card-body-inner">
            <div class="card-track-title">${title}</div>
            <div class="card-artist">${artist}</div>
            ${playHtml}
          </div>
        </div>
      </div>
    `);

    col.find(".play-btn[data-preview]").on("click", function () {
      handlePlay(this);
    });

    $("#results").append(col);
  });
}

/* ================= AUDIO PLAYER ================= */
function handlePlay(btn) {
  const $btn    = $(btn);
  const preview = $btn.data("preview");
  const title   = $btn.data("title");
  const artist  = $btn.data("artist");
  const thumb   = $btn.data("thumb");

  // If same track is playing — stop it
  if (currentAudio && currentBtn === btn) {
    stopCurrent();
    return;
  }

  // Stop previous
  stopCurrent();

  // Start new
  currentAudio = new Audio(preview);
  currentBtn   = btn;

  currentAudio.play().catch(e => console.warn("Autoplay blocked:", e));

  $btn.text("⏸ PAUSE").addClass("playing");
  showPlayerBar(thumb, title, artist);
  startProgress();

  currentAudio.addEventListener("ended", () => {
    stopCurrent();
  });
}

function stopCurrent() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (currentBtn) {
    $(currentBtn).text("▶ PLAY").removeClass("playing");
    currentBtn = null;
  }
  clearInterval(progressInterval);
  $("#playerBar").hide();
  $("#progressBar").css("width", "0%");
}

function showPlayerBar(thumb, title, artist) {
  $("#playerThumb").attr("src", thumb || "");
  $("#playerTitle").text(title);
  $("#playerArtist").text(artist);
  $("#playerBar").fadeIn(250);
}

function startProgress() {
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (!currentAudio) return;
    const pct = (currentAudio.currentTime / (currentAudio.duration || 30)) * 100;
    $("#progressBar").css("width", Math.min(pct, 100) + "%");
  }, 500);
}

$("#stopBtn").on("click", stopCurrent);

/* ================= HELPERS ================= */
function showNoResults(query) {
  $("#resultsCount").text(`NO TRACKS FOUND FOR "${query.toUpperCase()}"`);
  $("#resultsSection").fadeIn(300);
}

function showError() {
  $("#resultsCount").text("CONNECTION ERROR — TRY AGAIN");
  $("#resultsSection").fadeIn(300);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ================= EVENTS ================= */
$("#searchBtn").on("click", () => searchMusic($("#search").val()));

$("#search").on("keydown", function (e) {
  if (e.key === "Enter") searchMusic(this.value);
});

// Close suggestions on outside click
$(document).on("click", function (e) {
  if (!$(e.target).closest("#search, #suggest").length) {
    $("#suggest").empty();
  }
});

/* ================= AUTO LOAD ON START ================= */
searchMusic("Eurobeat");
