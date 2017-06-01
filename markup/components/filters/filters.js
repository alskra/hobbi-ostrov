$(function () {
    $('body').on('click', '.filters .aside__header', function () {
        $('.filters__hidden').slideToggle(200);
    });
});