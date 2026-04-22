// 1. addClass()
$('#btnAdd').click(function () {
    $('.welcome-text').addClass('active');
});

// 2. removeClass()
$('#btnRemove').click(function () {
    $('.welcome-text').removeClass('active');
});

// 3. toggleClass()
$('#btnToggle').click(function () {
    $('textarea').toggleClass('highlight');
});

// 4. attr()
$('#btnAttr').click(function () {
    $('a').attr('href', 'https://gamelab.id');
    $('img').attr('alt', 'Avatar User');
});

// 5. text()
$('#btnText').click(function () {
    $('.info-text').text('Konten telah diperbarui');
});

// 6. html()
$('#btnHtml').click(function () {
    $('.alert-info').html('<strong>Berhasil!</strong> Data diproses.');
});

// 7. removeAttr() ✅ FIX
$('#btnRemoveAttr').click(function () {
    $('textarea').removeAttr('class');
    $('img').removeAttr('src');
    $('a').removeAttr('href');
});

// 8. remove()
$('#btnRemoveEl').click(function () {
    $('.alert-info').remove();
});
