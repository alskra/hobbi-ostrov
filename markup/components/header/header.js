function closeHeaderHidden() {
    $('.header__btn-menu').removeClass('header__btn-menu_opened');
    $('.header__hidden').removeClass('header__hidden_opened').fadeOut(200);
}

function closeHeaderSearch() {
    $('.header__btn-search').removeClass('header__btn-search_opened');
    $('.header__search').removeClass('header__search_opened').fadeOut(200);
}

$(function () {
    $('body').on('click', '.header__btn-menu', function (e) {
        e.preventDefault();
        closeHeaderSearch();
        $(this).toggleClass('header__btn-menu_opened');
        $('.header__hidden').toggleClass('header__hidden_opened').fadeToggle(200);
    });

    $('body').on('click', '.header__btn-search', function (e) {
        e.preventDefault();
        closeHeaderHidden();
        $(this).toggleClass('header__btn-search_opened');
        $('.header__search').toggleClass('header__search_opened').fadeToggle(200);
        $('.header__search-field').focus();
    });

    $(window).on('resize.Header', function () {
        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')){
            $('.header__hidden-top').prependTo('.header__hidden');
        }
        else {
            $('.header__hidden-top').prependTo('.header .grid__col_2');
        }
    }).triggerHandler('resize.Header');
});