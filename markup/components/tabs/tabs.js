$(function () {
    $('.tabs').each(function () {
        $(this).find('.tabs__btn:first').addClass('tabs__btn_opened').end().find('.tabs__item:first').addClass('tabs__item_opened').slideDown(200);
    });
    $('body').on('click', '[data-toggle="tab"]', function () {
        var tabs = $(this).closest('.tabs');
        var i = tabs.find('.tabs__btn').index(this);
        tabs.find('.tabs__btn').eq(i).addClass('tabs__btn_opened').end().not(':eq(' + i + ')').removeClass('tabs__btn_opened');
        tabs.find('.tabs__item').eq(i).slideDown(200).end().not(':eq(' + i + ')').slideUp(200);
    });
});