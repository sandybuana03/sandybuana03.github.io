var text = "";
var n = 5; // jumlah baris

for (var i = 1; i <= n; i++) {
    // tambahkan spasi
    for (var j = 1; j <= n - i; j++) {
        text += " ";
    }
    // tambahkan bintang
    for (var k = 1; k <= i; k++) {
        text += "*";
    }
    text += "\n"; // pindah ke baris berikutnya
}

console.log(text);
