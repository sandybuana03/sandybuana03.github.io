var canvas = document.getElementById("GL_Canvas");
var ctx = canvas.getContext("2d");

// menentukan warna 1 dan 2
var color1 = "Lavender";
var color2 = "#FFFACD";

// menentukan banyaknya garis yang digambar
var numberOfStripes = 50;

// menentukan tebalnya pola garis yang digambar
var thickness = 640 / numberOfStripes;

// mengatur ketebalan garis pada pola
ctx.lineWidth = thickness;

// menggambarkan garis sebanyak numberOfStripes (50)
for (var i = 0; i < numberOfStripes * 2; i++) {
    // mulai menggambar
    ctx.beginPath();

    // mengatur warna mana yang dipakai
    ctx.strokeStyle = i % 2 ? color1 : color2;

    // mengatur posisi awal garis yang akan digambar
    ctx.moveTo(i * thickness - 640, -10);

    // mengatur posisi ke dua (terakhir) yang garis akan digambar
    ctx.lineTo(i * thickness, 640);

    // menggambarkan garisnya
    ctx.stroke();
}

// mengatur ulang ketebalan garis pada gambar segi tiga yang berubah
ctx.lineWidth = 1;

// menggambar titik pada koordinat (10,10) dengan ukuran 1x1 px
// ctx.fillRect(10, 10, 1, 1);

// membuat garis di dalam canvas
// ctx.beginPath(); // mulai membuat garis
// ctx.moveTo(30, 10); // untuk menentukan titik awal
// ctx.lineTo(80, 50); // menentukan titik akhir
// ctx.stroke(); // menggambarkan atau memunculkan garis

// menentukan warna gradient pada persegi kosong yang sudah dibuat sebelumnya
// yaitu dengan warna hitam dan putih
var lineGradient = ctx.createLinearGradient(10, 150, 60, 150);
lineGradient.addColorStop(0, 'black');
lineGradient.addColorStop(1, 'white');
ctx.fillStyle = lineGradient;
ctx.fillRect(10, 10, 70, 70);

// menggambar persegi kosong dengan garis tepi pada titik koordinat (100, 10)
// dan dengan lebar 70 piksel serta tinggi 70 piksel
ctx.strokeRect(10, 10, 70, 70);

// menggambar persegi penuh atau persegi dengan isi yang titik koordinatnya berada di (90, 10)
// dan dengan lebar 70 piksel serta tinggi 70 piksel
ctx.fillStyle = '#0000FF';
ctx.fillRect(90, 10, 70, 70);

// menggambar persegi transparan dengan titik koordinatnya berada di (115, 35)
// dan dengan lebar 20 piksel serta tinggi 20 piksel
ctx.clearRect(115, 35, 20, 20);
    
// menggambar lingkaran dengan titik koordinatnya berada di (50, 140)
// dan dengan lebar lingkaran sebesar 60 piksel
ctx.beginPath();
ctx.arc(50, 140, 30, 0, Math.PI * 2);
ctx.stroke();
ctx.closePath();
    
// membuat garis luar menjadi warna jingga
ctx.strokeStyle = 'rgb(255, 165, 0)';
    
// menggambar segi tiga dengan tiga titik koordinat
ctx.beginPath(); // Mulai menggambar
ctx.moveTo(130, 110); // Titik awal
ctx.lineTo(90, 170); // Titik ke-2
ctx.lineTo(170, 170); // Titik ke-3
ctx.closePath(); // Dari titik ke-3 menuju ke titik awal
ctx.stroke(); // Gambar garis
// ctx.fill(); // Bentuk Segi tiga Full Warna biru
    
// menentukan warna dari radial gradient yang akan tampil (2 warna berbeda)
var radGradient = ctx.createRadialGradient(120, 125, 2, 120, 125, 25);
radGradient.addColorStop(0, '#A7D30C');
radGradient.addColorStop(1, '#019F62');
    
// mengatur agar tampilan gambar berikutnya menggunakan style radGradient
ctx.fillStyle = radGradient;
    
// menggambarkan bentuk persegi
ctx.fillRect(95, 100, 50, 50);
