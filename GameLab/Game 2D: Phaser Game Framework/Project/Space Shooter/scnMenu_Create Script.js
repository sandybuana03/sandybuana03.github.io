// scnMenu
// create script

function create() {
    // ===== Melakukan pengisian nilai untuk variabel global ===== //
    X_POSITION =
    {
        'LEFT': 0,
        'CENTER': game.canvas.width / 2,
        'RIGHT': game.canvas.width,
    };
    
    Y_POSITION =
    {
        'TOP': 0,
        'CENTER': game.canvas.height / 2,
        'BOTTOM': game.canvas.height,
    }
    
    
    if (fx_shoot == null)
    {
        // jika nilai dari variabel "snd_touch" masih "null", maka 
        // akan di lakukan pengisian ulang nilai variabel dengan
        // nilai sound yang sesungguhnya, yakni aset sound
        // dengan nama "snd_touch"
        fx_shoot = this.sound.add('fx_shoot');
    }
    
    
    if (fx_explode == null)
    {
        // jika nilai dari variabel "snd_touch" masih "null", maka 
        // akan di lakukan pengisian ulang nilai variabel dengan
        // nilai sound yang sesungguhnya, yakni aset sound
        // dengan nama "snd_touch"
        fx_explode = this.sound.add('fx_explode');
    }

    // cek jika nilai dari variabel "snd_touch" masih "null"
    if (snd_touch == null)
    {
        // jika nilai dari variabel "snd_touch" masih "null", maka 
        // akan di lakukan pengisian ulang nilai variabel dengan
        // nilai sound yang sesungguhnya, yakni aset sound
        // dengan nama "snd_touch"
        snd_touch = this.sound.add('fx_touch');
    }

    if (music == null)
    {
        // jika nilai dari variabel "snd_touch" masih "null", maka 
        // akan di lakukan pengisian ulang nilai variabel dengan
        // nilai sound yang sesungguhnya, yakni aset sound
        // dengan nama "snd_touch"
        music = this.sound.add('music_menu');
        music.play();
    }

    // ===== Membuat Tampilan ===== //
    
    // Menambahkan backdrop
    this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'BGPilihPesawat');
    
    // Menambahkan judul Game
    var titleGame = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER - 150, 'Title');
    
    // Menambahkan tombol Play
    var buttonPlay = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 150, 'ButtonPlay');
    
    // menjadikan tombol Play bisa dikenai interaksi (klik, dihover dengan mouse)
    buttonPlay.setInteractive();
    
    // Menambahkan tombol On ke tampilan Scene Menu
    var buttonSound = this.add.image(X_POSITION.RIGHT - 70, Y_POSITION.BOTTOM - 70, 'ButtonSoundOn');
    buttonSound.setInteractive();
    
    var buttonMusic = this.add.image(X_POSITION.RIGHT - 190, Y_POSITION.BOTTOM - 70, 'ButtonMusicOn');
    buttonMusic.setInteractive();
    
    
    // mengambil data dari database dengan key 'sound_enabled' lalu
    // menampungnya di dalam variabel 'soundState'
    let soundState = localStorage['sound_enabled'] || 1;
    
    // mengecek nilai yang ditampung dari variabel 'soundstate'
    if (soundState == 0)
    {
        // jika nilai dari 'soundState' adalah '0'
        // semua kode program dibawah akan dijalankan
        
        // mengubah tampilan dari tombol 'Sound' dari
        // tampilan 'On' menjadi tampilan 'Off'
        buttonSound.setTexture('ButtonSoundOff');  
        
        // mengubah volume dari sound 'snd_touch' menjadi '0'
        // jika tampilan tombol 'Sound' adalah 'Off'
        snd_touch.setVolume(0); 
        fx_shoot.setVolume(0);
        fx_explode.setVolume(0);
    }
    
    
    let musicState = localStorage['music_enabled'] || 1;
    
    // mengecek nilai yang ditampung dari variabel 'soundstate'
    if (musicState == 0)
    {
        // jika nilai dari 'soundState' adalah '0'
        // semua kode program dibawah akan dijalankan
        
        // mengubah tampilan dari tombol 'Sound' dari
        // tampilan 'On' menjadi tampilan 'Off'
        buttonMusic.setTexture('ButtonMusicOff');  
        
        // mengubah volume dari sound 'snd_touch' menjadi '0'
        // jika tampilan tombol 'Sound' adalah 'Off'
        music.setVolume(0); 
    
    }
    
    // ===== Menambahkan Deteksi Input klik Mouse dan pergerakan pada Mouse
    this.input.on('gameobjectover', function (pointer, gameObject)
    {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectover' adalah buttonPlay
        if (gameObject == buttonPlay)
        {
            buttonPlay.setTint(0x999999);
        }
        
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectover' adalah buttonSound
        if (gameObject == buttonSound) 
        {
            buttonSound.setTint(0x999999);
        }
        
        if (gameObject == buttonMusic) 
        {
            buttonMusic.setTint(0x999999);
        }

        
    }, this);
    
    this.input.on('gameobjectout', function (pointer, gameObject)
    {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectout' adalah buttonPlay
        if (gameObject == buttonPlay)
        {
            buttonPlay.setTint(0xffffff);
        }
        
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectout' adalah buttonSound
        if (gameObject == buttonSound) 
        {
            buttonSound.setTint(0xffffff);
        }
        
        if (gameObject == buttonMusic) 
        {
            buttonMusic.setTint(0xffffff);
        }
    
    
    }, this);
    
    this.input.on('gameobjectdown', function (pointer, gameObject)
    {
    // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectdown' adalah buttonPlay
        if (gameObject == buttonPlay)
        {
            buttonPlay.setTint(0x999999);
        }
        
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectdown' adalah buttonSound
        if (gameObject == buttonSound) 
        {
            buttonSound.setTint(0x999999);
        }
        
        if (gameObject == buttonMusic) 
        {
            buttonMusic.setTint(0x999999);
        }
        
    }, this);
    
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectup' adalah buttonPlay
        if (gameObject == buttonPlay)
        {
            buttonPlay.setTint(0xffffff);
            
             // memainkan sound efek "touch" setiap kali
            // tombol Play yang diklik, dilepas kliknya
            snd_touch.play();
            
            
            // memanggil Scene Choose Hero untuk dijalankan
            this.scene.start("scnChooseHero"); 
        }
        
        // melakukan cek jika game objek yang sedang terkena
        // deteksi listener 'gameobjectup' adalah buttonSound
        if (gameObject == buttonSound) 
        {
            buttonSound.setTint(0xffffff);
            
            // mengambil data dari database dengan key 'sound_enabled' lalu
            // menampungnya di dalam variabel 'soundState'
            let isSoundActive = localStorage['sound_enabled'] || 1;
            
            // mengecek nilai yang ditampung dari variabel 'soundstate'
            if (isSoundActive == 0)
            {
                // jika nilai dari 'soundState' adalah '0'
                // semua kode program dibawah akan dijalankan
                
                // mengubah tampilan dari tombol sound dari
                // menjadi tampilan 'On'
                buttonSound.setTexture('ButtonSoundOn');
                
                // mengubah volume dari sound 'snd_touch' menjadi '1'
                // jika tampilan tombol sound adalah 'On'
                snd_touch.setVolume(1); 
                fx_shoot.setVolume(1);
                fx_explode.setVolume(1);
                
                // mengubah status yang tersimpan di database menjadi '1' 
                localStorage['sound_enabled'] = 1;  
            }
            else
            {
                // jika nilai dari 'soundState' bukan merupakan '0'
                // semua kode program dibawah akan dijalankan
                 
                // mengubah tampilan dari tombol sound dari
                // menjadi tampilan 'Off'
                buttonSound.setTexture('ButtonSoundOff');
                
                // mengubah volume dari sound 'snd_touch' menjadi '0'
                // jika tampilan tombol sound adalah 'Off'
                snd_touch.setVolume(0); 
                fx_shoot.setVolume(0);
                fx_explode.setVolume(0);
                
                // mengubah status yang tersimpan di database menjadi '0'
                localStorage['sound_enabled'] = 0;  
            }
        }
        
         if (gameObject == buttonMusic) 
        {
            buttonMusic.setTint(0xffffff);
            
            // mengambil data dari database dengan key 'sound_enabled' lalu
            // menampungnya di dalam variabel 'soundState'
            let isMusicActive = localStorage['music_enabled'] || 1;
            
            // mengecek nilai yang ditampung dari variabel 'soundstate'
            if (isMusicActive == 0)
            {
                // jika nilai dari 'soundState' adalah '0'
                // semua kode program dibawah akan dijalankan
                
                // mengubah tampilan dari tombol sound dari
                // menjadi tampilan 'On'
                buttonMusic.setTexture('ButtonMusicOn');
                
                // mengubah volume dari sound 'snd_touch' menjadi '1'
                // jika tampilan tombol sound adalah 'On'
                music.setVolume(1); 
            
                // mengubah status yang tersimpan di database menjadi '1' 
                localStorage['music_enabled'] = 1;  
            }
            else
            {
                // jika nilai dari 'soundState' bukan merupakan '0'
                // semua kode program dibawah akan dijalankan
                 
                // mengubah tampilan dari tombol sound dari
                // menjadi tampilan 'Off'
                buttonMusic.setTexture('ButtonMusicOff');
                
                // mengubah volume dari sound 'snd_touch' menjadi '0'
                // jika tampilan tombol sound adalah 'Off'
                music.setVolume(0); 
    
                // mengubah status yang tersimpan di database menjadi '0'
                localStorage['music_enabled'] = 0;  
            }
        }
    
    }, this);
    
    

}