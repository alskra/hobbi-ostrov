$(function () {
    $('body').on('click', '.filters .aside__header', function () {
        $('html, body').toggleClass('open_left');
        $('.wrapper').toggleClass('wrapper_open_left');
    });
});