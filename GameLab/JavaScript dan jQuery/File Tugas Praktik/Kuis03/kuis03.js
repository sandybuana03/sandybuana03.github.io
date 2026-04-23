// ==============================
// Data rumah (contoh 1 penawaran)
// ==============================

// Kriteria kawasan
let tidakBanjir = true;
let tidakLongsor = true;
let bukanIndustri = true;

// Kriteria luasan
let luasTanah = 850;     // meter persegi
let luasBangunan = 420; // meter persegi

// Fasilitas
let adaKolamRenang = true;
let parkirLuas = true;
let adaKebun = true;

// ==============================
// Proses seleksi rumah
// ==============================

if (
  tidakBanjir &&
  tidakLongsor &&
  bukanIndustri &&
  luasTanah >= 800 &&
  luasBangunan >= 400 &&
  adaKolamRenang &&
  parkirLuas &&
  adaKebun
) {
  console.log("Rumah LAYAK dibeli oleh Andi ✅");
} else {
  console.log("Rumah TIDAK LAYAK dibeli oleh Andi ❌");
}
