$(function () {
    $('body').on('click', '.menu__item_submenu>.menu__btn, .menu-catalogue__item_submenu>.menu-catalogue__btn', function (e) {
        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)') || true) {
            e.preventDefault();

            $('.menu__submenu, .menu-catalogue__submenu')
                .not($(this).next('.menu__submenu, .menu-catalogue__submenu').toggleClass('opened').toggle().parent().toggleClass('opened').end())
                .not($(this).parents('.menu__submenu, .menu-catalogue__submenu'))
                .removeClass('opened').hide().parent().removeClass('opened');
        }
    }).on('click', function (e) {
        if (!$(e.target).closest('.menu, .menu-catalogue').length) {
            $('.menu__submenu, .menu-catalogue__submenu').removeClass('opened').hide().parent().removeClass('opened');
        }
    });
});