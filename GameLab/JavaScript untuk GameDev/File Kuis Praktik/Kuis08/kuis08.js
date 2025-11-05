// mengambil element canvas html dengan id GL_Canvas
var canvas = document.getElementById("GL_Canvas");

// mengambil context dari element canvas
var ctx = canvas.getContext("2d");

// menyimpan state #1 canvas
ctx.save();

// menggambar persegi warna hitam (warna default) dengan lebar dan tinggi 100 piksel
// pada titik koordinat x=0 dan y=0
ctx.fillRect(0, 0,100,100);

// menggeser posisi canvas x dan y masing-masing bertambah 50 piksel
ctx.translate(50, 50);

// menyimpan state #2 canvas
ctx.save();

// menggambar persegi warna biru dengan lebar dan tinggi 50 piksel
// pada titik koordinat x=0 dan y=0
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,100,100);

// menggeser posisi canvas x dan y masing-masing bertambah 50 piksel
ctx.translate(50, 50);

// menggambar persegi warna pink dengan lebar dan tinggi 50 piksel
// pada titik koordinat x=0 dan y=0
ctx.fillStyle = 'pink';
ctx.fillRect(0,0,50,50);

// mengembalikan canvas ke state #2
ctx.restore();

// memutar canvas sebanyak 45 derajat
ctx.rotate((Math.PI / 180) * 45);

// menggambar persegi warna jingga/oranye dengan lebar dan tinggi 50 piksel
// pada titik koordinat x=0 dan y=0
ctx.fillStyle = 'orange';
ctx.fillRect(0,0,50,50);

// mengembalikan canvas ke state #1
ctx.restore();

// menggambar persegi warna kuning dengan lebar dan tinggi 50 piksel
// pada titik koordinat x=0 dan y=0
ctx.fillStyle = 'yellow';
ctx.fillRect(0,0,50,50);

// membuat persegi dengan ukuran 10x10 piksel
// lalu mengatur skalanya dengan skala (10, 1)
// hingga pada tampilan akan terlihat persegi panjang dengan ukuran 100x10
ctx.fillStyle = 'brown';
ctx.save();
ctx.translate(300, 20);
ctx.scale(10, 1);
ctx.translate(-300, -20);
ctx.fillRect(300, 20, 10, 10);
ctx.restore();

// membuat teks 'GAMELAB.ID' lalu mengatur skalanya dengan skala (-1, 1)
// agar terlihat terbalik secara horizontal

ctx.save();

ctx.translate(450, 10);
ctx.scale(-1, 1);
ctx.font = '30px Arial';

ctx.translate(-450, -10);
ctx.fillText('GAMELAB.ID', 450, 120);
ctx.restore();

// menyimpan state canvas terakhir
ctx.save();

// menggeser canvas x: 200, dan y: 240
ctx.translate(200, 240);

// membuat garis menjadi putus-putus
ctx.setLineDash([4]);

ctx.save ();
ctx.fillStyle = 'pink';
ctx.setTransform(1, 1, 0, 1, 10, 0);
ctx.fillRect(190, 90, 50, 50);
ctx.restore();

ctx.save();
ctx.fillStyle = 'cyan' ;
ctx.transform(1, 1, 0, 1, 0, -150);
ctx.fillRect(150, 90, 50, 50);
ctx.restore();

ctx.save() ;
ctx.strokeStyle = 'black';
ctx.strokeRect(50, 90, 100, 50);
ctx.restore();

// mengembalikan state terakhir canvas
ctx.restore();

var width = 100;
var height = 100;

// membuat fungsi/method untuk membuat canvas
// supaya lebih sedikit kode-nya

var createCanvas = function() {
var newCanvas = document.createElement("canvas");
newCanvas.width = width * 1.2;

newCanvas.height = height * 1.2;
newCanvas.style.border = "1px solid #000";
newCanvas.style.margin = "60px";
return newCanvas;
};

// untuk menggambarkan 1 lingkaran jingga
// yang nantinya bisa di gunakan berulang-ulang
var canvasObjCirc = createCanvas();
var ctxObjCirc = canvasObjCirc.getContext("2d");
ctxObjCirc.fillStyle = "orange";
ctxObjCirc.translate((width*1.2-width)/2, (height*1.2-height)/2);
ctxObjCirc.beginPath();
ctxObjCirc.arc(width/2, height/2, width/2, Math.PI*2, 0, false);
ctxObjCirc.fill();

// menggambarkan 1 segi tiga hijau
// yang nantinya bisa digunakan berulang-ulang
var canvasObjTria = createCanvas();
var ctxObjTria = canvasObjTria.getContext("2d");
ctxObjTria.fillStyle = "green";
ctxObjTria.translate((width*1.2-width)/2, (height*1.2-height)/2);
ctxObjTria.beginPath();
ctxObjTria.moveTo(0, 0);
ctxObjTria.lineTo(width, 0);
ctxObjTria.lineTo(width/2, height);
ctxObjTria.closePath();
ctxObjTria. fill();

