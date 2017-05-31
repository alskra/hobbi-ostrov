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
            min: $this.data('rs-min'),
            max: $this.data('rs-max'),
            from: $this.data('rs-from'),
            to: $this.data('rs-to'),
            step: $this.data('rs-step'),
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

    $(window).on('resize.select', function () {
        $('select.select.select_has').ikSelect('redraw');
    });
});

$(function () {
    $('body').on('click', '.set-display__view', function () {
        $(this).addClass('set-display__view_active').siblings('.set-display__view').removeClass('set-display__view_active');

        $('#' + $(this).closest('.set-display').data('for-list'))
            .removeClass('products-list_view_list products-list_view_grid')
            .addClass('products-list_view_' + $(this).data('view'));
    });

    $(window).on('resize.setDisplay', function () {
        if (Modernizr.mq('(max-width: ' + ($screenSm - 1) + 'px)')){
            $('.set-display__view_grid').click();
        }
        else {
            $('.set-display__view_list').click();
        }
    }).triggerHandler('resize.setDisplay');
});

$(function () {
    $('.products-list__inner.slick-slider').slick({
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwiZmlsdGVycy5qcyIsInJhbmdlLXNsaWRlci5qcyIsInNlbGVjdC5qcyIsInNldC1kaXNwbGF5LmpzIiwicHJvZHVjdHMtbGlzdC5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gOTM1LCAkc2NyZWVuTGcgPSAxMTcwO1xuIiwiZnVuY3Rpb24gY2xvc2VIZWFkZXJIaWRkZW4oKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLW1lbnUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS5yZW1vdmVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZU91dCgyMDApO1xuICAgIC8vJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VIZWFkZXJTZWFyY2goKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9fc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tbWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJTZWFyY2goKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgLy8kKCdodG1sJykudG9nZ2xlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlckhpZGRlbigpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX3NlYXJjaF9vcGVuZWQnKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5IZWFkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQod2luZG93KS5vZmYoJy5hZmZpeCcpO1xuICAgICAgICAkKCcuYWZmaXgtY29sJykucmVtb3ZlRGF0YSgnYnMuYWZmaXgnKS5yZW1vdmVDbGFzcygnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbScpO1xuICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJycpO1xuXG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlbk1kIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlcl9faGlkZGVuJyk7XG5cbiAgICAgICAgICAgICQoJy5tZW51LWNhdGFsb2d1ZScpLmluc2VydEFmdGVyKCcubWVudV9faXRlbV9sdmxfMTplcSgwKScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX2hpZGRlbi10b3AnKS5wcmVwZW5kVG8oJy5oZWFkZXIgLmdyaWRfX2NvbF8yJyk7XG5cbiAgICAgICAgICAgICQoJy5tZW51LWNhdGFsb2d1ZScpLnByZXBlbmRUbygnLmFmZml4LWNvbCcpLnNob3coKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmFmZml4LWNvbCcpLmNzcygndG9wJywgJycpLmFmZml4KHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMudG9wID0gJCgnLm1lbnUnKS5vZmZzZXQoKS50b3AgLSAyMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYm90dG9tID0gJCgnLndyYXBwZXInKS5oZWlnaHQoKSAtICQoJy5hZmZpeC1jb2wtY29udGFpbmVyJykub2Zmc2V0KCkudG9wIC0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKS5vdXRlckhlaWdodChmYWxzZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5vbignYWZmaXguYnMuYWZmaXggYWZmaXgtYm90dG9tLmJzLmFmZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJCh0aGlzKS5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VySGFuZGxlcignYWZmaXguYnMuYWZmaXgnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLkhlYWRlcicpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubWVudV9faXRlbV9zdWJtZW51Pi5tZW51X19idG4sIC5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51Pi5tZW51LWNhdGFsb2d1ZV9fYnRuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JylcbiAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5uZXh0KCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLnRvZ2dsZSgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKS5lbmQoKSlcbiAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5wYXJlbnRzKCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmhpZGUoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgfSk7XG59KTsiLCIiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbC5hdHRhY2hGaWx0ZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICQoJy5maWx0ZXJzW2RhdGEtc2VjdGlvbl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgdmFyIHNlY3QgPSAkKCcjJyArICQodGhpcykuZGF0YSgnc2VjdGlvbicpKTtcbiAgICAgICAgICAgdmFyIHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDU0IC0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgIHZhciBib3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyA1NCAtIChzZWN0Lm9mZnNldCgpLnRvcCArIHNlY3QuaGVpZ2h0KCkgLSAxMDApO1xuICAgICAgICAgICBpZiAodG9wID49IDAgJiYgYm90dG9tIDwgMCl7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCQodGhpcykub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmaWx0ZXJzX2ZpeGVkJykuZmluZCgnLmZpbHRlcnNfX2lubmVyJykub3V0ZXJXaWR0aCgkKHRoaXMpLm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCcnKTtcbiAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpbHRlcnNfZml4ZWQnKS5maW5kKCcuZmlsdGVyc19faW5uZXInKS5vdXRlcldpZHRoKCcnKTtcbiAgICAgICAgICAgfVxuICAgICAgIH0pO1xuICAgIH0pO1xuICAgICQod2luZG93KS5vbigncmVzaXplLmNvcnJlY3RseUZpbHRlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudHJpZ2dlcignc2Nyb2xsLmF0dGFjaEZpbHRlcnMnKTtcbiAgICB9KVxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJhbmdlLXNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmlvblJhbmdlU2xpZGVyKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgICAgICAgICBtaW46ICR0aGlzLmRhdGEoJ3JzLW1pbicpLFxuICAgICAgICAgICAgbWF4OiAkdGhpcy5kYXRhKCdycy1tYXgnKSxcbiAgICAgICAgICAgIGZyb206ICR0aGlzLmRhdGEoJ3JzLWZyb20nKSxcbiAgICAgICAgICAgIHRvOiAkdGhpcy5kYXRhKCdycy10bycpLFxuICAgICAgICAgICAgc3RlcDogJHRoaXMuZGF0YSgncnMtc3RlcCcpLFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmluaXNoOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgZnJvbTogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgdG86ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7IiwiJC5pa1NlbGVjdC5leHRlbmREZWZhdWx0cyh7YXV0b1dpZHRoOiBmYWxzZSwgZGRGdWxsV2lkdGg6IGZhbHNlLCBkeW5hbWljV2lkdGg6IGZhbHNlLCBleHRyYWN0TGluazogZmFsc2UsIGRkTWF4SGVpZ2h0OiAyMDAsIG9uU2hvdzogZnVuY3Rpb24gKGUpe1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2xpbmsnKS5hZGRDbGFzcygnaWtfc2VsZWN0X2xpbmtfb3BlbmVkJyk7XG59LCBvbkhpZGU6IGZ1bmN0aW9uIChlKXtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9saW5rJykucmVtb3ZlQ2xhc3MoJ2lrX3NlbGVjdF9saW5rX29wZW5lZCcpO1xuICAgIGUuJGVsLmlrU2VsZWN0KCdyZWRyYXcnKTtcbn0sIG9uSW5pdDogZnVuY3Rpb24gKGUpIHtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9kcm9wZG93bicpLmZpbmQoJy5pa19zZWxlY3RfbGlzdF9pbm5lcicpLmFkZENsYXNzKCdwcy1zY3JvbGwnKTtcbn19KTtcblxuZnVuY3Rpb24gaW5pdFNlbGVjdCgpIHtcbiAgICAkKCdzZWxlY3Quc2VsZWN0Om5vdCguc2VsZWN0X2hhcyknKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuaWtTZWxlY3Qoe2N1c3RvbUNsYXNzOiAkKHRoaXMpLmF0dHIoJ2NsYXNzJyl9KS5hZGRDbGFzcygnc2VsZWN0X2hhcycpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZUluaXRTZWxlY3QoKSB7XG4gICAgaW5pdFNlbGVjdCgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZUluaXRTZWxlY3QoKTtcbiAgICB9LCAxMDApO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICByZUluaXRTZWxlY3QoKTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnc2VsZWN0LnNlbGVjdC5zZWxlY3RfaGFzJykuaWtTZWxlY3QoJ3JlZHJhdycpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuc2V0LWRpc3BsYXlfX3ZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NldC1kaXNwbGF5X192aWV3X2FjdGl2ZScpLnNpYmxpbmdzKCcuc2V0LWRpc3BsYXlfX3ZpZXcnKS5yZW1vdmVDbGFzcygnc2V0LWRpc3BsYXlfX3ZpZXdfYWN0aXZlJyk7XG5cbiAgICAgICAgJCgnIycgKyAkKHRoaXMpLmNsb3Nlc3QoJy5zZXQtZGlzcGxheScpLmRhdGEoJ2Zvci1saXN0JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RzLWxpc3Rfdmlld19saXN0IHByb2R1Y3RzLWxpc3Rfdmlld19ncmlkJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHJvZHVjdHMtbGlzdF92aWV3XycgKyAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zZXREaXNwbGF5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5TbSAtIDEpICsgJ3B4KScpKXtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19ncmlkJykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19saXN0JykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuc2V0RGlzcGxheScpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnByb2R1Y3RzLWxpc3RfX2lubmVyLnNsaWNrLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgY3NzRWFzZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgYXNOYXZGb3I6ICcnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDc5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlbkxnIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICB9KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCcudmstd2lkZ2V0JykubGVuZ3RoKSB7XG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplLlZLV2lkZ2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVksuV2lkZ2V0cy5Hcm91cChcInZrX2dyb3Vwc1wiLCB7bW9kZTogMywgd2lkdGg6ICQoJyN2a19ncm91cHMnKS5wYXJlbnQoKS53aWR0aCgpLCBjb2xvcjM6ICc2RjlEM0EnfSwgMjAwMDM5MjIpO1xuICAgICAgICAgICAgJCgnI3ZrX2dyb3VwcyAqJykucmVtb3ZlKCk7XG4gICAgICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuVktXaWRnZXQnKTtcbiAgICB9XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuc2xpZGVyLW1haW4nKS5zbGljayh7XG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtbGVmdFwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHRcIj48L2J1dHRvbj4nLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXG4gICAgICAgIF1cbiAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgIH0pO1xufSk7Il19
