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
        $('.affix-col-position').css('min-height', '');

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
                }).on('affix.bs.affix affix-bottom.bs.affix', function () {
                    $('.affix-col-position').css('min-height', $(this).outerHeight());
                }).triggerHandler('affix.bs.affix');
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
    $(window).on('scroll.attachFilters', function () {
       $('.filters[data-section]').each(function () {
           var sect = $('#' + $(this).data('section'));
           var top = $(window).scrollTop() + 54 - $(this).offset().top;
           var bottom = $(window).scrollTop() + 54 - (sect.offset().top + sect.height() - 100);
           if (top >= 0 && bottom < 0){
               $(this).outerHeight($(this).outerHeight());
               $(this).addClass('filters_fixed').find('.filters__inner').outerWidth($(this).outerWidth());
           }
           else {
               $(this).outerHeight('');
               $(this).removeClass('filters_fixed').find('.filters__inner').outerWidth('');
           }
       });
    });
    $(window).on('resize.correctlyFilters', function () {
        $(this).trigger('scroll.attachFilters');
    })
});

$(function () {
    $('.range-slider').each(function () {
        var $this = $(this);
        $this.find('.range-slider__input').ionRangeSlider({
            type: "double",
            min: $(this).data('rs-min'),
            max: $(this).data('rs-max'),
            from: $(this).data('rs-from'),
            to: $(this).data('rs-to'),
            step: 100,
            onStart: function (data) {
                $this.find('.range-slider__from').val(data.from);
                $this.find('.range-slider__to').val(data.to);
            },
            onChange: function (data) {
                $this.find('.range-slider__from').val(data.from);
                $this.find('.range-slider__to').val(data.to);
            },
            onFinish: function (data) {
                //console.log(data);
            },
            onUpdate: function (data) {
                $this.find('.range-slider__from').val(data.from);
                $this.find('.range-slider__to').val(data.to);
            }
        });

        $this.find('.range-slider__from').on('change', function () {
            var slider = $this.find('.range-slider__input').data("ionRangeSlider");

            slider.update({
                from: $(this).val()
            });
        });

        $this.find('.range-slider__to').on('change', function () {
            var slider = $this.find('.range-slider__input').data("ionRangeSlider");

            slider.update({
                to: $(this).val()
            });
        });

    });
});

$.ikSelect.extendDefaults({autoWidth: false, ddFullWidth: false, dynamicWidth: false, extractLink: false, ddMaxHeight: 200, onShow: function (e){
    e.$el.siblings('.ik_select_link').addClass('ik_select_link_opened');
}, onHide: function (e){
    e.$el.siblings('.ik_select_link').removeClass('ik_select_link_opened');
    e.$el.ikSelect('redraw');
}, onInit: function (e) {
    e.$el.siblings('.ik_select_dropdown').find('.ik_select_list_inner').addClass('ps-scroll');
}});

function initSelect() {
    $('select.select:not(.select_has)').each(function(){
        $(this).ikSelect({customClass: $(this).attr('class')}).addClass('select_has');
    });
}

function reInitSelect() {
    initSelect();
    setTimeout(function () {
        reInitSelect();
    }, 100);
}

$(function () {
    reInitSelect();
});

