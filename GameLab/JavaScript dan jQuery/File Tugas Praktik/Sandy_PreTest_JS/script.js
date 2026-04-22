// Variabel
let batasLulus = 75;

// Fungsi untuk cek status
function cekKelulusan(nilai) {
  if (nilai >= batasLulus) {
    return "LULUS ✅";
  } else {
    return "TIDAK LULUS ❌";
  }
}

// jQuery Event
$(document).ready(function () {

  $("#btnCek").click(function () {

    // Ambil data dari input
    let nama = $("#nama").val();
    let nilai = $("#nilai").val();

    // Kondisional sederhana
    if (nama === "" || nilai === "") {
      $("#hasil").html("⚠️ Nama dan nilai wajib diisi!");
      $("#hasil").css("color", "red");
      return;
    }

    // Panggil fungsi
    let status = cekKelulusan(nilai);

    // Manipulasi DOM dengan jQuery
    $("#hasil").html(
      "Nama: " + nama + "<br>" +
      "Nilai: " + nilai + "<br>" +
      "Status: " + status
    );

    $("#hasil").css("color", "green");
  });

});
