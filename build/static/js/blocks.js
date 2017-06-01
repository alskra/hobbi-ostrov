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



$(function () {

    $('.slider-product-card').each(function () {
        var $this = $(this);
        $this.find('.slider-product-card__main').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            prevArrow: '<button type="button" class="slick-prev icon icon-angle-right-2"></button>',
            nextArrow: '<button type="button" class="slick-next icon icon-angle-right-2"></button>',
            autoplay: false,
            autoplaySpeed: 5000,
            zIndex: 1,
            lazyLoad: 'ondemand',
            asNavFor: $this.find('.slider-product-card__thumbs'),
            responsive: [

            ]
        }).on('lazyLoaded', function (event, slick, image, imageSource) {
            $(image).closest('.slick-slide').removeClass('loading loading_before');
        });

        $this.find('.slider-product-card__thumbs').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            fade: false,
            cssEase: 'ease',
            slidesToShow: 3,
            slidesToScroll: 1,
            mobileFirst: true,
            prevArrow: '<button type="button" class="slick-prev icon icon-angle-right"></button>',
            nextArrow: '<button type="button" class="slick-next icon icon-angle-right"></button>',
            autoplay: false,
            autoplaySpeed: 5000,
            zIndex: 1,
            lazyLoad: 'ondemand',
            asNavFor: $this.find('.slider-product-card__main'),
            focusOnSelect: true,
            vertical: false,
            verticalSwiping: true,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: $screenSm - 1,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        vertical: true
                    }
                }
            ]
        }).on('lazyLoaded', function (event, slick, image, imageSource) {
            $(image).closest('.slick-slide').removeClass('loading loading_before');
        });
    });

    $(window).on('resize.sliderProductCard', function () {
        setTimeout(function () {
            $('.slider-product-card__thumbs').each(function () {
                var $this = $(this);

                if (Modernizr.mq('(max-width: ' + ($screenSm - 1) + 'px)')){
                    $this.find('.slider-product-card__thumb-item').height('auto');
                    $this.find('.slick-track').height('auto');
                }
                else {
                    var heightItem = ($this.outerHeight() + 20)/3;
                    $this.find('.slider-product-card__thumb-item')
                        .css('height', heightItem - 20.5 + 'px');

                    $this.find('.slick-track')
                        .height($this.find('.slider-product-card__thumb-item').length*(heightItem + 20));
                }

                $this.slick('slickGoTo', 0, true);
                setTimeout(function () {
                    $this.css('opacity', 1);
                }, 400);
            });
        }, 200);
    }).triggerHandler('resize.sliderProductCard');
});

$(function () {
    $('body').on('click', '.counter__btn_dec', function () {
        var $input = $(this).siblings('.counter__input'),
            value = parseInt($input.val());
        value > 1 ? $input.val(value - 1) : null
    }).on('click', '.counter__btn_inc', function () {
        var $input = $(this).siblings('.counter__input'),
            value = parseInt($input.val());
        $input.val(value + 1);
    }).on('change', '.counter__input', function () {
        $(this).val() <= 0 ? $(this).val(1) : null
    });

});

