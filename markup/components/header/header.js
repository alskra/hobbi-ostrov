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
        var $affixColContainer = $('.affix-col-container'), $affixCol = $('.affix-col');

        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')){
            $('.header__hidden-top').prependTo('.header__hidden');

            $('.menu-catalogue').insertBefore('.menu__item_lvl_1:eq(0)').show();

            $('.filters').insertAfter('.categories-list');

            $affixColContainer.css('min-height', '');

            $(window).off('.affix');
            $affixCol.removeData('bs.affix').removeClass('affix affix-top affix-bottom affix-inited').css('top', '');
        }
        else {
            $('.header__hidden-top').prependTo('.header .grid__col_2');

            $('.menu-catalogue').prependTo($affixCol).show();

            $('.filters').appendTo($affixCol);

            setTimeout(function () {
                $affixColContainer.css('min-height', $affixCol.outerHeight(false));

                $affixCol.not('.affix-inited').affix({
                    offset: {
                        top: function () {
                            return (this.top = $('.menu').offset().top - 20)
                        },
                        bottom: function () {
                            return (this.bottom = $('.wrapper').height() - $affixColContainer.offset().top - $affixColContainer.outerHeight(false))
                        }
                    }
                }).addClass('affix-inited');

                $affixCol.data('bs.affix').options.offset = {
                    top: $('.menu').offset().top - 20,
                    bottom: $('.wrapper').height() - $affixColContainer.offset().top - $affixColContainer.outerHeight(false)
                };

                $affixCol.affix('checkPosition');

                console.log($affixCol.data('bs.affix').options.offset);
            }, 200);
        }
    }).triggerHandler('resize.Header');
});