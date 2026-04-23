$(document).ready(function () {

  // 1. click
  $('#btnClick').click(function () {
    alert('Button diklik');
  });

  // 2. dblclick
  $('#btnDbl').dblclick(function () {
    alert('Button double klik');
  });

  // 3. click pada elemen p
  $('#text').click(function () {
    $(this).css('color', 'red');
  });

  // 4. keydown (semua tombol keyboard)
  $('#inputText').keydown(function () {
    console.log('Key ditekan');
  });

  // 5. keypress (tombol karakter)
  $('#areaText').keypress(function () {
    console.log('Karakter diketik');
  });

  // 6. change pada select
  $('#selectOption').change(function () {
    alert('Pilihan berubah menjadi: ' + $(this).val());
  });

  // 7. focus
  $('#inputText').focus(function () {
    $(this).css('background-color', '#e0ffe0');
  });

  // 8. blur
  $('#inputText').blur(function () {
    $(this).css('background-color', '');
  });

  // 9. mouseenter
  $('#box').mouseenter(function () {
    $(this).css('background-color', 'orange');
  });

  // 10. mouseleave
  $('#box').mouseleave(function () {
    $(this).css('background-color', 'lightblue');
  });

});
