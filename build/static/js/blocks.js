var $screenSm = 768, $screenMd = 935, $screenLg = 1170;


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

        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')){
            $('.header__hidden-top').prependTo('.header__hidden');

            $('.menu-catalogue').insertAfter('.menu__item_lvl_1:eq(0)').show();
        }
        else {
            $('.header__hidden-top').prependTo('.header .grid__col_2');

            $('.menu-catalogue').prependTo('.affix-col').show();

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
                });
            }, 500);
        }
    }).triggerHandler('resize.Header');
});

$(function () {
    $('body').on('click', '.menu__item_submenu>.menu__btn, .menu-catalogue__item_submenu>.menu-catalogue__btn', function (e) {
        e.preventDefault();
        $('.menu__submenu, .menu-catalogue__submenu')
            .not($(this).next('.menu__submenu, .menu-catalogue__submenu').toggleClass('opened').toggle().parent().toggleClass('opened').end())
            .not($(this).parents('.menu__submenu, .menu-catalogue__submenu'))
            .removeClass('opened').hide().parent().removeClass('opened');
    });
});



$(function () {
    $('.slider-main').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        prevArrow: '<button type="button" class="slick-prev icon icon-angle-left"></button>',
        nextArrow: '<button type="button" class="slick-next icon icon-angle-right"></button>',
        autoplay: true,
        autoplaySpeed: 5000,
        zIndex: 1,
        lazyLoad: 'ondemand',
        responsive: [

        ]
    }).on('lazyLoaded', function (event, slick, image, imageSource) {
        $(image).closest('.slick-slide').removeClass('loading loading_before');
    });
});

$(function () {
    $('.products-list_slick').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        fade: false,
        cssEase: 'ease-out',
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        prevArrow: '<button type="button" class="slick-prev icon icon-angle-right-2"></button>',
        nextArrow: '<button type="button" class="slick-next icon icon-angle-right-2"></button>',
        autoplay: false,
        autoplaySpeed: 5000,
        zIndex: 1,
        lazyLoad: 'ondemand',
        asNavFor: '',
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: $screenSm - 1,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: $screenLg - 1,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    }).on('lazyLoaded', function (event, slick, image, imageSource) {
        $(image).closest('.slick-slide').removeClass('loading loading_before');
    });
});

$(function () {
    $(window).on('resize.VKWidget', function () {
        VK.Widgets.Group("vk_groups", {mode: 3, width: $('#vk_groups').parent().width(), color3: '6F9D3A'}, 20003922);
        $('#vk_groups *').remove();
    }).triggerHandler('resize.VKWidget');
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwic2xpZGVyLW1haW4uanMiLCJwcm9kdWN0cy1saXN0LmpzIiwidmstd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJibG9ja3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJHNjcmVlblNtID0gNzY4LCAkc2NyZWVuTWQgPSA5MzUsICRzY3JlZW5MZyA9IDExNzA7XG4iLCJmdW5jdGlvbiBjbG9zZUhlYWRlckhpZGRlbigpIHtcbiAgICAkKCcuaGVhZGVyX19idG4tbWVudScpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1tZW51X29wZW5lZCcpO1xuICAgICQoJy5oZWFkZXJfX2hpZGRlbicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2hpZGRlbl9vcGVuZWQnKS5mYWRlT3V0KDIwMCk7XG4gICAgLy8kKCdodG1sJykucmVtb3ZlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUhlYWRlclNlYXJjaCgpIHtcbiAgICAkKCcuaGVhZGVyX19idG4tc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fYnRuLXNlYXJjaF9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19zZWFyY2gnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19zZWFyY2hfb3BlbmVkJykuZmFkZU91dCgyMDApO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5oZWFkZXJfX2J0bi1tZW51JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlclNlYXJjaCgpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1tZW51X29wZW5lZCcpO1xuICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS50b2dnbGVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICAvLyQoJ2h0bWwnKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5oZWFkZXJfX2J0bi1zZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlSGVhZGVySGlkZGVuKCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fYnRuLXNlYXJjaF9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9fc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgJCgnLmhlYWRlcl9fc2VhcmNoLWZpZWxkJykuZm9jdXMoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLkhlYWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9mZignLmFmZml4Jyk7XG4gICAgICAgICQoJy5hZmZpeC1jb2wnKS5yZW1vdmVEYXRhKCdicy5hZmZpeCcpLnJlbW92ZUNsYXNzKCdhZmZpeCBhZmZpeC10b3AgYWZmaXgtYm90dG9tJyk7XG5cbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyX19oaWRkZW4nKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykuaW5zZXJ0QWZ0ZXIoJy5tZW51X19pdGVtX2x2bF8xOmVxKDApJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlciAuZ3JpZF9fY29sXzInKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykucHJlcGVuZFRvKCcuYWZmaXgtY29sJykuc2hvdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcuYWZmaXgtY29sJykuY3NzKCd0b3AnLCAnJykuYWZmaXgoe1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy50b3AgPSAkKCcubWVudScpLm9mZnNldCgpLnRvcCAtIDIwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5ib3R0b20gPSAkKCcud3JhcHBlcicpLmhlaWdodCgpIC0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKS5vZmZzZXQoKS50b3AgLSAkKCcuYWZmaXgtY29sLWNvbnRhaW5lcicpLm91dGVySGVpZ2h0KGZhbHNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuSGVhZGVyJyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZW51X19pdGVtX3N1Ym1lbnU+Lm1lbnVfX2J0biwgLm1lbnUtY2F0YWxvZ3VlX19pdGVtX3N1Ym1lbnU+Lm1lbnUtY2F0YWxvZ3VlX19idG4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLm5leHQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKS50b2dnbGVDbGFzcygnb3BlbmVkJykudG9nZ2xlKCkucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLmVuZCgpKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLnBhcmVudHMoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKSlcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICB9KTtcbn0pOyIsIiIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5zbGlkZXItbWFpbicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1sZWZ0XCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG5cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucHJvZHVjdHMtbGlzdF9zbGljaycpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgY3NzRWFzZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgYXNOYXZGb3I6ICcnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDc5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlbkxnIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICB9KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQod2luZG93KS5vbigncmVzaXplLlZLV2lkZ2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBWSy5XaWRnZXRzLkdyb3VwKFwidmtfZ3JvdXBzXCIsIHttb2RlOiAzLCB3aWR0aDogJCgnI3ZrX2dyb3VwcycpLnBhcmVudCgpLndpZHRoKCksIGNvbG9yMzogJzZGOUQzQSd9LCAyMDAwMzkyMik7XG4gICAgICAgICQoJyN2a19ncm91cHMgKicpLnJlbW92ZSgpO1xuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuVktXaWRnZXQnKTtcbn0pOyJdfQ==
