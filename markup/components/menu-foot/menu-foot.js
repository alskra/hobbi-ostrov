$(function () {
    $('body').on('click', '.menu-foot__item_submenu>.menu-foot__btn', function (e) {
        var item = $(this).closest('.menu-foot__item_submenu');
        item.toggleClass('menu-foot__item_opened').find('.menu-foot__submenu').slideToggle(200);
        $('.menu-foot__item_submenu').not(item).removeClass('menu-foot__item_opened').find('.menu-foot__submenu').slideUp(200);
        return false;
    });
});