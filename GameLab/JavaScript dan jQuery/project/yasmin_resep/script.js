$(document).ready(function(){

    // Variabel
    let apiURL = "https://www.themealdb.com/api/json/v1/1/search.php";

    // jQuery Event
    $("#searchBtn").click(function(){
        cariResep();
    });

    // Fungsi
    function cariResep(){
        let namaMakanan = $("#makanan").val();

        // Kondisional
        if(namaMakanan === ""){
            $("#hasil").html("<p>Nama makanan tidak boleh kosong!</p>");
            return;
        }

        // AJAX
        $.ajax({
            url: apiURL,
            method: "GET",
            data: {
                s: namaMakanan
            },
            success: function(response){

                $("#hasil").html("");

                if(response.meals === null){
                    $("#hasil").html("<p>Resep tidak ditemukan!</p>");
                } else {

                    // jQuery + DOM
                    response.meals.forEach(function(meal){
                        $("#hasil").append(`
                            <div class="card">
                                <img src="${meal.strMealThumb}" alt="meal">
                                <h3>${meal.strMeal}</h3>
                                <p>Kategori: ${meal.strCategory}</p>
                                <p>Asal: ${meal.strArea}</p>
                                <p><b>Instruksi:</b> ${meal.strInstructions.substring(0,150)}...</p>
                            </div>
                        `);
                    });

                }
            },
            error: function(){
                $("#hasil").html("<p>Terjadi kesalahan saat mengambil data.</p>");
            }
        });
    }

});