$(function () {
    if ($('.vk-widget').length) {
        $(window).on('resize.VKWidget', function () {
            VK.Widgets.Group("vk_groups", {mode: 3, width: $('#vk_groups').parent().width(), color3: '6F9D3A'}, 20003922);
            $('#vk_groups *').remove();
        }).triggerHandler('resize.VKWidget');
    }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwiZmlsdGVycy5qcyIsInJhbmdlLXNsaWRlci5qcyIsInNlbGVjdC5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIiwicHJvZHVjdHMtbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gOTM1LCAkc2NyZWVuTGcgPSAxMTcwO1xuIiwiZnVuY3Rpb24gY2xvc2VIZWFkZXJIaWRkZW4oKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLW1lbnUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS5yZW1vdmVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZU91dCgyMDApO1xuICAgIC8vJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VIZWFkZXJTZWFyY2goKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9fc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tbWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJTZWFyY2goKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgLy8kKCdodG1sJykudG9nZ2xlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlckhpZGRlbigpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX3NlYXJjaF9vcGVuZWQnKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5IZWFkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQod2luZG93KS5vZmYoJy5hZmZpeCcpO1xuICAgICAgICAkKCcuYWZmaXgtY29sJykucmVtb3ZlRGF0YSgnYnMuYWZmaXgnKS5yZW1vdmVDbGFzcygnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbScpO1xuICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJycpO1xuXG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlbk1kIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlcl9faGlkZGVuJyk7XG5cbiAgICAgICAgICAgICQoJy5tZW51LWNhdGFsb2d1ZScpLmluc2VydEFmdGVyKCcubWVudV9faXRlbV9sdmxfMTplcSgwKScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX2hpZGRlbi10b3AnKS5wcmVwZW5kVG8oJy5oZWFkZXIgLmdyaWRfX2NvbF8yJyk7XG5cbiAgICAgICAgICAgICQoJy5tZW51LWNhdGFsb2d1ZScpLnByZXBlbmRUbygnLmFmZml4LWNvbCcpLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmFmZml4LWNvbCcpLmNzcygndG9wJywgJycpLmFmZml4KHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMudG9wID0gJCgnLm1lbnUnKS5vZmZzZXQoKS50b3AgLSAyMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYm90dG9tID0gJCgnLndyYXBwZXInKS5oZWlnaHQoKSAtICQoJy5hZmZpeC1jb2wtY29udGFpbmVyJykub2Zmc2V0KCkudG9wIC0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKS5vdXRlckhlaWdodChmYWxzZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5vbignYWZmaXguYnMuYWZmaXggYWZmaXgtYm90dG9tLmJzLmFmZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJCh0aGlzKS5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VySGFuZGxlcignYWZmaXguYnMuYWZmaXgnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLkhlYWRlcicpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubWVudV9faXRlbV9zdWJtZW51Pi5tZW51X19idG4sIC5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51Pi5tZW51LWNhdGFsb2d1ZV9fYnRuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JylcbiAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5uZXh0KCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLnRvZ2dsZSgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKS5lbmQoKSlcbiAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5wYXJlbnRzKCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmhpZGUoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfSk7XG59KTsiLCIiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbC5hdHRhY2hGaWx0ZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICQoJy5maWx0ZXJzW2RhdGEtc2VjdGlvbl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgdmFyIHNlY3QgPSAkKCcjJyArICQodGhpcykuZGF0YSgnc2VjdGlvbicpKTtcbiAgICAgICAgICAgdmFyIHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDU0IC0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgIHZhciBib3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyA1NCAtIChzZWN0Lm9mZnNldCgpLnRvcCArIHNlY3QuaGVpZ2h0KCkgLSAxMDApO1xuICAgICAgICAgICBpZiAodG9wID49IDAgJiYgYm90dG9tIDwgMCl7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCQodGhpcykub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmaWx0ZXJzX2ZpeGVkJykuZmluZCgnLmZpbHRlcnNfX2lubmVyJykub3V0ZXJXaWR0aCgkKHRoaXMpLm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCcnKTtcbiAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpbHRlcnNfZml4ZWQnKS5maW5kKCcuZmlsdGVyc19faW5uZXInKS5vdXRlcldpZHRoKCcnKTtcbiAgICAgICAgICAgfVxuICAgICAgIH0pO1xuICAgIH0pO1xuICAgICQod2luZG93KS5vbigncmVzaXplLmNvcnJlY3RseUZpbHRlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudHJpZ2dlcignc2Nyb2xsLmF0dGFjaEZpbHRlcnMnKTtcbiAgICB9KVxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJhbmdlLXNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmlvblJhbmdlU2xpZGVyKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgICAgICAgICBtaW46ICQodGhpcykuZGF0YSgncnMtbWluJyksXG4gICAgICAgICAgICBtYXg6ICQodGhpcykuZGF0YSgncnMtbWF4JyksXG4gICAgICAgICAgICBmcm9tOiAkKHRoaXMpLmRhdGEoJ3JzLWZyb20nKSxcbiAgICAgICAgICAgIHRvOiAkKHRoaXMpLmRhdGEoJ3JzLXRvJyksXG4gICAgICAgICAgICBzdGVwOiAxMDAsXG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS52YWwoZGF0YS5mcm9tKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX190bycpLnZhbChkYXRhLnRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GaW5pc2g6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2lucHV0JykuZGF0YShcImlvblJhbmdlU2xpZGVyXCIpO1xuXG4gICAgICAgICAgICBzbGlkZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBmcm9tOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2lucHV0JykuZGF0YShcImlvblJhbmdlU2xpZGVyXCIpO1xuXG4gICAgICAgICAgICBzbGlkZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTsiLCIkLmlrU2VsZWN0LmV4dGVuZERlZmF1bHRzKHthdXRvV2lkdGg6IGZhbHNlLCBkZEZ1bGxXaWR0aDogZmFsc2UsIGR5bmFtaWNXaWR0aDogZmFsc2UsIGV4dHJhY3RMaW5rOiBmYWxzZSwgZGRNYXhIZWlnaHQ6IDIwMCwgb25TaG93OiBmdW5jdGlvbiAoZSl7XG4gICAgZS4kZWwuc2libGluZ3MoJy5pa19zZWxlY3RfbGluaycpLmFkZENsYXNzKCdpa19zZWxlY3RfbGlua19vcGVuZWQnKTtcbn0sIG9uSGlkZTogZnVuY3Rpb24gKGUpe1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2xpbmsnKS5yZW1vdmVDbGFzcygnaWtfc2VsZWN0X2xpbmtfb3BlbmVkJyk7XG4gICAgZS4kZWwuaWtTZWxlY3QoJ3JlZHJhdycpO1xufSwgb25Jbml0OiBmdW5jdGlvbiAoZSkge1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2Ryb3Bkb3duJykuZmluZCgnLmlrX3NlbGVjdF9saXN0X2lubmVyJykuYWRkQ2xhc3MoJ3BzLXNjcm9sbCcpO1xufX0pO1xuXG5mdW5jdGlvbiBpbml0U2VsZWN0KCkge1xuICAgICQoJ3NlbGVjdC5zZWxlY3Q6bm90KC5zZWxlY3RfaGFzKScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5pa1NlbGVjdCh7Y3VzdG9tQ2xhc3M6ICQodGhpcykuYXR0cignY2xhc3MnKX0pLmFkZENsYXNzKCdzZWxlY3RfaGFzJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlSW5pdFNlbGVjdCgpIHtcbiAgICBpbml0U2VsZWN0KCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlSW5pdFNlbGVjdCgpO1xuICAgIH0sIDEwMCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHJlSW5pdFNlbGVjdCgpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJy52ay13aWRnZXQnKS5sZW5ndGgpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuVktXaWRnZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBWSy5XaWRnZXRzLkdyb3VwKFwidmtfZ3JvdXBzXCIsIHttb2RlOiAzLCB3aWR0aDogJCgnI3ZrX2dyb3VwcycpLnBhcmVudCgpLndpZHRoKCksIGNvbG9yMzogJzZGOUQzQSd9LCAyMDAwMzkyMik7XG4gICAgICAgICAgICAkKCcjdmtfZ3JvdXBzIConKS5yZW1vdmUoKTtcbiAgICAgICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5WS1dpZGdldCcpO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5zbGlkZXItbWFpbicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1sZWZ0XCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG5cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucHJvZHVjdHMtbGlzdF9zbGljaycpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgY3NzRWFzZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgYXNOYXZGb3I6ICcnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDc5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlbkxnIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICB9KTtcbn0pOyJdfQ==
