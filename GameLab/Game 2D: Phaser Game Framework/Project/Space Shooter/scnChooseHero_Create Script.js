// scnChooseHero
// create script

function create() {
    // menambahkan backdrop atau latar untuk scene pilih pesawat hero
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'BGPilihPesawat');

    // menambahkan tombol Menu
    var buttonMenu = this.add.image(50, 50, 'ButtonMenu');

    // menambahkan tombol Next
    var buttonNext = this.add.image(X_POSITION.CENTER + 250, Y_POSITION.CENTER, 'ButtonNext');

    // menambahkan tombol Play
    var buttonPrevious = this.add.image(X_POSITION.CENTER - 250, Y_POSITION.CENTER, 'ButtonPrev');

    // Menambahkan pesawat Hero berdasarkan dengan hero yang sedang aktif
    var heroShip = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'Pesawat' + (currentHero + 1));

    // membuat tombol Menu bisa dikenai interaksi
    buttonMenu.setInteractive();

    // membuat tombol Next bisa dikenai interaksi
    buttonNext.setInteractive();

    // membuat tombol Previous bisa dikenai interaksi
    buttonPrevious.setInteractive();

    // membuat pesawat hero bisa dikenai interaksi
    heroShip.setInteractive();

    // event listener 'gameobjectover'
    this.input.on('gameobjectover', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectover' adalah button buttonMenu
        if (gameObject == buttonMenu) {
            buttonMenu.setTint(0x999999);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectover' adalah button buttonNext
        if (gameObject == buttonNext) {
            buttonNext.setTint(0x999999);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectover' adalah button buttonPrevious
        if (gameObject == buttonPrevious) {
            buttonPrevious.setTint(0x999999);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectover' adalah heroShip
        if (gameObject == heroShip) {
            heroShip.setTint(0x999999);
        }

    }, this);

    // event listener 'gameobjectdown'
    this.input.on('gameobjectdown', function(pointer, gameObject) {
        if (gameObject == buttonMenu) {
            buttonMenu.setTint(0x999999);
        }

        if (gameObject == buttonNext) {
            buttonNext.setTint(0x999999);
        }

        if (gameObject == buttonPrevious) {
            buttonPrevious.setTint(0x999999);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectdown' adalah heroShip
        if (gameObject == heroShip) {
            heroShip.setTint(0x999999);
        }
    }, this);

    // event listener 'gameobjectout'
    this.input.on('gameobjectout', function(pointer, gameObject) {
        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectout' adalah button buttonMenu
        if (gameObject == buttonMenu) {
            buttonMenu.setTint(0xffffff);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectout' adalah button buttonNext
        if (gameObject == buttonNext) {
            buttonNext.setTint(0xffffff);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectout' adalah button buttonPrevious
        if (gameObject == buttonPrevious) {
            buttonPrevious.setTint(0xffffff);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectout' adalah button buttonMenu
        if (gameObject == buttonMenu) {
            buttonMenu.setTint(0xffffff);
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectout' adalah heroShip
        if (gameObject == heroShip) {
            heroShip.setTint(0xffffff);
        }
    }, this);

    // event listener 'gameobjectup'
    this.input.on('gameobjectup', function(pointer, gameObject) {

        if (gameObject == buttonMenu) {
            // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();
            
            buttonMenu.setTint(0xffffff);
            this.scene.start("scnMenu");

        }

        if (gameObject == buttonNext) {
            // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();
            
            buttonNext.setTint(0xffffff);
            currentHero++;
            if (currentHero >= countHero) {
                currentHero = 0;
            }

            heroShip.setTexture('Pesawat' + (currentHero + 1))
        }

        if (gameObject == buttonPrevious) {
            // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();
            
            buttonPrevious.setTint(0xffffff);
            currentHero--;
            if (currentHero < 0) {
                currentHero = (countHero - 1);
            }

            heroShip.setTexture('Pesawat' + (currentHero + 1))
        }

        // melakukan cek jika game objek yang sedang terkena
        // listener 'gameobjectup' adalah heroShip
        if (gameObject == heroShip) {
            heroShip.setTint(0xffffff);
            
            // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();
            this.scene.start("scnPlay");
        }

    }, this);

}