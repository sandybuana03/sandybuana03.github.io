$(document).ready(function(){

    // Variabel
    let memeUrl = "";

    // Fungsi ambil meme dari API
    function getMeme(){

        $.ajax({
            url: "https://api.imgflip.com/get_memes",
            method: "GET",

            success: function(response){

                let memes = response.data.memes;

                // Random meme
                let randomIndex = Math.floor(Math.random() * memes.length);

                memeUrl = memes[randomIndex].url;

                $("#memeImage").attr("src", memeUrl);
            }
        });
    }

    // jQuery Event
    $("#loadMeme").click(function(){
        getMeme();
    });

    // Generate text meme
    $("#generateText").click(function(){

        let top = $("#topText").val();
        let bottom = $("#bottomText").val();
        let color = $("#colorText").val();

        // Blok Kondisional
        if(top == "" || bottom == ""){
            alert("Text tidak boleh kosong!");
        } else {

            // jQuery + DOM
            $("#textTop").text(top);
            $("#textBottom").text(bottom);

            $("#textTop").css("color", color);
            $("#textBottom").css("color", color);
        }
    });

});