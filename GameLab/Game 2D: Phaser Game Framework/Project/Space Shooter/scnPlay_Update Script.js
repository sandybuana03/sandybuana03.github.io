// scnPlay
// update script
function update() {
    
    if(this.isGameRunning){
        //mengakses array BG Bottom untuk digerakkan dan dihapus jika sudah tidak terlihat di layar ===================
        for (let i = 0; i < this.arrBgBottom.length; i++) {
            this.arrBgBottom[i].y += this.arrBgBottom[i].getData('kecepatan');
            if (this.arrBgBottom[i].y >= game.canvas.height + this.bgBottomSize.height / 2) {
                this.addBGBottom();
    
                this.arrBgBottom[i].destroy();
                this.arrBgBottom.splice(i, 1);
                break;
            }
        }
    
        //melakukan pengecekan tombol arah pada keyboard yang sedang ditekan ===================
    
        // melakukan pengecekan apabila tombol keyboard arah 'KIRI' sedang ditekan, dan
        // apabila nilai pada posisi 'x' pesawat hero lebih dari 70
        if (this.cursorsKeyListener.left.isDown && this.heroShip.x > 70) {
            // menggerakkan pesawat ke kiri sejauh 7 piksel
            this.heroShip.x -= 7;
        }
    
        // melakukan pengecekan apabila tombol keyboard arah 'KANAN' sedang ditekan, dan
        // apabila nilai pada posisi 'x' pesawat hero kurang dari lebar layar dikurangi 70
        if (this.cursorsKeyListener.right.isDown && this.heroShip.x < (X_POSITION.RIGHT - 70)) {
            // menggerakkan pesawat ke kanan sejauh 7 piksel
            this.heroShip.x += 7;
        }
    
        // melakukan pengecekan apabila tombol keyboard arah 'ATAS' sedang ditekan, dan
        // apabila nilai pada posisi 'y' pesawat hero lebih dari 70
        if (this.cursorsKeyListener.up.isDown && this.heroShip.y > 70) {
            // menggerakkan pesawat naik sejauh 7 piksel
            this.heroShip.y -= 7;
        }
    
        // melakukan pengecekan apabila tombol keyboard arah 'BAWAH' sedang ditekan, dan
        // apabila nilai pada posisi 'y' pesawat hero kurang dari tinggi layar dikurangi 70
        if (this.cursorsKeyListener.down.isDown && this.heroShip.y < (Y_POSITION.BOTTOM - 70)) {
            // menggerakkan pesawat turun sejauh 7 piksel
            this.heroShip.y += 7;
        }
    
        // membuat musuh selalu bergerak dengan
        // mengakses fungsi 'move' lalu memanggilnya 
        for (let i = 0; i < this.arrEnemies.length; i++) {
            this.arrEnemies[i].move();
            // manajemen memori supaya semakin lama tidak semakin berat
            // menghapus jika musuh sudah tidak active lagi
            for (let i = 0; i < this.arrEnemies.length; i++) {
                if (!this.arrEnemies[i].active) {
                    this.arrEnemies[i].destroy();
                    this.arrEnemies.splice(i, 1);
                    break;
                }
            }
        }
    
        // membuat peluru selalu bergerak
        for (let i = 0; i < this.arrBullets.length; i++) {
            this.arrBullets[i].move();
    
            // manajemen memori supaya semakin lama, game tidak semakin
            // berat dengan cara menghapus peluru dari scene jika sudah tidak active lagi
            for (let i = 0; i < this.arrBullets.length; i++) {
                // melakukan cek apabila kondisi
                // peluru sedang aktif atau tidak
                if (!this.arrBullets[i].active) {
                    // menghapus objekk peluru dari memori dan scene 
                    this.arrBullets[i].destroy();
    
                    // menhapus tampungan peluru yang di hapus
                    this.arrBullets.splice(i, 1);
                    break;
                }
            }
    
        }
    
        // mendeteksi ketika peluru hero terkena musuh =======
    
        // mengakses array penampung pesawat musuh dengan perulangan for
        for (let i = 0; i < this.arrEnemies.length; i++) {
            // mengakses array penampung peluru pesawat hero dengan perulangan for
            for (let j = 0; j < this.arrBullets.length; j++) {
                // melakukan cek apakah terdapat peluru di area badan pesawat musuh
                if (this.arrEnemies[i].getBounds().contains(this.arrBullets[j].x, this.arrBullets[j].y)) {
                    // menambahkan nilai ke dalam variabel penampung skor sebanyak 1
                    this.scoreValue++;
    
                    // menampilkan jumlah skor yang sudah ditampung dengan
                    // menggunakan objek teks bernama scoreLabel
                    this.scoreLabel.setText(this.scoreValue);
    
                    // memainkan sound efek ledakan setiap kali
                    // terdeteksi kalau peluru bertabrakan dengan pesawat musuh
                    fx_explode.play();
    
                    // mengubah status dari musuh menjadi tidak aktif
                    this.arrEnemies[i].setActive(false);
    
                    // mengubah status dari peluru menjadi tidak aktif
                    this.arrBullets[j].setActive(false);
    
                    // mengatur posisi dari emmitter1 dan emmitter2 supaya
                    // berpindah ke titik posisi dari peluru yang menabrak musuh
                    this.emmiterExplode1.setPosition(this.arrBullets[j].x, this.arrBullets[j].y);
                    this.emmiterExplode2.setPosition(this.arrBullets[j].x, this.arrBullets[j].y);
    
    
                    // mengatur posisi dari emmitter1 dan emmitter2 supaya
                    // berpindah ke titik posisi dari peluru yang menabrak musuh
                    this.emmiterExplode1.explode();
                    this.emmiterExplode2.explode();
    
                    // mengehentikan perulangan untuk mengakses array penampung peluru
                    break;
                }
                if (this.heroShip.getBounds().contains(this.arrEnemies[i].x, this.arrEnemies[i].y)) {
                    
                    
                    // memainkan sound efek ledakan setiap kali
                    // terdeteksi kalau peluru bertabrakan dengan pesawat musuh
                    fx_explode.play();
    
                    // mengubah status dari musuh menjadi tidak aktif
                    this.arrEnemies[i].setActive(false);
                    
                    this.arrEnemies[i].destroy();
                    this.arrEnemies.splice(i, 1);
                    
                      // mengubah status dari peluru menjadi tidak aktif
                    this.arrBullets[j].setActive(false);
                    
                    // menghapus objekk peluru dari memori dan scene 
                    this.arrBullets[j].destroy();
    
                    // menhapus tampungan peluru yang di hapus
                    this.arrBullets.splice(i, 1);
    
                    // mengatur posisi dari emmitter1 dan emmitter2 supaya
                    // berpindah ke titik posisi dari peluru yang menabrak musuh
                    this.emmiterExplode1.setPosition(this.heroShip.x, this.heroShip.y);
                    this.emmiterExplode2.setPosition(this.heroShip.x, this.heroShip.y);
    
                    this.isGameRunning = false;
                    
                    let myScene = this;
                    
                    setTimeout(function() {
                        myScene.scene.start('scnGameOver');
                    }, 500);
    
                    // mengatur posisi dari emmitter1 dan emmitter2 supaya
                    // berpindah ke titik posisi dari peluru yang menabrak musuh
                    this.emmiterExplode1.explode();
                    this.emmiterExplode2.explode();
    
                    // mengehentikan perulangan untuk mengakses array penampung peluru
                    break;
                }
            }
        }
    }
}