// membuat tabel

var dl = document. createElement("dl");
document.body.appendChild(dl);

// menambahkan baris ke tabel
var dt1 = document.createElement("dt");
dl.appendChild(dt1);

// membuat canvas baru yang langsung berisi
// objek pertama (awal) yaitu lingkaran jingga
var canvasCirc = createCanvas();

var ctx = canvasCirc.getContext('2d');
ctx.drawImage(canvasObjCirc, 0, 0);
dt1.appendChild(canvasCirc);

// membuat canvas baru yang langsung berisi
// objek kedua (baru) yaitu segi tiga hijau
var canvasTria = createCanvas ();
var ctx = canvasTria.getContext('2d');
ctx.drawImage(canvasObjTria, 0, 0);
dt1.appendChild(canvasTria);

// membuat canvas baru yang langsung berisi
// objek pertama + kedua secara berurutan
// dengan composistion 'source-over'
var canvasSourceOver = createCanvas () ;

var ctx = canvasSourceOver.getContext('2d');
ctx.drawImage(canvasObjCirc, 0, 0);
ctx.globalCompositeOperation = 'source-over' ;
ctx.drawImage(canvasObjTria, 0, 0);
dt1.appendChild(canvasSourceOver);

// menambankan baris ke tabel

var dt2 = document.createElement("dt");
dl.appendChild(dt2);
// membuat canvas baru yang langsung berisi
// objek pertama + kedua secaraberurutan
// dengan composistion 'source-in'
var canvasSourceIn = createCanvas () ;
var ctx = canvasSourceIn.getContext('2d');
ctx.drawImage(canvasObjCirc, 0, 0);
ctx.globalCompositeOperation = 'source-in' ;
ctx.drawImage(canvasObjTria, 0, 0);
dt2.appendChild(canvasSourceIn);

// membuat canvas baru yang langsung berisi
// objek pertama + kedua secara berurutan
// dengan composistion 'source-out'

var canvasSourceOut = createCanvas () ;
var ctx = canvasSourceOut.getContext('2d');
ctx.drawImage(canvasObjCirc, 0, 0);
ctx.globalCompositeOperation = 'source-out';
ctx.drawImage(canvasObjTria, 0, 0);
dt2.appendChild(canvasSourceOut);

// membuat canvas baru yang langsung berisi
// objek pertama + kedua secara berurutan
// dengan composistion 'source-atop'

var canvasSourceAtop = createCanvas() ;
var ctx = canvasSourceAtop.getContext('2d');
ctx.drawImage(canvasObjCirc, 0, 0);
ctx.globalCompositeOperation = 'source-atop' ;
ctx.drawImage(canvasObjTria, 0, 0);
dt2.appendChild(canvasSourceAtop);

// mengambil element canvas html dengan id GL_Canvas
var canvas = document.getElementById("GL_Canvas");

// mengambil context 2d dari element canvas
var ctx = canvas.getContext("2d");

// menentukan background dari persegi panjang
var radRect = ctx.createLinearGradient(0, -350, 0, 350);
radRect.addColorStop(0.5,'#232256');
radRect.addColorStop(1, '#143778');
ctx.fillStyle = radRect;

// mulai menggambarkan persegi panjang sebesar canvas dengan
// background dari radRect
ctx.fillRect(0, 0, canvas.width, canvas.height);

// menentukan background dari segi tiga
var radTriangle = ctx.createLinearGradient(0, -350, 0, 350);
radTriangle.addColorStop(0.5,'#232256');
radTriangle.addColorStop(1, '#ffcf75');
ctx.fillStyle = radTriangle;

// mulai menggambarkan segi tiga dengan
// background dari radTriangle
ctx.beginPath();
ctx.moveTo(canvas.width / 2, 0);
ctx.lineTo(canvas.width * 2, 0);
ctx.lineTo(0, 480);
ctx.closePath();
ctx.fill();

// menentukan area yang dapat digambar bentuk (bintang-bintang kecil)
// jika bentuk melebihi area, maka akan terpotong
ctx.clip();

// menggambarkan bentuk bintang-bintang kecil sebanyak 100 dan
// menempatkannya secara acak
for (var j = 1; j < 100; j++) {
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(canvas.width - Math.floor(Math.random() * canvas.width),
    canvas.height - Math.floor(Math.random() * canvas.height));

    // memanggil fungsi untuk membuat bentuk bintang-bintang kecil dengan
    // ukuran dan posisi acak
    drawStar(ctx, Math.floor(Math.random() * 6) + 2);
    ctx.restore();
}

// fungsi untuk menggambar 1 bentuk bintang
// untuk nanti dipanggil sebanyak 100 kali
function drawStar(ctx, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 === 0) {
            ctx.lineTo((r / 0.525731) * 0.200811, 0);
        } else {
            ctx.lineTo(r, 0);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

