function closeHeaderHidden() {
    $('.header__btn-menu').removeClass('header__btn-menu_opened');
    $('.header__hidden').removeClass('header__hidden_opened').fadeOut(200);
    //$('html').removeClass('overflow-hidden');
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
        //$('html').toggleClass('overflow-hidden');
    });

    $('body').on('click', '.header__btn-search', function (e) {
        e.preventDefault();
        closeHeaderHidden();
        $(this).toggleClass('header__btn-search_opened');
        $('.header__search').toggleClass('header__search_opened').fadeToggle(200);
        $('.header__search-field').focus();
    });

    $(window).on('resize.Header', function () {
        $(window).off('.affix');
        $('.affix-col').removeData('bs.affix').removeClass('affix affix-top affix-bottom');
        $('.affix-col-position').css('min-height', '');
        setTimeout(function () {
            $(window).off('.affix');
            $('.affix-col').removeData('bs.affix').removeClass('affix affix-top affix-bottom');
            $('.affix-col-position').css('min-height', '');
        }, 200);

        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')){
            $('.header__hidden-top').prependTo('.header__hidden');

            $('.menu-catalogue').insertAfter('.menu__item_lvl_1:eq(0)').show();

            $('.filters').insertAfter('.categories-list');
        }
        else {
            $('.header__hidden-top').prependTo('.header .grid__col_2');

            $('.menu-catalogue').prependTo('.affix-col').show();

            $('.filters').appendTo('.affix-col');

            setTimeout(function () {
                $('.affix-col').css('top', '').affix({
                    offset: {
                        top: function () {
                            return (this.top = $('.menu').offset().top - 20)
                        },
                        bottom: function () {
                            return (this.bottom = $('.wrapper').height() - $('.affix-col-container').offset().top - $('.affix-col-container').outerHeight(false))
                        }
                    }
                }).on('affix.bs.affix affix-bottom.bs.affix', function () {
                    $('.affix-col-position').css('min-height', $(this).outerHeight());
                }).triggerHandler('affix.bs.affix');
            }, 500);
        }
    }).triggerHandler('resize.Header');
});