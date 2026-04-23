$(document).ready(function () {

  // 1. fadeIn
  $('#btnFadeIn').click(function () {
    $('.box').fadeIn(600, 'linear');
  });

  // 2. fadeOut
  $('#btnFadeOut').click(function () {
    $('.box').fadeOut(600, 'swing');
  });

  // 3. fadeToggle
  $('#btnFadeToggle').click(function () {
    $('.box').fadeToggle('fast');
  });

  // 4. fadeTo
  $('#btnFadeTo').click(function () {
    $('.box').fadeTo(1000, 0.5, 'linear');
  });

  // 5. slideDown
  $('#btnSlideDown').click(function () {
    $('.panel').slideDown(600);
  });

  // 6. slideUp
  $('#btnSlideUp').click(function () {
    $('.panel').slideUp('slow');
  });

  // 7. slideToggle
  $('#btnSlideToggle').click(function () {
    $('.panel').slideToggle(500);
  });

  // 8. show
  $('#btnShowImg').click(function () {
    $('img').show(600);
  });

  // 9. hide
  $('#btnHideImg').click(function () {
    $('img').hide(600);
  });

  // 10. toggle
  $('#btnToggleImg').click(function () {
    $('img').toggle('fast');
  });

});
