$(document).ready(function(){

    let page = Math.floor(Math.random() * 100);

    let loading = false;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    updateFavoriteCount();

    // LOAD PHOTO
    function loadPhotos(reset=false){

        if(loading) return;

        loading = true;

        $("#loading").fadeIn();

        let limit = $("#photoLimit").val();

        // KONDISIONAL
        if(limit < 1 || limit > 20){
            alert("Jumlah foto harus 1 - 20");
            $("#loading").hide();
            return;
        }

        // RESET GALLERY
        if(reset){

            $("#gallery").html("");

            // halaman random baru
            page = Math.floor(Math.random() * 100);

        }

        // AJAX
        $.ajax({

            url:`https://picsum.photos/v2/list?page=${page}&limit=${limit}`,

            method:"GET",

            success:function(data){

                $("#loading").fadeOut();

                data.forEach(function(photo){

    let randomWidth = 500 + Math.floor(Math.random() * 300);

    let randomHeight = 300 + Math.floor(Math.random() * 300);

                    let card = `
                    
                    <div class="col-md-4">

                        <div class="card-gallery">

                                 
                            <img src="https://picsum.photos/id/${photo.id}/600/400"

                                class="img-fluid preview-img"
                                 data-src="${photo.download_url}">

                            <div class="card-body">

                                <h5>${photo.author}</h5>

                                <p class="text-secondary">
                                    Random Photo Gallery
                                </p>

                                <div class="action-buttons">

                                    <button class="favorite-btn"
                                            data-id="${photo.id}"
                                            data-author="${photo.author}"
                                            data-url="${photo.download_url}">

                                        <i class="bi bi-heart-fill"></i>

                                    </button>

                                    <a href="${photo.download_url}"
                                       download
                                       target="_blank"
                                       class="download-btn">

                                        <i class="bi bi-download"></i>

                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>
                    `;

                    $("#gallery").append(card);

                });

                loading = false;

            },

            error:function(){

                $("#loading").fadeOut();

                alert("Gagal mengambil data!");

                loading = false;

            }

        });

    }

    // LOAD AWAL
    loadPhotos();

    // BUTTON LOAD
    $("#loadBtn").click(function(){

        loadPhotos(true);

    });

    // DARK MODE
    $("#darkModeBtn").click(function(){

        $("body").toggleClass("dark-mode");

    });

    // PREVIEW IMAGE
    $(document).on("click",".preview-img",function(){

        let src = $(this).data("src");

        $("#modalImage").attr("src",src);

        $("#imageModal").modal("show");

    });

    // FAVORITE
    $(document).on("click",".favorite-btn",function(){

        let photo = {

            id:$(this).data("id"),
            author:$(this).data("author"),
            url:$(this).data("url")

        };

        // KONDISIONAL
        let exists = favorites.find(f => f.id == photo.id);

        if(exists){

            alert("Foto sudah ada di favorit!");

        }else{

            favorites.push(photo);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            updateFavoriteCount();

            Toastify({
                text: "Berhasil ditambahkan ke favorit",
                duration: 2000
            }).showToast();

        }

    });

    // UPDATE FAVORITE COUNT
    function updateFavoriteCount(){

        $("#favoriteCount").text(favorites.length);

    }

    // TAMPILKAN FAVORIT
    $('#favoriteModal').on('show.bs.modal', function () {

        $("#favoriteGallery").html("");

        if(favorites.length == 0){

            $("#favoriteGallery").html(`
                <p class="text-center">
                    Belum ada foto favorit
                </p>
            `);

        }

favorites.forEach(function(item){

    $("#favoriteGallery").append(`

        <div class="col-md-4">

            <div class="card-gallery">

                <img src="${item.url}"
                     class="img-fluid">

                <div class="card-body">

                    <h6>${item.author}</h6>

                    <button class="btn btn-danger w-100 remove-favorite"
                            data-id="${item.id}">

                        <i class="bi bi-trash"></i>
                        Hapus

                    </button>

                </div>

            </div>

        </div>

    `);

});

    });

    // INFINITE SCROLL
    $(window).scroll(function(){

        if(
            $(window).scrollTop() + $(window).height()
            >= $(document).height() - 200
        ){

            page++;

            loadPhotos();

        }

    });

    // HAPUS FAVORIT
$(document).on("click", ".remove-favorite", function(){

    let id = $(this).data("id");

    // filter data
    favorites = favorites.filter(function(item){

        return item.id != id;

    });

    // update localStorage
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    // update jumlah favorit
    updateFavoriteCount();

    // reload isi modal favorit
    $("#favoriteGallery").html("");

    favorites.forEach(function(item){

        $("#favoriteGallery").append(`

            <div class="col-md-4">

                <div class="card-gallery">

                    <img src="${item.url}"
                         class="img-fluid">

                    <div class="card-body">

                        <h6>${item.author}</h6>

                        <button class="btn btn-danger w-100 remove-favorite"
                                data-id="${item.id}">

                            <i class="bi bi-trash"></i>
                            Hapus

                        </button>

                    </div>

                </div>

            </div>

        `);

    });

});

});