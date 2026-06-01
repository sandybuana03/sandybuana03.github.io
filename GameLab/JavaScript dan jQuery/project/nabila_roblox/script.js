/* =========================
FILE : script.js
========================= */

$(document).ready(function(){

  // =========================
  // VARIABEL
  // =========================

  let historySearch = [];

  // =========================
  // JQUERY EVENT BUTTON
  // =========================

  $("#searchBtn").click(function(){

    let username = $("#username").val().trim();

    // BLOK KONDISIONAL
    if(username === ""){

      $("#result").html(`
        <div class="error">
          Username tidak boleh kosong!
        </div>
      `);

    } else {

      searchPlayer(username);

    }

  });

  // ENTER KEY SEARCH
  $("#username").keypress(function(event){

    if(event.which == 13){

      $("#searchBtn").click();

    }

  });

  // =========================
  // FUNGSI SEARCH PLAYER
  // =========================

  function searchPlayer(username){

    $("#loading").show();
    $("#result").html("");

    // Simpan history
    saveHistory(username);

    // =========================
    // AJAX
    // =========================

    $.ajax({

      url: "https://api.agify.io/?name=" + username,
      method: "GET",

      success: function(data){

        $("#loading").hide();

        // KONDISIONAL
        let statusPlayer;

        if(data.age >= 30){

          statusPlayer = `
            <span class="badge online">
              Pro Player
            </span>
          `;

        } else {

          statusPlayer = `
            <span class="badge offline">
              Beginner Player
            </span>
          `;

        }

        // RANDOM AVATAR ROBLOX STYLE
        let avatar =
        "https://robohash.org/" + username + ".png?set=set2";

        // =========================
        // JQUERY + DOM
        // =========================

        $("#result").html(`

          <div class="card">

            <img src="${avatar}" class="avatar">

            <h2 class="player-name">
              ${username}
            </h2>

            <div class="info">
              <b>Prediksi Umur:</b> ${data.age}
            </div>

            <div class="info">
              <b>Total Data:</b> ${data.count}
            </div>

            <div class="info">
              <b>Status:</b>
              ${statusPlayer}
            </div>

          </div>

        `);

      },

      error:function(){

        $("#loading").hide();

        $("#result").html(`
          <div class="error">
            Gagal mengambil data API!
          </div>
        `);

      }

    });

  }

  // =========================
  // FUNGSI HISTORY
  // =========================

  function saveHistory(username){

    // variabel
    historySearch.unshift(username);

    // hapus duplikat
    historySearch = [...new Set(historySearch)];

    // maksimal 5 history
    historySearch = historySearch.slice(0,5);

    $("#historyList").html("");

    historySearch.forEach(function(item){

      $("#historyList").append(`
        <li>${item}</li>
      `);

    });

  }

  // =========================
  // EVENT CLICK HISTORY
  // =========================

  $(document).on("click", "#historyList li", function(){

    let selectedName = $(this).text();

    $("#username").val(selectedName);

    searchPlayer(selectedName);

  });

});