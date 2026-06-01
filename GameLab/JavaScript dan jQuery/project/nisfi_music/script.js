$(document).ready(function(){

    // EVENT CLICK
    $("#btnSearch").click(function(){
      searchMusic();
    });
  
    // EVENT ENTER
    $("#keyword").keypress(function(e){
      if(e.which == 13){
        searchMusic();
      }
    });
  
    // FUNCTION
    function searchMusic(){
  
      // VARIABEL
      let keyword = $("#keyword").val();
  
      // KONDISIONAL
      if(keyword == ""){
        $("#result").html(`
          <p class="message">
            Masukkan nama artis terlebih dahulu
          </p>
        `);
  
        return;
      }
  
      $("#result").html(`
        <p class="message">Loading...</p>
      `);
  
      // AJAX
      $.ajax({
        url: "https://itunes.apple.com/search",
        method: "GET",
        dataType: "jsonp",
  
        data:{
          term: keyword,
          entity: "song",
          limit: 12
        },
  
        success:function(response){
  
          // KONDISIONAL
          if(response.results.length == 0){
  
            $("#result").html(`
              <p class="message">
                Data tidak ditemukan
              </p>
            `);
  
          }else{
  
            // DOM MANIPULATION
            $("#result").html("");
  
            $.each(response.results, function(i, music){
  
              $("#result").append(`
  
                <div class="card">
  
                  <img src="${music.artworkUrl100.replace('100x100','600x600')}">
  
                  <div class="card-body">
  
                    <div class="artist">
                      ${music.artistName}
                    </div>
  
                    <div class="song">
                      🎵 ${music.trackName}
                    </div>
  
                    <div class="genre">
                      Genre: ${music.primaryGenreName}
                    </div>
  
                    <audio controls style="width:100%">
                      <source src="${music.previewUrl}">
                    </audio>
  
                  </div>
  
                </div>
  
              `);
  
            });
  
          }
  
        },
  
        error:function(){
  
          $("#result").html(`
            <p class="message">
              Terjadi kesalahan
            </p>
          `);
  
        }
  
      });
  
    }
  
  });