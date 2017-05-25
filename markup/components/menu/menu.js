$(function () {
    var duration = Modernizr.mq('(min-width: ' + $screenMd + 'px)') ? 0 : 200;
    $('body').on('click', '.menu__item_submenu>.menu__btn', function (e) {
        e.preventDefault();
        $('.menu__item_submenu').not(
            $(this).closest('.menu__item_submenu').toggleClass('menu__item_opened').children('.menu__submenu').slideToggle(duration).end()
        ).removeClass('menu__item_opened').children('.menu__submenu').slideUp(duration);
    }).on('click', function (e) {
        if ($(e.target).closest('.menu__btn').length || $(e.target).closest('.menu__submenu').length) return;
        $('.menu__item_submenu').removeClass('menu__item_opened').children('.menu__submenu').slideUp(duration);
    });
});