$(function () {

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
    $('body').on('click', '.filters .aside__header', function () {
        $('.filters__hidden').slideToggle(200);
    });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwic2xpZGVyLXByb2R1Y3QtY2FyZC5qcyIsImNvdW50ZXIuanMiLCJ0YWJzLmpzIiwicHJvZHVjdHMtbGlzdC5qcyIsImZpbHRlcnMuanMiLCJyYW5nZS1zbGlkZXIuanMiLCJzZWxlY3QuanMiLCJzZXQtZGlzcGxheS5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gOTM1LCAkc2NyZWVuTGcgPSAxMTcwO1xuIiwiZnVuY3Rpb24gY2xvc2VIZWFkZXJIaWRkZW4oKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLW1lbnUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS5yZW1vdmVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZU91dCgyMDApO1xuICAgIC8vJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VIZWFkZXJTZWFyY2goKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9fc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tbWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJTZWFyY2goKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgLy8kKCdodG1sJykudG9nZ2xlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlckhpZGRlbigpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX3NlYXJjaF9vcGVuZWQnKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5IZWFkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQod2luZG93KS5vZmYoJy5hZmZpeCcpO1xuICAgICAgICAkKCcuYWZmaXgtY29sJykucmVtb3ZlRGF0YSgnYnMuYWZmaXgnKS5yZW1vdmVDbGFzcygnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbScpO1xuICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJycpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJy5hZmZpeCcpO1xuICAgICAgICAgICAgJCgnLmFmZml4LWNvbCcpLnJlbW92ZURhdGEoJ2JzLmFmZml4JykucmVtb3ZlQ2xhc3MoJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20nKTtcbiAgICAgICAgICAgICQoJy5hZmZpeC1jb2wtcG9zaXRpb24nKS5jc3MoJ21pbi1oZWlnaHQnLCAnJyk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyX19oaWRkZW4nKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykuaW5zZXJ0QWZ0ZXIoJy5tZW51X19pdGVtX2x2bF8xOmVxKDApJykuc2hvdygpO1xuXG4gICAgICAgICAgICAkKCcuZmlsdGVycycpLmluc2VydEFmdGVyKCcuY2F0ZWdvcmllcy1saXN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyIC5ncmlkX19jb2xfMicpO1xuXG4gICAgICAgICAgICAkKCcubWVudS1jYXRhbG9ndWUnKS5wcmVwZW5kVG8oJy5hZmZpeC1jb2wnKS5zaG93KCk7XG5cbiAgICAgICAgICAgICQoJy5maWx0ZXJzJykuYXBwZW5kVG8oJy5hZmZpeC1jb2wnKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmFmZml4LWNvbCcpLmNzcygndG9wJywgJycpLmFmZml4KHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMudG9wID0gJCgnLm1lbnUnKS5vZmZzZXQoKS50b3AgLSAyMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuYm90dG9tID0gJCgnLndyYXBwZXInKS5oZWlnaHQoKSAtICQoJy5hZmZpeC1jb2wtY29udGFpbmVyJykub2Zmc2V0KCkudG9wIC0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKS5vdXRlckhlaWdodChmYWxzZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5vbignYWZmaXguYnMuYWZmaXggYWZmaXgtYm90dG9tLmJzLmFmZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYWZmaXgtY29sLXBvc2l0aW9uJykuY3NzKCdtaW4taGVpZ2h0JywgJCh0aGlzKS5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VySGFuZGxlcignYWZmaXguYnMuYWZmaXgnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLkhlYWRlcicpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubWVudV9faXRlbV9zdWJtZW51Pi5tZW51X19idG4sIC5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51Pi5tZW51LWNhdGFsb2d1ZV9fYnRuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSB8fCB0cnVlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKVxuICAgICAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5uZXh0KCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLnRvZ2dsZSgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKS5lbmQoKSlcbiAgICAgICAgICAgICAgICAubm90KCQodGhpcykucGFyZW50cygnLm1lbnVfX3N1Ym1lbnUsIC5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfVxuICAgIH0pLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghJChlLnRhcmdldCkuY2xvc2VzdCgnLm1lbnUsIC5tZW51LWNhdGFsb2d1ZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnLm1lbnVfX3N1Ym1lbnUsIC5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCIiLCIkKGZ1bmN0aW9uICgpIHtcblxuICAgICQoJy5zbGlkZXItcHJvZHVjdC1jYXJkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX19tYWluJykuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYnMnKSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcblxuICAgICAgICAgICAgXVxuICAgICAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1icycpLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2UnLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHRcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgekluZGV4OiAxLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgICBhc05hdkZvcjogJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX21haW4nKSxcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWUsXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuU20gLSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zbGlkZXJQcm9kdWN0Q2FyZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWJzJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlblNtIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWItaXRlbScpLmhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpY2stdHJhY2snKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHRJdGVtID0gKCR0aGlzLm91dGVySGVpZ2h0KCkgKyAyMCkvMztcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1iLWl0ZW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgaGVpZ2h0SXRlbSAtIDIwLjUgKyAncHgnKTtcblxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpY2stdHJhY2snKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmhlaWdodCgkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWItaXRlbScpLmxlbmd0aCooaGVpZ2h0SXRlbSArIDIwKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMuc2xpY2soJ3NsaWNrR29UbycsIDAsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5zbGlkZXJQcm9kdWN0Q2FyZCcpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuY291bnRlcl9fYnRuX2RlYycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuc2libGluZ3MoJy5jb3VudGVyX19pbnB1dCcpLFxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCgkaW5wdXQudmFsKCkpO1xuICAgICAgICB2YWx1ZSA+IDEgPyAkaW5wdXQudmFsKHZhbHVlIC0gMSkgOiBudWxsXG4gICAgfSkub24oJ2NsaWNrJywgJy5jb3VudGVyX19idG5faW5jJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5zaWJsaW5ncygnLmNvdW50ZXJfX2lucHV0JyksXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSk7XG4gICAgICAgICRpbnB1dC52YWwodmFsdWUgKyAxKTtcbiAgICB9KS5vbignY2hhbmdlJywgJy5jb3VudGVyX19pbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS52YWwoKSA8PSAwID8gJCh0aGlzKS52YWwoMSkgOiBudWxsXG4gICAgfSk7XG5cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuXG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucHJvZHVjdHMtbGlzdF9faW5uZXIuc2xpY2stc2xpZGVyJykuc2xpY2soe1xuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICBjc3NFYXNlOiAnZWFzZS1vdXQnLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICBhc05hdkZvcjogJycsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0NzksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlblNtIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuTGcgLSAxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZmlsdGVycyAuYXNpZGVfX2hlYWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmZpbHRlcnNfX2hpZGRlbicpLnNsaWRlVG9nZ2xlKDIwMCk7XG4gICAgfSk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucmFuZ2Utc2xpZGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2lucHV0JykuaW9uUmFuZ2VTbGlkZXIoe1xuICAgICAgICAgICAgdHlwZTogXCJkb3VibGVcIixcbiAgICAgICAgICAgIG1pbjogJHRoaXMuZGF0YSgncnMtbWluJyksXG4gICAgICAgICAgICBtYXg6ICR0aGlzLmRhdGEoJ3JzLW1heCcpLFxuICAgICAgICAgICAgZnJvbTogJHRoaXMuZGF0YSgncnMtZnJvbScpLFxuICAgICAgICAgICAgdG86ICR0aGlzLmRhdGEoJ3JzLXRvJyksXG4gICAgICAgICAgICBzdGVwOiAkdGhpcy5kYXRhKCdycy1zdGVwJyksXG4gICAgICAgICAgICBvblN0YXJ0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS52YWwoZGF0YS5mcm9tKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX190bycpLnZhbChkYXRhLnRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25GaW5pc2g6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2lucHV0JykuZGF0YShcImlvblJhbmdlU2xpZGVyXCIpO1xuXG4gICAgICAgICAgICBzbGlkZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBmcm9tOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2lucHV0JykuZGF0YShcImlvblJhbmdlU2xpZGVyXCIpO1xuXG4gICAgICAgICAgICBzbGlkZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICB0bzogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTsiLCIkLmlrU2VsZWN0LmV4dGVuZERlZmF1bHRzKHthdXRvV2lkdGg6IGZhbHNlLCBkZEZ1bGxXaWR0aDogZmFsc2UsIGR5bmFtaWNXaWR0aDogZmFsc2UsIGV4dHJhY3RMaW5rOiBmYWxzZSwgZGRNYXhIZWlnaHQ6IDIwMCwgb25TaG93OiBmdW5jdGlvbiAoZSl7XG4gICAgZS4kZWwuc2libGluZ3MoJy5pa19zZWxlY3RfbGluaycpLmFkZENsYXNzKCdpa19zZWxlY3RfbGlua19vcGVuZWQnKTtcbn0sIG9uSGlkZTogZnVuY3Rpb24gKGUpe1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2xpbmsnKS5yZW1vdmVDbGFzcygnaWtfc2VsZWN0X2xpbmtfb3BlbmVkJyk7XG4gICAgZS4kZWwuaWtTZWxlY3QoJ3JlZHJhdycpO1xufSwgb25Jbml0OiBmdW5jdGlvbiAoZSkge1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2Ryb3Bkb3duJykuZmluZCgnLmlrX3NlbGVjdF9saXN0X2lubmVyJykuYWRkQ2xhc3MoJ3BzLXNjcm9sbCcpO1xufX0pO1xuXG5mdW5jdGlvbiBpbml0U2VsZWN0KCkge1xuICAgICQoJ3NlbGVjdC5zZWxlY3Q6bm90KC5zZWxlY3RfaGFzKScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5pa1NlbGVjdCh7Y3VzdG9tQ2xhc3M6ICQodGhpcykuYXR0cignY2xhc3MnKX0pLmFkZENsYXNzKCdzZWxlY3RfaGFzJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlSW5pdFNlbGVjdCgpIHtcbiAgICBpbml0U2VsZWN0KCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlSW5pdFNlbGVjdCgpO1xuICAgIH0sIDEwMCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHJlSW5pdFNlbGVjdCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdzZWxlY3Quc2VsZWN0LnNlbGVjdF9oYXMnKS5pa1NlbGVjdCgncmVkcmF3Jyk7XG4gICAgfSk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5zZXQtZGlzcGxheV9fdmlldycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2V0LWRpc3BsYXlfX3ZpZXdfYWN0aXZlJykuc2libGluZ3MoJy5zZXQtZGlzcGxheV9fdmlldycpLnJlbW92ZUNsYXNzKCdzZXQtZGlzcGxheV9fdmlld19hY3RpdmUnKTtcblxuICAgICAgICAkKCcjJyArICQodGhpcykuY2xvc2VzdCgnLnNldC1kaXNwbGF5JykuZGF0YSgnZm9yLWxpc3QnKSlcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygncHJvZHVjdHMtbGlzdF92aWV3X2xpc3QgcHJvZHVjdHMtbGlzdF92aWV3X2dyaWQnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0cy1saXN0X3ZpZXdfJyArICQodGhpcykuZGF0YSgndmlldycpKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLnNldERpc3BsYXknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlblNtIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgJCgnLnNldC1kaXNwbGF5X192aWV3X2dyaWQnKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLnNldC1kaXNwbGF5X192aWV3X2xpc3QnKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5zZXREaXNwbGF5Jyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCgnLnZrLXdpZGdldCcpLmxlbmd0aCkge1xuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5WS1dpZGdldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFZLLldpZGdldHMuR3JvdXAoXCJ2a19ncm91cHNcIiwge21vZGU6IDMsIHdpZHRoOiAkKCcjdmtfZ3JvdXBzJykucGFyZW50KCkud2lkdGgoKSwgY29sb3IzOiAnNkY5RDNBJ30sIDIwMDAzOTIyKTtcbiAgICAgICAgICAgICQoJyN2a19ncm91cHMgKicpLnJlbW92ZSgpO1xuICAgICAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLlZLV2lkZ2V0Jyk7XG4gICAgfVxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnNsaWRlci1tYWluJykuc2xpY2soe1xuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXYgaWNvbiBpY29uLWFuZ2xlLWxlZnRcIj48L2J1dHRvbj4nLFxuICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0XCI+PC9idXR0b24+JyxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcblxuICAgICAgICBdXG4gICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICB9KTtcbn0pOyJdfQ==
