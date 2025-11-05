// mengambil element canvas html dengan id GL_Canvas
var canvas = document.getElementById("GL_Canvas");

// mengambil context 2d dari element canvas
var ctx = canvas.getContext("2d");

// membuat objek persegi yang di dalamnya terdapat
// beberapa sifat dan juga fungsi dengan nama draw
var square = {
    // sifat dari persegi
    x: 220, y: 200, width: 90, height: 90, color: '#00ccff',

    // fungsi untuk menggambarkan persegi
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// membuat objek persegi panjang yang di dalamnya terdapat
// beberapa sifat dan juga fungsi dengan nama draw
var rectangle = {
    // sifat dari persegi panjang
    x: 330, y: 220, vx: 1, vy: 1, width: 120, height: 50, color: '#00bd1c',

    // fungsi untuk menggambarkan persegi panjang
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// membuat objek lingkaran
var circle = {
    // sifat dari lingkaran
    x: 120, y: 250, radius: 20, color: '#bd8100',
    
    // fungsi untuk menggambarkan persegi panjang
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};
    
// fungsi untuk menggambarkan semua bentuk
var drawAllShapes = function () {
    
    // menggambar ulang bentuk persegi
    square.draw();
    
    // menggambar ulang bentuk persegi panjang
    rectangle.draw();
    
    // menggambar ulang bentuk lingkaran
    circle.draw();
};
    
// menggambarkan semua bentuk - pertama kali halaman dibuka
drawAllShapes ();

// event listener untuk mendeteksi ketika
// mouse sedang bergerak
canvas.addEventListener ('mousemove', function(e) {
    // membersihkan tampilan pada canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // mengubah nilai posisi x dan y sebelumnya dengan
    // nilai posisi x dan y pada mouse
    circle.x = e.clientX;
    circle.y = e.clientY;
    
    //menggambarkan ulang lingkaran, persegi dan
    // persegi panjang
    drawAllShapes();

    // mengubah warna lingkaran ketika bertubrukan dengan persegi
    if (isCircleCollidindSquare(circle, square)) {
        circle.color ='#ff2667';
    }
    else {
        circle.color ='#bd8100';
    }
});

// menambahkan event listener ketika tombol pada keyboard ditekan
window.addEventListener ('keydown', (e) => {
    // membersihkan tampilan pada canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // menggerakkan bentuk persegi panjang dengan
    // tombol arah kanan, kiri, atas dan bawah pada
    // keyboard
    if (e.key === 'ArrowRight') {
    rectangle.x += rectangle.vx;
    }

    if (e.key === 'ArrowLeft') {
    rectangle.x -= rectangle.vx;
    }

    if (e.key === 'ArrowUp') {
    rectangle.y -= rectangle.vy;
    }

    if (e.key === 'ArrowDown') {
    rectangle.y += rectangle.vy;
    
    }
    
    // mengubah warna persegi panjang ketika bertubrukan dengan persegi
    if (isRectangleCollidindSquare(rectangle, square)) {
        rectangle.color ='#ff2667';
    }
    else {
        rectangle.color ='#00bd1c';
    }
    //menggambarkan ulang lingkaran, persegi dan
    // persegi panjang
    drawAllShapes ();
});

// fungsi untuk mendeteksi tubrukan antara lingkaran dengan persegi
var isCircleCollidindSquare = function(circleParam, squareParam) {

    var distX = Math.abs(circleParam.x - squareParam.x - squareParam.width / 2);
    var distY = Math.abs(circleParam.y - squareParam.y - squareParam.height / 2);
    
    if (distX > (squareParam.width / 2 + circleParam.radius)) {
        return false;
    }

    if (distY > (squareParam.height / 2 + circleParam.radius)) {
        return false;
    }

    if (distX <= (squareParam.width / 2)) {
        return true;
    }
    
    if (distY <= (squareParam.height / 2)) {
        return true;
    }

    var dx = distX - squareParam.width / 2;
    var dy = distY - squareParam.height / 2;
    
    return (dx * dx + dy * dy <= (circleParam.radius * circleParam.radius));
};


// fungsi untuk mendeteksi tubrukan antara persegi panjang dengan persegi
function isRectangleCollidindSquare(rectangleParam, squareParam) {

    let collided = false;
    
    if (rectangleParam.x < squareParam.x + squareParam.width &&
        rectangleParam.x + rectangleParam.width > squareParam.x &&
        rectangleParam.y < squareParam.y + squareParam.height &&
        rectangleParam.y + rectangleParam.height > squareParam.y) {
        collided = true;
    }
    return collided;
};