// Buat fungsi baru dengan nama fibonaci
function fibonaci(input) {
    // Jika input kurang dari 2, kembalikan input itu sendiri (0 atau 1)
    if (input < 2) {
        return input;
    } else {
        // Jika input >= 2, hitung Fibonacci dengan cara rekursif
        return fibonaci(input - 1) + fibonaci(input - 2);
    }
}

// Panggil fungsi dalam perulangan 8 kali
for (let i = 0; i < 8; i++) {
    console.log(fibonaci(i));
}
