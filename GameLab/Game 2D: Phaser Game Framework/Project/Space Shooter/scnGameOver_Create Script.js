// scnGameOver
// create script

function create() {

    // Menambahkan backdrop
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'BGPilihPesawat');

    // Menambahkan judul Game
    var titleGame = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER - 150, 'gameOver');

    // Menambahkan tombol Play
    var buttonPlay = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 150, 'ButtonMenu');

    // menjadikan tombol Play bisa dikenai interaksi (klik, dihover dengan mouse)
    buttonPlay.setInteractive();
    
     let isMusicActive = localStorage['music_enabled'] || 1;

    // mengecek nilai yang ditampung dari variabel 'soundstate'
    if (isMusicActive == 1) {

        // mengubah volume dari sound 'snd_touch' menjadi '1'
        // jika tampilan tombol sound adalah 'On'
        music.stop();
        music = this.sound.add("music_gameover");
        music.play();
    }
    

    // ============= Menambahkan Deteksi Input klik Mouse dan pergerakan pada Mouse  =============
    this.input.on('gameobjectover', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectover' adalah buttonPlay
        if (gameObject == buttonPlay) {
            buttonPlay.setTint(0x999999);
        }
        // melakukan cek jika game objek yang sedang terkena
       
    }, this);

    this.input.on('gameobjectout', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectout' adalah buttonPlay
        if (gameObject == buttonPlay) {
            buttonPlay.setTint(0xffffff);
        }
        // melakukan cek jika game objek yang sedang terkena
       
    }, this);

    this.input.on('gameobjectdown', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectdown' adalah buttonPlay
        if (gameObject == buttonPlay) {
            buttonPlay.setTint(0x999999);
        }
       
    }, this);

    this.input.on('gameobjectup', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectup' adalah buttonPlay
        if (gameObject == buttonPlay) {
            buttonPlay.setTint(0xffffff);

            // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();

            // memanggil Scene Play untuk dijalankan
            //this.scene.start("scnPlay");

            // memanggil Scene Choose Hero untuk dijalankan
            this.scene.start("scnMenu");
            
             if (isMusicActive == 1) {
                // mengubah volume dari sound 'snd_touch' menjadi '1'
                // jika tampilan tombol sound adalah 'On'
                music.stop();
                music = this.sound.add("music_menu");
                music.play();
            }
        }
    }, this);
}