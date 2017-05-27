var $screenSm = 768, $screenMd = 1024, $screenLg = 1170;

$('link').attr('media', 'all');


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
                    slidesToShow: 2
                }
            },
            {
                breakpoint: $screenSm - 1,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: $screenLg - 1,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    }).on('lazyLoaded', function (event, slick, image, imageSource) {
        $(image).closest('.slick-slide').removeClass('loading loading_before');
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwicHJvZHVjdHMtbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJsb2Nrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciAkc2NyZWVuU20gPSA3NjgsICRzY3JlZW5NZCA9IDEwMjQsICRzY3JlZW5MZyA9IDExNzA7XG5cbiQoJ2xpbmsnKS5hdHRyKCdtZWRpYScsICdhbGwnKTtcbiIsImZ1bmN0aW9uIGNsb3NlSGVhZGVySGlkZGVuKCkge1xuICAgICQoJy5oZWFkZXJfX2J0bi1tZW51JykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fYnRuLW1lbnVfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9faGlkZGVuJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VIZWFkZXJTZWFyY2goKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9fc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tbWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJTZWFyY2goKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmhlYWRlcl9fYnRuLXNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJIaWRkZW4oKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tc2VhcmNoX29wZW5lZCcpO1xuICAgICAgICAkKCcuaGVhZGVyX19zZWFyY2gnKS50b2dnbGVDbGFzcygnaGVhZGVyX19zZWFyY2hfb3BlbmVkJykuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICAkKCcuaGVhZGVyX19zZWFyY2gtZmllbGQnKS5mb2N1cygpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuSGVhZGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5NZCAtIDEpICsgJ3B4KScpKXtcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX2hpZGRlbi10b3AnKS5wcmVwZW5kVG8oJy5oZWFkZXJfX2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlciAuZ3JpZF9fY29sXzInKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuSGVhZGVyJyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZHVyYXRpb24gPSBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6ICcgKyAkc2NyZWVuTWQgKyAncHgpJykgPyAwIDogMjAwO1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1lbnVfX2l0ZW1fc3VibWVudT4ubWVudV9fYnRuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcubWVudV9faXRlbV9zdWJtZW51Jykubm90KFxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubWVudV9faXRlbV9zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ21lbnVfX2l0ZW1fb3BlbmVkJykuY2hpbGRyZW4oJy5tZW51X19zdWJtZW51Jykuc2xpZGVUb2dnbGUoZHVyYXRpb24pLmVuZCgpXG4gICAgICAgICkucmVtb3ZlQ2xhc3MoJ21lbnVfX2l0ZW1fb3BlbmVkJykuY2hpbGRyZW4oJy5tZW51X19zdWJtZW51Jykuc2xpZGVVcChkdXJhdGlvbik7XG4gICAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5tZW51X19idG4nKS5sZW5ndGggfHwgJChlLnRhcmdldCkuY2xvc2VzdCgnLm1lbnVfX3N1Ym1lbnUnKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLm1lbnVfX2l0ZW1fc3VibWVudScpLnJlbW92ZUNsYXNzKCdtZW51X19pdGVtX29wZW5lZCcpLmNoaWxkcmVuKCcubWVudV9fc3VibWVudScpLnNsaWRlVXAoZHVyYXRpb24pO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnByb2R1Y3RzLWxpc3Rfc2xpY2snKS5zbGljayh7XG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgIGNzc0Vhc2U6ICdlYXNlLW91dCcsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXYgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgIGFzTmF2Rm9yOiAnJyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ3OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuTGcgLSAxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiXX0=
