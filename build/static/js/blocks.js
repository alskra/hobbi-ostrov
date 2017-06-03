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
        var $affixColContainer = $('.affix-col-container'), $affixCol = $('.affix-col');

        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')){
            $('.header__hidden-top').prependTo('.header__hidden');

            $('.menu-catalogue').insertBefore('.menu__item_lvl_1:eq(0)').show();

            $('.filters').insertAfter('.categories-list');
            $('.filters__hidden').insertBefore('.wrapper').show();

            $affixColContainer.css('min-height', '');

            $(window).off('.affix');
            $affixCol.removeData('bs.affix').removeClass('affix affix-top affix-bottom affix-inited').css('top', '');
        }
        else {
            $('.header__hidden-top').prependTo('.header .grid__col_2');

            $('.menu-catalogue').prependTo($affixCol).show();

            $('.filters').appendTo($affixCol);
            $('.filters__hidden').appendTo('.filters').show();

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

                //console.log($affixCol.data('bs.affix').options.offset);
            }, 200);
        }
    }).triggerHandler('resize.Header');
});

$(function () {
    $('body').on('click', '.menu__item_submenu>.menu__btn>.menu__icon, .menu-catalogue__item_submenu>.menu-catalogue__btn>.menu-catalogue__icon', function (e) {

        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')) {
            e.preventDefault();

            $('.menu__submenu, .menu-catalogue__submenu')
                .not($(this).parent().next('.menu__submenu, .menu-catalogue__submenu').toggleClass('opened').toggle().parent().toggleClass('opened').end())
                .not($(this).parents('.menu__submenu, .menu-catalogue__submenu'))
                .removeClass('opened').hide().parent().removeClass('opened');
        }

    }).on('click', function (e) {
        if (Modernizr.mq('(max-width: ' + ($screenMd - 1) + 'px)')) {
            if (!$(e.target).closest('.menu__item_submenu>.menu__btn>.menu__icon, .menu-catalogue__item_submenu>.menu-catalogue__btn>.menu-catalogue__icon').length) {
                $('.menu__submenu, .menu-catalogue__submenu').removeClass('opened').hide().parent().removeClass('opened');
            }
        }
    });

    $('body').on('mouseenter', '.menu-catalogue__item_submenu', function (e) {
        if (Modernizr.mq('(min-width: ' + ($screenMd) + 'px)')) {
            e.preventDefault();

            $(this).children('.menu-catalogue__submenu').addClass('opened').stop(true, false).hide().delay(100).fadeIn(100).parent().addClass('opened');
        }
    }).on('mouseleave', '.menu-catalogue__item_submenu', function (e) {
        if (Modernizr.mq('(min-width: ' + ($screenMd) + 'px)')) {
            e.preventDefault();

            $(this).children('.menu-catalogue__submenu').removeClass('opened').stop(true, false).hide().parent().removeClass('opened');
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
        $('html, body').toggleClass('open_left');
        $('.wrapper').toggleClass('wrapper_open_left');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwic2xpZGVyLXByb2R1Y3QtY2FyZC5qcyIsImNvdW50ZXIuanMiLCJ0YWJzLmpzIiwicHJvZHVjdHMtbGlzdC5qcyIsImZpbHRlcnMuanMiLCJyYW5nZS1zbGlkZXIuanMiLCJzZWxlY3QuanMiLCJzZXQtZGlzcGxheS5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICRzY3JlZW5TbSA9IDc2OCwgJHNjcmVlbk1kID0gOTM1LCAkc2NyZWVuTGcgPSAxMTcwO1xuIiwiZnVuY3Rpb24gY2xvc2VIZWFkZXJIaWRkZW4oKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLW1lbnUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS5yZW1vdmVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZU91dCgyMDApO1xuICAgIC8vJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VIZWFkZXJTZWFyY2goKSB7XG4gICAgJCgnLmhlYWRlcl9fYnRuLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9fc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tbWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJTZWFyY2goKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tbWVudV9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgLy8kKCdodG1sJykudG9nZ2xlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuaGVhZGVyX19idG4tc2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlckhpZGRlbigpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1zZWFyY2hfb3BlbmVkJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaCcpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX3NlYXJjaF9vcGVuZWQnKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgICQoJy5oZWFkZXJfX3NlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5IZWFkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkYWZmaXhDb2xDb250YWluZXIgPSAkKCcuYWZmaXgtY29sLWNvbnRhaW5lcicpLCAkYWZmaXhDb2wgPSAkKCcuYWZmaXgtY29sJyk7XG5cbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyX19oaWRkZW4nKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykuaW5zZXJ0QmVmb3JlKCcubWVudV9faXRlbV9sdmxfMTplcSgwKScpLnNob3coKTtcblxuICAgICAgICAgICAgJCgnLmZpbHRlcnMnKS5pbnNlcnRBZnRlcignLmNhdGVnb3JpZXMtbGlzdCcpO1xuICAgICAgICAgICAgJCgnLmZpbHRlcnNfX2hpZGRlbicpLmluc2VydEJlZm9yZSgnLndyYXBwZXInKS5zaG93KCk7XG5cbiAgICAgICAgICAgICRhZmZpeENvbENvbnRhaW5lci5jc3MoJ21pbi1oZWlnaHQnLCAnJyk7XG5cbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJy5hZmZpeCcpO1xuICAgICAgICAgICAgJGFmZml4Q29sLnJlbW92ZURhdGEoJ2JzLmFmZml4JykucmVtb3ZlQ2xhc3MoJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20gYWZmaXgtaW5pdGVkJykuY3NzKCd0b3AnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyIC5ncmlkX19jb2xfMicpO1xuXG4gICAgICAgICAgICAkKCcubWVudS1jYXRhbG9ndWUnKS5wcmVwZW5kVG8oJGFmZml4Q29sKS5zaG93KCk7XG5cbiAgICAgICAgICAgICQoJy5maWx0ZXJzJykuYXBwZW5kVG8oJGFmZml4Q29sKTtcbiAgICAgICAgICAgICQoJy5maWx0ZXJzX19oaWRkZW4nKS5hcHBlbmRUbygnLmZpbHRlcnMnKS5zaG93KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRhZmZpeENvbENvbnRhaW5lci5jc3MoJ21pbi1oZWlnaHQnLCAkYWZmaXhDb2wub3V0ZXJIZWlnaHQoZmFsc2UpKTtcblxuICAgICAgICAgICAgICAgICRhZmZpeENvbC5ub3QoJy5hZmZpeC1pbml0ZWQnKS5hZmZpeCh7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnRvcCA9ICQoJy5tZW51Jykub2Zmc2V0KCkudG9wIC0gMjApXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmJvdHRvbSA9ICQoJy53cmFwcGVyJykuaGVpZ2h0KCkgLSAkYWZmaXhDb2xDb250YWluZXIub2Zmc2V0KCkudG9wIC0gJGFmZml4Q29sQ29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCdhZmZpeC1pbml0ZWQnKTtcblxuICAgICAgICAgICAgICAgICRhZmZpeENvbC5kYXRhKCdicy5hZmZpeCcpLm9wdGlvbnMub2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICQoJy5tZW51Jykub2Zmc2V0KCkudG9wIC0gMjAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJCgnLndyYXBwZXInKS5oZWlnaHQoKSAtICRhZmZpeENvbENvbnRhaW5lci5vZmZzZXQoKS50b3AgLSAkYWZmaXhDb2xDb250YWluZXIub3V0ZXJIZWlnaHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRhZmZpeENvbC5hZmZpeCgnY2hlY2tQb3NpdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkYWZmaXhDb2wuZGF0YSgnYnMuYWZmaXgnKS5vcHRpb25zLm9mZnNldCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5IZWFkZXInKTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1lbnVfX2l0ZW1fc3VibWVudT4ubWVudV9fYnRuPi5tZW51X19pY29uLCAubWVudS1jYXRhbG9ndWVfX2l0ZW1fc3VibWVudT4ubWVudS1jYXRhbG9ndWVfX2J0bj4ubWVudS1jYXRhbG9ndWVfX2ljb24nLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlbk1kIC0gMSkgKyAncHgpJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJCgnLm1lbnVfX3N1Ym1lbnUsIC5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpXG4gICAgICAgICAgICAgICAgLm5vdCgkKHRoaXMpLnBhcmVudCgpLm5leHQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKS50b2dnbGVDbGFzcygnb3BlbmVkJykudG9nZ2xlKCkucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLmVuZCgpKVxuICAgICAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5wYXJlbnRzKCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9XG5cbiAgICB9KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5NZCAtIDEpICsgJ3B4KScpKSB7XG4gICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmNsb3Nlc3QoJy5tZW51X19pdGVtX3N1Ym1lbnU+Lm1lbnVfX2J0bj4ubWVudV9faWNvbiwgLm1lbnUtY2F0YWxvZ3VlX19pdGVtX3N1Ym1lbnU+Lm1lbnUtY2F0YWxvZ3VlX19idG4+Lm1lbnUtY2F0YWxvZ3VlX19pY29uJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLm1lbnVfX3N1Ym1lbnUsIC5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ21vdXNlZW50ZXInLCAnLm1lbnUtY2F0YWxvZ3VlX19pdGVtX3N1Ym1lbnUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOiAnICsgKCRzY3JlZW5NZCkgKyAncHgpJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykuYWRkQ2xhc3MoJ29wZW5lZCcpLnN0b3AodHJ1ZSwgZmFsc2UpLmhpZGUoKS5kZWxheSgxMDApLmZhZGVJbigxMDApLnBhcmVudCgpLmFkZENsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfVxuICAgIH0pLm9uKCdtb3VzZWxlYXZlJywgJy5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogJyArICgkc2NyZWVuTWQpICsgJ3B4KScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5zdG9wKHRydWUsIGZhbHNlKS5oaWRlKCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCIiLCIkKGZ1bmN0aW9uICgpIHtcblxuICAgICQoJy5zbGlkZXItcHJvZHVjdC1jYXJkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX19tYWluJykuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYnMnKSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcblxuICAgICAgICAgICAgXVxuICAgICAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1icycpLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2UnLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHRcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgekluZGV4OiAxLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgICBhc05hdkZvcjogJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX21haW4nKSxcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWUsXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuU20gLSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zbGlkZXJQcm9kdWN0Q2FyZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWJzJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlblNtIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWItaXRlbScpLmhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpY2stdHJhY2snKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHRJdGVtID0gKCR0aGlzLm91dGVySGVpZ2h0KCkgKyAyMCkvMztcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1iLWl0ZW0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgaGVpZ2h0SXRlbSAtIDIwLjUgKyAncHgnKTtcblxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpY2stdHJhY2snKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmhlaWdodCgkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWItaXRlbScpLmxlbmd0aCooaGVpZ2h0SXRlbSArIDIwKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHRoaXMuc2xpY2soJ3NsaWNrR29UbycsIDAsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5zbGlkZXJQcm9kdWN0Q2FyZCcpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuY291bnRlcl9fYnRuX2RlYycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuc2libGluZ3MoJy5jb3VudGVyX19pbnB1dCcpLFxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCgkaW5wdXQudmFsKCkpO1xuICAgICAgICB2YWx1ZSA+IDEgPyAkaW5wdXQudmFsKHZhbHVlIC0gMSkgOiBudWxsXG4gICAgfSkub24oJ2NsaWNrJywgJy5jb3VudGVyX19idG5faW5jJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5zaWJsaW5ncygnLmNvdW50ZXJfX2lucHV0JyksXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSk7XG4gICAgICAgICRpbnB1dC52YWwodmFsdWUgKyAxKTtcbiAgICB9KS5vbignY2hhbmdlJywgJy5jb3VudGVyX19pbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS52YWwoKSA8PSAwID8gJCh0aGlzKS52YWwoMSkgOiBudWxsXG4gICAgfSk7XG5cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuXG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucHJvZHVjdHMtbGlzdF9faW5uZXIuc2xpY2stc2xpZGVyJykuc2xpY2soe1xuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICBjc3NFYXNlOiAnZWFzZS1vdXQnLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICBhc05hdkZvcjogJycsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0NzksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlblNtIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuTGcgLSAxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuZmlsdGVycyAuYXNpZGVfX2hlYWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnRvZ2dsZUNsYXNzKCdvcGVuX2xlZnQnKTtcbiAgICAgICAgJCgnLndyYXBwZXInKS50b2dnbGVDbGFzcygnd3JhcHBlcl9vcGVuX2xlZnQnKTtcbiAgICB9KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5yYW5nZS1zbGlkZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9faW5wdXQnKS5pb25SYW5nZVNsaWRlcih7XG4gICAgICAgICAgICB0eXBlOiBcImRvdWJsZVwiLFxuICAgICAgICAgICAgbWluOiAkdGhpcy5kYXRhKCdycy1taW4nKSxcbiAgICAgICAgICAgIG1heDogJHRoaXMuZGF0YSgncnMtbWF4JyksXG4gICAgICAgICAgICBmcm9tOiAkdGhpcy5kYXRhKCdycy1mcm9tJyksXG4gICAgICAgICAgICB0bzogJHRoaXMuZGF0YSgncnMtdG8nKSxcbiAgICAgICAgICAgIHN0ZXA6ICR0aGlzLmRhdGEoJ3JzLXN0ZXAnKSxcbiAgICAgICAgICAgIG9uU3RhcnQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS52YWwoZGF0YS5mcm9tKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX190bycpLnZhbChkYXRhLnRvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZpbmlzaDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX2Zyb20nKS52YWwoZGF0YS5mcm9tKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX190bycpLnZhbChkYXRhLnRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9faW5wdXQnKS5kYXRhKFwiaW9uUmFuZ2VTbGlkZXJcIik7XG5cbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIGZyb206ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX190bycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGVyID0gJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9faW5wdXQnKS5kYXRhKFwiaW9uUmFuZ2VTbGlkZXJcIik7XG5cbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgIHRvOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pOyIsIiQuaWtTZWxlY3QuZXh0ZW5kRGVmYXVsdHMoe2F1dG9XaWR0aDogZmFsc2UsIGRkRnVsbFdpZHRoOiBmYWxzZSwgZHluYW1pY1dpZHRoOiBmYWxzZSwgZXh0cmFjdExpbms6IGZhbHNlLCBkZE1heEhlaWdodDogMjAwLCBvblNob3c6IGZ1bmN0aW9uIChlKXtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9saW5rJykuYWRkQ2xhc3MoJ2lrX3NlbGVjdF9saW5rX29wZW5lZCcpO1xufSwgb25IaWRlOiBmdW5jdGlvbiAoZSl7XG4gICAgZS4kZWwuc2libGluZ3MoJy5pa19zZWxlY3RfbGluaycpLnJlbW92ZUNsYXNzKCdpa19zZWxlY3RfbGlua19vcGVuZWQnKTtcbiAgICBlLiRlbC5pa1NlbGVjdCgncmVkcmF3Jyk7XG59LCBvbkluaXQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgZS4kZWwuc2libGluZ3MoJy5pa19zZWxlY3RfZHJvcGRvd24nKS5maW5kKCcuaWtfc2VsZWN0X2xpc3RfaW5uZXInKS5hZGRDbGFzcygncHMtc2Nyb2xsJyk7XG59fSk7XG5cbmZ1bmN0aW9uIGluaXRTZWxlY3QoKSB7XG4gICAgJCgnc2VsZWN0LnNlbGVjdDpub3QoLnNlbGVjdF9oYXMpJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmlrU2VsZWN0KHtjdXN0b21DbGFzczogJCh0aGlzKS5hdHRyKCdjbGFzcycpfSkuYWRkQ2xhc3MoJ3NlbGVjdF9oYXMnKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVJbml0U2VsZWN0KCkge1xuICAgIGluaXRTZWxlY3QoKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVJbml0U2VsZWN0KCk7XG4gICAgfSwgMTAwKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgcmVJbml0U2VsZWN0KCk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ3NlbGVjdC5zZWxlY3Quc2VsZWN0X2hhcycpLmlrU2VsZWN0KCdyZWRyYXcnKTtcbiAgICB9KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLnNldC1kaXNwbGF5X192aWV3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZXQtZGlzcGxheV9fdmlld19hY3RpdmUnKS5zaWJsaW5ncygnLnNldC1kaXNwbGF5X192aWV3JykucmVtb3ZlQ2xhc3MoJ3NldC1kaXNwbGF5X192aWV3X2FjdGl2ZScpO1xuXG4gICAgICAgICQoJyMnICsgJCh0aGlzKS5jbG9zZXN0KCcuc2V0LWRpc3BsYXknKS5kYXRhKCdmb3ItbGlzdCcpKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdwcm9kdWN0cy1saXN0X3ZpZXdfbGlzdCBwcm9kdWN0cy1saXN0X3ZpZXdfZ3JpZCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3Byb2R1Y3RzLWxpc3Rfdmlld18nICsgJCh0aGlzKS5kYXRhKCd2aWV3JykpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuc2V0RGlzcGxheScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuU20gLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAkKCcuc2V0LWRpc3BsYXlfX3ZpZXdfZ3JpZCcpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2V0LWRpc3BsYXlfX3ZpZXdfbGlzdCcpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLnNldERpc3BsYXknKTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCcudmstd2lkZ2V0JykubGVuZ3RoKSB7XG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplLlZLV2lkZ2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVksuV2lkZ2V0cy5Hcm91cChcInZrX2dyb3Vwc1wiLCB7bW9kZTogMywgd2lkdGg6ICQoJyN2a19ncm91cHMnKS5wYXJlbnQoKS53aWR0aCgpLCBjb2xvcjM6ICc2RjlEM0EnfSwgMjAwMDM5MjIpO1xuICAgICAgICAgICAgJCgnI3ZrX2dyb3VwcyAqJykucmVtb3ZlKCk7XG4gICAgICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuVktXaWRnZXQnKTtcbiAgICB9XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuc2xpZGVyLW1haW4nKS5zbGljayh7XG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtbGVmdFwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHRcIj48L2J1dHRvbj4nLFxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuXG4gICAgICAgIF1cbiAgICB9KS5vbignbGF6eUxvYWRlZCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGltYWdlLCBpbWFnZVNvdXJjZSkge1xuICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgIH0pO1xufSk7Il19
