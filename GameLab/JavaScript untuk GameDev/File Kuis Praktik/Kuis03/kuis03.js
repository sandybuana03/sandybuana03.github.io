var rawan_banjir   = false;
var rawan_longsor  = false;
var kawasan_pabrik = false;
var luas_tanah     = 800; 
var luas_bangunan  = 400; 
var kolam          = true;
var parkir_luas    = true;
var ada_kebun      = true;

if(!rawan_banjir && !rawan_longsor && !kawasan_pabrik){
    console.log("Kriteria Kawasan Sesuai\n");
}else{
    console.log("Kriteria Kawasan Tidak Sesuai\n");
}
if(luas_tanah>=800 && luas_bangunan>=400){
    console.log("Kriteria Luas Bangunan Sesuai\n");
}else{
    console.log("Kriteria Luas Bangunan Tidak Sesuai\n");
}
if(kolam && parkir_luas && ada_kebun){
    console.log("Fasilitas Lengkap\n");
}else{
    console.log("Fasilitas Tidak Lengkap\n");
}