// scnPlay
// create script
function create() {

    // menambahkan sebuah variabel array dengan nama 'arrEnemy' untuk
    // yang nantinya akan digunakan untuk menampung musuh-musuh yang
    // sudah ditambahkan ke dalam game.
    this.arrEnemies = [];

    // menambahkan sebuah variabel array dengan nama 'arrMusuh' untuk
    // yang nantinya akan digunakan untuk menampung musuh-musuh yang
    // sudah ditambahkan ke dalam game.
    this.arrBullets = [];

    // Membuat variabel penampung skor
    // menambahkan nilai 0 sebagai nilai awal pengisi variabel skor
    this.scoreValue = 0;
    
    let isMusicActive = localStorage['music_enabled'] || 1;
            
    // mengecek nilai yang ditampung dari variabel 'soundstate'
    if (isMusicActive == 1)
    {
        // mengubah volume dari sound 'snd_touch' menjadi '1'
        // jika tampilan tombol sound adalah 'On'
        music.stop(); 
    
        music = this.sound.add('music_play');
        music.play();
    }

    this.isGameRunning = true;
    // Sound Efek ======================
    
    // // menambahkan variabel sound efek menembak
    // this.fx_shoot = this.sound.add('fx_shoot');
    
    // // menambahkan variabel sound efek meledak
    // this.fx_explode = this.sound.add('fx_explode');
    


    // Membuat background pada lapisan paling bawah sendiri ======================

    // menentukan index atau urutan tekstur/gambar
    // background secara acak dari 1 sampai di 3
    this.lastBGIndex = Phaser.Math.Between(1, 3);

    // membuat penampung data ukuran gambar
    // background pada lapisan paling bawah sendiri
    this.bgBottomSize = {
        'width': 768,
        'height': 1664
    };

    // array untuk menampung semua background lapisan bawah
    this.arrBgBottom = [];

    // fungsi dengan parameter posisi x dan posisi y untuk
    // membuat background pada lapisan paling bawah sendiri
    this.createBGBottom = function(xPos, yPos) {
        let bgBottom = this.add.image(xPos, yPos, 'BG' + this.lastBGIndex);
        bgBottom.setData('kecepatan', 3);
        bgBottom.setDepth(1);
        bgBottom.flipX = Phaser.Math.Between(0, 1);
        this.arrBgBottom.push(bgBottom);

        // menambahkan background transisi di posisi paling atas backgrund apabila index/urutan tekstur
        // background sebelumnya berbeda dengan background baru yang akan ditambahkan
        let newBgIndex = Phaser.Math.Between(1, 3);
        if (newBgIndex != this.lastBGIndex) {
            let bgBottomAddition = this.add.image(xPos, yPos - this.bgBottomSize.height / 2, 'Transisi');
            bgBottomAddition.setData('kecepatan', 3);
            bgBottomAddition.setData('tambahan', true);
            bgBottomAddition.setDepth(2);
            bgBottomAddition.flipX = Phaser.Math.Between(0, 1);
            this.arrBgBottom.push(bgBottomAddition);
        }

        // menampung index/urutan tekstur background yang baru saja dibuat
        // untuk dibandingkan pada penambahan background berikutnya
        this.lastBGIndex = newBgIndex;
    };

    // fungsi untuk menentukan posisi dari
    // background paling bawah sendiri, jadi untuk
    // membuat background baru tinggal memanggil fungsi ini
    this.addBGBottom = function() {
        if (this.arrBgBottom.length > 0) {
            let lastBG = this.arrBgBottom[this.arrBgBottom.length - 1];
            if (lastBG.getData('tambahan')) {
                lastBG = this.arrBgBottom[this.arrBgBottom.length - 2];
            }

            this.createBGBottom(game.canvas.width / 2, lastBG.y - this.bgBottomSize.height);
        } else {
            this.createBGBottom(game.canvas.width / 2, game.canvas.height - this.bgBottomSize.height / 2);
        }
    };

    // membuat 3 background pada lapisan paling bawah sendiri
    // dengan cukup memanggil fungsi 'addBGBottom' sebanyak 3 kali
    this.addBGBottom();
    this.addBGBottom();
    this.addBGBottom();

    // Membuat background lapisan bagian atas ====================== 

    // membuat penampung data ukuran gambar awan
    this.bgCloudSize = {
        'width': 768,
        'height': 1962
    };

    // array untuk menampung semua background lapisan atas
    this.arrBgTop = [];

    // fungsi dengan parameter posisi x dan posisi y untuk
    // membuat background pada lapisan paling atas sendiri, yakni awan
    this.createBGTop = function(xPos, yPos) {
        var bgTop = this.add.image(xPos, yPos, 'Cloud');
        bgTop.setData('kecepatan', 6);
        bgTop.setDepth(5);
        bgTop.flipX = Phaser.Math.Between(0, 1);
        bgTop.setAlpha(Phaser.Math.Between(4, 7) / 10);
        this.arrBgTop.push(bgTop);
    };

    // fungsi untuk menentukan posisi dari background paling atas sendiri, 
    // jadi untuk membuat background paling atas baru tinggal memanggil fungsi ini
    this.addBGTop = function() {
        if (this.addBGTop.length > 0) {
            let lastBG = this.arrBgTop[this.arrBgTop.length - 1];
            this.createBGTop(game.canvas.width / 2, lastBG.y - this.bgCloudSize.height * Phaser.Math.Between(1, 4));
        } else {
            this.createBGTop(game.canvas.width / 2, -this.bgCloudSize.height);
        }
    };

    // membuat 1 background pada lapisan paling atas
    // dengan cukup memanggil fungsi 'addBGTop' sebanyak 1 kali
    this.addBGTop();


    // Membuat tampilan skor =====================
    this.scoreLabel = this.add.text(X_POSITION.CENTER, Y_POSITION.TOP + 80, '0', {
        // menentukan jenis font yang akan ditampilkan
        fontFamily: 'Verdana, Arial',

        // menentukan ukuran teks
        fontSize: '70px',

        // menentukan warna teks
        color: '#ffffff',

        // menentukan warna dari garis tepi teks
        stroke: '#5c5c5c',

        // menentukan ketebalan dari garis tepi teks
        strokeThickness: 2
    });

    // menentukan titik tumpu dari teks (0.5 berarti di tengah)
    this.scoreLabel.setOrigin(0.5);

    // mengatur posisi di lapisan ke berapa teks akan tampil
    this.scoreLabel.setDepth(100);

    // Menambahkan Pesawat Hero ke dalam Game =====================
    // this.heroShip = this.add.sprite(X_POSITION.CENTER, Y_POSITION.BOTTOM - 200, 'Pesawat1');
    this.heroShip = this.add.sprite(X_POSITION.CENTER, Y_POSITION.BOTTOM - 200, 'Pesawat' + (currentHero + 1));
    this.heroShip.setDepth(4);
    this.heroShip.setScale(0.35);

    // Menyiapkan pendeteksi event untuk tombol arah keyboard (listener arrow key) =======================
    this.cursorsKeyListener = this.input.keyboard.createCursorKeys();

    // mengaktifkan deteksi pergerakan mouse atau touch pada layar
    this.input.on('pointermove', function(pointer, currentlyOver) {
        
        if(this.isGameRunning){
            
            // kode program ketika terdeteksi pergerakan mouse atau touch pada layar
            console.log(pointer);
            console.log("pointer.x : " + pointer.x + "  pointer.y : " + pointer.y);
    
            // membuat variabel penampung posisi baru yang akan dituju oleh pesawat
            // hero, sekaligus mengisi nilai tiap variabel dengan posisi hero terakhir
            let movementX = this.heroShip.x;
            let movementY = this.heroShip.y;
    
            // melakukan pengecekan pergerakan mouse pointer untuk menentukan gerak
            // pesawat hero secara VERTIKAL supaya tetap berada di dalam area layar
            if (pointer.x > 70 && pointer.x < (X_POSITION.RIGHT - 70)) {
                movementX = pointer.x;
            } else {
                if (pointer.x <= 70) {
                    movementX = 70;
                } else {
                    movementX = (X_POSITION.RIGHT - 70);
                }
            }
    
    
            // melakukan pengecekan pergerakan mouse pointer untuk menentukan gerak
            // pesawat hero secara HORIZONTAL supaya tetap berada di dalam area layar
            if (pointer.y > 70 && pointer.y < (Y_POSITION.BOTTOM - 70)) {
                movementY = pointer.y;
            } else {
                if (pointer.y <= 70) {
                    movementY = 70;
                } else {
                    movementY = (Y_POSITION.BOTTOM - 70);
                }
            }
    
            // menentukan jarak antara titik hero dengan titik tujuan gerak
            let a = this.heroShip.x - movementX;
            let b = this.heroShip.y - movementY;
    
            // menentukan durasi meluncur berdasarkan jarak yang sudah didapat
            let durationToMove = Math.sqrt(a * a + b * b) * 0.8;
    
            // animasi meluncur ke titik koordinat posisi pointer
            this.tweens.add({
                targets: this.heroShip,
                x: movementX,
                y: movementY,
                duration: durationToMove,
            });
    
            // memindahkan posisi Pesawat Hero menuju posisi
            // baru yang sudah ditentukan di dalam pengecekan
            this.heroShip.x = movementX;
            this.heroShip.y = movementY;
        }
    }, this);

    // Menambahkan beberapa titik posisi untuk membuat POLA Kiri A
    let pointA = [];
    pointA.push(new Phaser.Math.Vector2(-200, 100));
    pointA.push(new Phaser.Math.Vector2(250, 200));
    pointA.push(new Phaser.Math.Vector2(200, (Y_POSITION.BOTTOM + 200) / 2));
    pointA.push(new Phaser.Math.Vector2(200, Y_POSITION.BOTTOM + 200));

    // Menambahkan beberapa titik posisi untuk membuat POLA Kanan A
    let pointB = [];
    pointB.push(new Phaser.Math.Vector2(900, 100));
    pointB.push(new Phaser.Math.Vector2(550, 200));
    pointB.push(new Phaser.Math.Vector2(500, (Y_POSITION.BOTTOM + 200) / 2));
    pointB.push(new Phaser.Math.Vector2(500, Y_POSITION.BOTTOM + 200));

    // Menambahkan beberapa titik posisi untuk membuat POLA Kanan B
    let pointC = [];
    pointC.push(new Phaser.Math.Vector2(900, 100));
    pointC.push(new Phaser.Math.Vector2(550, 200));
    pointC.push(new Phaser.Math.Vector2(400, (Y_POSITION.BOTTOM + 200) / 2));
    pointC.push(new Phaser.Math.Vector2(0, Y_POSITION.BOTTOM + 200));

    // Menambahkan beberapa titik posisi untuk membuat POLA Kiri B
    let pointD = [];
    pointD.push(new Phaser.Math.Vector2(-200, 100));
    pointD.push(new Phaser.Math.Vector2(550, 200));
    pointD.push(new Phaser.Math.Vector2(650, (Y_POSITION.BOTTOM + 200) / 2));
    pointD.push(new Phaser.Math.Vector2(0, Y_POSITION.BOTTOM + 200));


    // Menampung pola-pola yang sudah ditambahkan
    // ke dalam sebuah array bernama 'points'
    var points = [];
    points.push(pointA);
    points.push(pointB);
    points.push(pointC);
    points.push(pointD);


    // membuat sebuah Class dengan nama Enemy yang nantinya akan 
    // digunakan berulang-ulang untuk membuat objek musuh.
    var Enemy = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:


            // fungsi utama di dalam Class 'Enemy' yang digunakan untuk
            // membuat dan menambahkan sprite musuh ke dalam game.
            // terdapat parameter 'scene' dan 'idxPath' yang digunakan
            // untuk menentukan parent dan urutan pola pergerakan dari musuh
            function Enemy(scene, idxPath) {

                // menambahkan objek baru dengan Class 'Enemy' ke dalam game
                Phaser.GameObjects.Image.call(this, scene);

                // mengatur tampilan/tekstur dari objek musuh
                // secara acak berdasarkan aset yang sudah
                // diupload (3 gambar musuh, yakni Musuh1, Musuh2 dan Musuh3)
                this.setTexture('Musuh' + Phaser.Math.Between(1, 3));

                // mengatur urutan tampilan objek musuh berada di lapisan ke-berapa
                this.setDepth(4);

                // mengatur ukuran dari musuh yang ditampilkan di game
                this.setScale(0.35);

                this.curve = new Phaser.Curves.Spline(points[idxPath]);


                // membuat musuh bergerak sesuai dengan pola atau path
                // 'sesuai indexPath' yang di sertakan dalam parameter
                // selama 3 detik
                let lastEnemyCreated = this;
                this.path = {
                    t: 0,
                    vec: new Phaser.Math.Vector2()
                };
                scene.tweens.add({
                    targets: this.path,
                    t: 1,
                    duration: 3000,
                    onCompleteParams: (lastEnemyCreated),
                    onComplete: function() {
                        if (lastEnemyCreated) {
                            lastEnemyCreated.setActive(false);
                        }
                    }
                });
            },


        // membuat fungsi biasa di dalam Class 'Enemy' dengan nama 'move'
        // yang nantinya digunakan untuk menggerakkan musuh
        move: function() {
            this.curve.getPoint(this.path.t, this.path.vec);

            this.x = this.path.vec.x;
            this.y = this.path.vec.y;
        }
    });

    // membuat sebuah Class dengan nama Bullet yang nantinya akan 
    // digunakan berulang-ulang untuk membuat objek peluru.
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

            // fungsi utama untuk membuat objek peluru ketika 'Class dipanggil
            function Bullet(scene, x, y) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'Peluru');
                this.setDepth(3);
                this.setPosition(x, y);
                this.setScale(0.5);

                // menentukan kecepatan pergerakan dari peluru yang
                // ditampung di dalam Class, yakni 20000 piksel tiap detik
                this.speed = Phaser.Math.GetSpeed(20000, 1);
            },

        // fungsi tambahan dengan nama "move" yang nantinya
        // akan digunakan untuk menggerakkan peluru
        move: function() {
            // memindahkan posisi 'y' peluru untuk
            // membuat peluru dapat bergerak naik
            this.y -= this.speed;

            // melakukan pengecekan batas untuk
            // bergerak paling atas untuk peluru.
            if (this.y < -50) {
                // mengganti status dari objek peluru menjadi
                // tidak aktif (hanya menandai saja)
                this.setActive(false);
            }
        }

    });


    // menambahkan fungsi yang akan terpanggil setiap 1/4 detik sekali (250 mili detik)
    this.time.addEvent({
        delay: 250,
        callback: function() {
            // setiap kode program yang ada di dalam sini
            // akan terpanggil setiap 1/4 detik sekali
            
            // memainkan sound efek tembakan setiap 1/4 detik sekali
            // berbarengan dengan munculnya peluru dari pesawat hero
            fx_shoot.play();

            // menambahkan peluru sekaligus menampung peluru yang ditambahkan ke dalam array 'arrBullets' berdadsarkan
            // Class template dengan nama 'Bullet' yang sudah dibuat sebelumnya
            this.arrBullets.push(this.children.add(new Bullet(this, this.heroShip.x, this.heroShip.y - 30)));

            // melakukan pengecekan jika jumlah musuh yang tampil masih di bawah 3
            if (this.arrEnemies.length < 3) {
                // menambahkan musuh sekaligus menampung musuh baru ke dalam array 'arrMusuh' berdadsarkan
                // Class template dengan nama 'Enemy' yang sudah dibuat sebelumnya
                this.arrEnemies.push(this.children.add(new Enemy(this, Phaser.Math.Between(0, points.length - 1))));
            }

        },
        callbackScope: this,
        loop: true
    });

    // membuat objek partikel berdasarkan aset gambar yang sudah ada
    // kemudian menampungnya di dalam variabel 'partikelExplode'
    let partikelExplode = this.add.particles('EfekLedakan');

    // membuat partikel menjadi berada di urutan
    // lapisan yang berada di atasnya pesawat hero maupun musuh
    partikelExplode.setDepth(4);

    // membuat emmitter pertama dan menampungnya ke dalam 
    // variable emmiterExplode1 untuk nanti diakses kembali
    this.emmiterExplode1 = partikelExplode.createEmitter({

        // mengatur kecepatan dari persebaran partikel
        speed: {
            min: -800,
            max: 800
        },

        // mengatur kemiringan dari setiap partikel yang
        // disebar secara acak, dari kemiringan 0 sampai 360
        angle: {
            min: 0,
            max: 360
        },

        // mengatur ukuran dari setiap partikel yang disebar
        // dari awal kemunculan 0.8 sampai 0 ketika keluar
        scale: {
            start: 0.8,
            end: 0
        },

        // menentukan mode penampilan di Layar
        blendMode: 'SCREEN',

        // menentukan lamanya tiap partikel tampil
        lifespan: 200,

        // menentukan warna dasar dari partikel
        tint: 0xffa500
    });

    // mengatur posisi dari partikel, karena ini di
    // fungsi create jadi disembunyikan dulu di titik
    // posisi yang tidak terlihat di layar
    this.emmiterExplode1.setPosition(-100, -100);

    // memerintahkan agar emmitter menjalankan
    // tugasnya untuk pertama kali.
    this.emmiterExplode1.explode();

    // membuat emmitter pertama dan menampungnya ke dalam 
    // variable emmiterExplode2 untuk nanti diakses kembali
    this.emmiterExplode2 = partikelExplode.createEmitter({

        // mengatur kecepatan dari persebaran partikel
        speed: {
            min: -800,
            max: 800
        },

        // mengatur kemiringan dari setiap partikel yang
        // disebar secara acak, dari kemiringan 0 sampai 360
        angle: {
            min: 0,
            max: 360
        },

        // mengatur ukuran dari setiap partikel yang disebar
        // dari awal kemunculan 0.8 sampai 0 ketika keluar
        scale: {
            start: 0.8,
            end: 0
        },

        // menentukan mode penampilan di Layar
        blendMode: 'SCREEN',

        // menentukan lamanya tiap partikel tampil
        lifespan: 200,

        // menentukan warna dasar dari partikel
        tint: 0xffa500
    });

    // mengatur posisi dari partikel, karena ini di
    // fungsi create jadi disembunyikan dulu di titik
    // posisi yang tidak terlihat di layar
    this.emmiterExplode2.setPosition(-100, -100);

    // memerintahkan agar emmitter menjalankan
    // tugasnya untuk pertama kali.
    this.emmiterExplode2.explode();

}