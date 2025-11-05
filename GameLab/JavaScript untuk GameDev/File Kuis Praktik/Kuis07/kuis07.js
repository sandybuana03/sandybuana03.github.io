// fungsi untuk merubah brightness
function applyBrightness (data, brightness) {
    for (var i = 0; i < data.length; i += 4) {
        data[i] += 255 * (brightness / 100);
        data[i + 1] += 255 * (brightness / 100);
        data[i + 2] += 255 * (brightness / 100);
    }
}
    
// fungsi untuk proteksi nilai agar tetap di antara 0 dan 255
function truncateColor(value) {
    if (value < 0) {
        value = 0;
    } else if (value > 255) {
        value = 255;
    }
    return value;
}

// fungsi untuk mengubah nilai contrast
function applyContrast(data, contrast) {
    var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
    for (var i = 0; i < data.length; i += 4) {
        data[i] = truncateColor(factor * (data[i] - 128.0)+ 128.0);
        data[i + 1] = truncateColor(factor * (data[i + 1] -128.0) + 128.0);
        data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
}


// mengambil context dari element html dengan id GL_Canvas
var canvas = document.getElementById("GL_Canvas");
var ctx = canvas.getContext("2d");

// Mengubah ukuran dan jenis font yang akan dipakai
// ukuran dari tulisan akan menjadi 50 piksel
// jenis font yang digunakan diganti dengan Fantasy
ctx.font = '50px Fantasy';

// menggambar teks dengan isian yang bertuliskan Hello world
// dan dengan titik koordinat (20, 30)
ctx.strokeText('Hello world', 20, 50);

// menggambar teks dengan isian yang bertuliskan Hello world
// dan dengan titik koordinat (20, 150)
ctx.fillText('Hello world', 20, 150);

// membuat garis berwarna jingga di posisi 320
ctx.strokeStyle = "orange";
ctx.moveTo(370, 20);
ctx.lineTo(370, 170);
ctx.stroke();

// menentukan ukuran dan jenis font yang akan dipakai
ctx.font = "15px Arial";

// menampilkan perbedaan dari tiap-tiap nilai atribut textAlign
ctx.textAlign = "start";
ctx.fillText("textAlign = start", 370, 60);
ctx.textAlign = "end";
ctx.fillText("textAlign = end", 370, 80);
ctx.textAlign = "left";
ctx.fillText("textAlign = left", 370, 100);
ctx.textAlign = "center";
ctx.fillText("textAlign = center", 370, 120);
ctx.textAlign = "right";
ctx.fillText("textAlign = right", 370, 140);

// Membuat garis berwarna jingga di posisi y=250
ctx.moveTo(5, 250);
ctx.lineTo(425, 250);
ctx.stroke();

// tempatkan semua teks untuk titik y=250 dengan
// nilai textBaseline berbeda-beda
ctx.textBaseline = "alphabetic";
ctx.fillText("Alphabetic", 80, 250);
ctx.textBaseline ="top";
ctx.fillText("Top",120, 250);
ctx.textBaseline = "hanging";
ctx.fillText("Hanging", 200, 250);
ctx.textBaseline = "middle";
ctx.fillText("Middle", 260, 250);
ctx.textBaseline = "ideographic";
ctx.fillText("Ideographic", 360, 250);
ctx.textBaseline = "bottom";
ctx.fillText("Bottom", 420, 250);

// membuat teks "Halo!"
ctx.fillText('Halo!', 550, 50);

// membuat teks "Halo!" agar objek berikutnya
// susunan karakternya berbalik menjadi "!Halo"
ctx.direction = 'rtl';
ctx.fillText('Halo!', 550, 130);

var text = 'Hello, world!';
ctx.font = '30px Arial';

var textMetrics = ctx.measureText(text);
var textWidth = textMetrics.width;

// Sekarang Anda dapat menggunakan textWidth untuk menentukan posisi gambar teks di atas kanv.
ctx.fillText(text, (canvas.width - textWidth) / 2.7, 350);

// membuat objek gambar
var gambar = new Image();

// path untuk gambar berupa folder dan nama gambar (offline)
gambar.src = "images/image.png";
gambar.onload = function () {

    // membuat gambar setelah image termuat
    // dai sekaligus mengatur ukurannya menjadi 180x180
    ctx.drawImage(gambar, 500, 180, 80, 80);

    // membuat gambar setelah image termuat sekaligus
    // memotong dan menyesuaikan posisi dan ukurannya ulang
    ctx.drawImage(gambar, 30, 10, 60, 60, 500, 300, 80, 80);

    // mendapatkan data gambar
    var imgData = ctx.getImageData(500, 180, 80, 80);

    // menampung data piksel gambar
    let pixels = imgData.data;

    for (var i = 0; i < pixels.length; i += 4) {

    let lightness = parseInt((pixels[i] + pixels[i + 1]+ pixels[i+2]) /3);

    pixels[i] = lightness; // merah
    pixels[i + 1] = lightness; // hijau
    pixels[i + 2] = lightness; // biru
    }

    // mengubah data piksel dan menampilkannya di canvas
    ctx.putImageData(imgData, 400, 300);

    // mengambil data pixel dari canvas
    // berdasarkan area yang ada di parameter
    var imgDataB = ctx.getImageData(500, 180, 80, 80);

    // menampung data gambar dalam piksel
    var pixelsB = imgDataB.data;
    for (var i = 0; i < pixelsB.length; i += 4) {
    pixelsB[i] ^= 255; // membalikkan nilai merah
    pixelsB[i + 1] ^= 255; // membalikkan nilai hijau
    pixelsB[i + 2] ^= 255; // membalikkan nilai biru
    }

    // mengubah data piksel dan menampilkannya di canvas
    ctx.putImageData(imgDataB, 300, 300);

    // membuat gambar setelah image termuat dan sekaligus mengatur ukurannya menjadi 120x90
    ctx.drawImage(gambar, 200, 300, 80, 80);

    // mengambil data pixel dari canvas berdasarkan area yang ada di parameter
    var imgDataC = ctx.getImageData(200, 300, 90, 90);

    // mengubah brightness menjadi -50
    applyBrightness(imgDataC.data, -50);

    // mengubah data piksel dan menampilkannya di canvas
    ctx.putImageData(imgDataC, 200, 300);

    // membuat gambarrsetelah image termuat dan sekaligus mengatur ukurannya menjadi 90x120
    ctx.drawImage(gambar, 200, 390, 80, 80);

    // mengambil data pixel dari canvas berdasarkan area yang ada di parameter
    var imgDataD = ctx.getImageData(200, 390, 90, 90);

    // mengubah contrast menjadi 100
    applyContrast(imgDataD.data, 100);

    // mengubah data piksel dan menampilkannya di canvas
    ctx.putImageData(imgDataD, 200, 390);
}
