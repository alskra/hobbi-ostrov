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
        if ($('html, body').hasClass('open_left')) {
            setTimeout(function () {
                $('html, body').removeClass('open_left');
            }, 200);
        }
        else {
            $('html, body').addClass('open_left');
        }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwic2xpZGVyLXByb2R1Y3QtY2FyZC5qcyIsImNvdW50ZXIuanMiLCJ0YWJzLmpzIiwicHJvZHVjdHMtbGlzdC5qcyIsImZpbHRlcnMuanMiLCJyYW5nZS1zbGlkZXIuanMiLCJzZWxlY3QuanMiLCJzZXQtZGlzcGxheS5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJsb2Nrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciAkc2NyZWVuU20gPSA3NjgsICRzY3JlZW5NZCA9IDkzNSwgJHNjcmVlbkxnID0gMTE3MDtcbiIsImZ1bmN0aW9uIGNsb3NlSGVhZGVySGlkZGVuKCkge1xuICAgICQoJy5oZWFkZXJfX2J0bi1tZW51JykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fYnRuLW1lbnVfb3BlbmVkJyk7XG4gICAgJCgnLmhlYWRlcl9faGlkZGVuJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9faGlkZGVuX29wZW5lZCcpLmZhZGVPdXQoMjAwKTtcbiAgICAvLyQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlSGVhZGVyU2VhcmNoKCkge1xuICAgICQoJy5oZWFkZXJfX2J0bi1zZWFyY2gnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19idG4tc2VhcmNoX29wZW5lZCcpO1xuICAgICQoJy5oZWFkZXJfX3NlYXJjaCcpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX3NlYXJjaF9vcGVuZWQnKS5mYWRlT3V0KDIwMCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmhlYWRlcl9fYnRuLW1lbnUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlSGVhZGVyU2VhcmNoKCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fYnRuLW1lbnVfb3BlbmVkJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX2hpZGRlbicpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2hpZGRlbl9vcGVuZWQnKS5mYWRlVG9nZ2xlKDIwMCk7XG4gICAgICAgIC8vJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCdvdmVyZmxvdy1oaWRkZW4nKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmhlYWRlcl9fYnRuLXNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VIZWFkZXJIaWRkZW4oKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGVhZGVyX19idG4tc2VhcmNoX29wZW5lZCcpO1xuICAgICAgICAkKCcuaGVhZGVyX19zZWFyY2gnKS50b2dnbGVDbGFzcygnaGVhZGVyX19zZWFyY2hfb3BlbmVkJykuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICAkKCcuaGVhZGVyX19zZWFyY2gtZmllbGQnKS5mb2N1cygpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuSGVhZGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGFmZml4Q29sQ29udGFpbmVyID0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKSwgJGFmZml4Q29sID0gJCgnLmFmZml4LWNvbCcpO1xuXG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtYXgtd2lkdGg6ICcgKyAoJHNjcmVlbk1kIC0gMSkgKyAncHgpJykpe1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlcl9faGlkZGVuJyk7XG5cbiAgICAgICAgICAgICQoJy5tZW51LWNhdGFsb2d1ZScpLmluc2VydEJlZm9yZSgnLm1lbnVfX2l0ZW1fbHZsXzE6ZXEoMCknKS5zaG93KCk7XG5cbiAgICAgICAgICAgICQoJy5maWx0ZXJzJykuaW5zZXJ0QWZ0ZXIoJy5jYXRlZ29yaWVzLWxpc3QnKTtcbiAgICAgICAgICAgICQoJy5maWx0ZXJzX19oaWRkZW4nKS5pbnNlcnRCZWZvcmUoJy53cmFwcGVyJykuc2hvdygpO1xuXG4gICAgICAgICAgICAkYWZmaXhDb2xDb250YWluZXIuY3NzKCdtaW4taGVpZ2h0JywgJycpO1xuXG4gICAgICAgICAgICAkKHdpbmRvdykub2ZmKCcuYWZmaXgnKTtcbiAgICAgICAgICAgICRhZmZpeENvbC5yZW1vdmVEYXRhKCdicy5hZmZpeCcpLnJlbW92ZUNsYXNzKCdhZmZpeCBhZmZpeC10b3AgYWZmaXgtYm90dG9tIGFmZml4LWluaXRlZCcpLmNzcygndG9wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlciAuZ3JpZF9fY29sXzInKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykucHJlcGVuZFRvKCRhZmZpeENvbCkuc2hvdygpO1xuXG4gICAgICAgICAgICAkKCcuZmlsdGVycycpLmFwcGVuZFRvKCRhZmZpeENvbCk7XG4gICAgICAgICAgICAkKCcuZmlsdGVyc19faGlkZGVuJykuYXBwZW5kVG8oJy5maWx0ZXJzJykuc2hvdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkYWZmaXhDb2xDb250YWluZXIuY3NzKCdtaW4taGVpZ2h0JywgJGFmZml4Q29sLm91dGVySGVpZ2h0KGZhbHNlKSk7XG5cbiAgICAgICAgICAgICAgICAkYWZmaXhDb2wubm90KCcuYWZmaXgtaW5pdGVkJykuYWZmaXgoe1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy50b3AgPSAkKCcubWVudScpLm9mZnNldCgpLnRvcCAtIDIwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5ib3R0b20gPSAkKCcud3JhcHBlcicpLmhlaWdodCgpIC0gJGFmZml4Q29sQ29udGFpbmVyLm9mZnNldCgpLnRvcCAtICRhZmZpeENvbENvbnRhaW5lci5vdXRlckhlaWdodChmYWxzZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5hZGRDbGFzcygnYWZmaXgtaW5pdGVkJyk7XG5cbiAgICAgICAgICAgICAgICAkYWZmaXhDb2wuZGF0YSgnYnMuYWZmaXgnKS5vcHRpb25zLm9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAkKCcubWVudScpLm9mZnNldCgpLnRvcCAtIDIwLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICQoJy53cmFwcGVyJykuaGVpZ2h0KCkgLSAkYWZmaXhDb2xDb250YWluZXIub2Zmc2V0KCkudG9wIC0gJGFmZml4Q29sQ29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAkYWZmaXhDb2wuYWZmaXgoJ2NoZWNrUG9zaXRpb24nKTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJGFmZml4Q29sLmRhdGEoJ2JzLmFmZml4Jykub3B0aW9ucy5vZmZzZXQpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuSGVhZGVyJyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZW51X19pdGVtX3N1Ym1lbnU+Lm1lbnVfX2J0bj4ubWVudV9faWNvbiwgLm1lbnUtY2F0YWxvZ3VlX19pdGVtX3N1Ym1lbnU+Lm1lbnUtY2F0YWxvZ3VlX19idG4+Lm1lbnUtY2F0YWxvZ3VlX19pY29uJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5NZCAtIDEpICsgJ3B4KScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKVxuICAgICAgICAgICAgICAgIC5ub3QoJCh0aGlzKS5wYXJlbnQoKS5uZXh0KCcubWVudV9fc3VibWVudSwgLm1lbnUtY2F0YWxvZ3VlX19zdWJtZW51JykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLnRvZ2dsZSgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKS5lbmQoKSlcbiAgICAgICAgICAgICAgICAubm90KCQodGhpcykucGFyZW50cygnLm1lbnVfX3N1Ym1lbnUsIC5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSkge1xuICAgICAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5jbG9zZXN0KCcubWVudV9faXRlbV9zdWJtZW51Pi5tZW51X19idG4+Lm1lbnVfX2ljb24sIC5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51Pi5tZW51LWNhdGFsb2d1ZV9fYnRuPi5tZW51LWNhdGFsb2d1ZV9faWNvbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdtb3VzZWVudGVyJywgJy5tZW51LWNhdGFsb2d1ZV9faXRlbV9zdWJtZW51JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogJyArICgkc2NyZWVuTWQpICsgJ3B4KScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5tZW51LWNhdGFsb2d1ZV9fc3VibWVudScpLmFkZENsYXNzKCdvcGVuZWQnKS5zdG9wKHRydWUsIGZhbHNlKS5oaWRlKCkuZGVsYXkoMTAwKS5mYWRlSW4oMTAwKS5wYXJlbnQoKS5hZGRDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgIH1cbiAgICB9KS5vbignbW91c2VsZWF2ZScsICcubWVudS1jYXRhbG9ndWVfX2l0ZW1fc3VibWVudScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6ICcgKyAoJHNjcmVlbk1kKSArICdweCknKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKS5yZW1vdmVDbGFzcygnb3BlbmVkJykuc3RvcCh0cnVlLCBmYWxzZSkuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiIiwiJChmdW5jdGlvbiAoKSB7XG5cbiAgICAkKCcuc2xpZGVyLXByb2R1Y3QtY2FyZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fbWFpbicpLnNsaWNrKHtcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXYgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWJzJyksXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYnMnKS5zbGljayh7XG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNzc0Vhc2U6ICdlYXNlJyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXYgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHRcIj48L2J1dHRvbj4nLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX19tYWluJyksXG4gICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlLFxuICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlLFxuICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlblNtIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWw6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuc2xpZGVyUHJvZHVjdENhcmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1icycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5TbSAtIDEpICsgJ3B4KScpKXtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1iLWl0ZW0nKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNsaWNrLXRyYWNrJykuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0SXRlbSA9ICgkdGhpcy5vdXRlckhlaWdodCgpICsgMjApLzM7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYi1pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGhlaWdodEl0ZW0gLSAyMC41ICsgJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNsaWNrLXRyYWNrJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oZWlnaHQoJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1iLWl0ZW0nKS5sZW5ndGgqKGhlaWdodEl0ZW0gKyAyMCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICR0aGlzLnNsaWNrKCdzbGlja0dvVG8nLCAwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAyMDApO1xuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuc2xpZGVyUHJvZHVjdENhcmQnKTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmNvdW50ZXJfX2J0bl9kZWMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLnNpYmxpbmdzKCcuY291bnRlcl9faW5wdXQnKSxcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKTtcbiAgICAgICAgdmFsdWUgPiAxID8gJGlucHV0LnZhbCh2YWx1ZSAtIDEpIDogbnVsbFxuICAgIH0pLm9uKCdjbGljaycsICcuY291bnRlcl9fYnRuX2luYycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuc2libGluZ3MoJy5jb3VudGVyX19pbnB1dCcpLFxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCgkaW5wdXQudmFsKCkpO1xuICAgICAgICAkaW5wdXQudmFsKHZhbHVlICsgMSk7XG4gICAgfSkub24oJ2NoYW5nZScsICcuY291bnRlcl9faW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudmFsKCkgPD0gMCA/ICQodGhpcykudmFsKDEpIDogbnVsbFxuICAgIH0pO1xuXG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcblxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnByb2R1Y3RzLWxpc3RfX2lubmVyLnNsaWNrLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgY3NzRWFzZTogJ2Vhc2Utb3V0JyxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldiBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgYXNOYXZGb3I6ICcnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDc5LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogJHNjcmVlbkxnIC0gMSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSkub24oJ2xhenlMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBpbWFnZSwgaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgJChpbWFnZSkuY2xvc2VzdCgnLnNsaWNrLXNsaWRlJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZ19iZWZvcmUnKTtcbiAgICB9KTtcbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmZpbHRlcnMgLmFzaWRlX19oZWFkZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKCdodG1sLCBib2R5JykuaGFzQ2xhc3MoJ29wZW5fbGVmdCcpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykucmVtb3ZlQ2xhc3MoJ29wZW5fbGVmdCcpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hZGRDbGFzcygnb3Blbl9sZWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcud3JhcHBlcicpLnRvZ2dsZUNsYXNzKCd3cmFwcGVyX29wZW5fbGVmdCcpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJhbmdlLXNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmlvblJhbmdlU2xpZGVyKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgICAgICAgICBtaW46ICR0aGlzLmRhdGEoJ3JzLW1pbicpLFxuICAgICAgICAgICAgbWF4OiAkdGhpcy5kYXRhKCdycy1tYXgnKSxcbiAgICAgICAgICAgIGZyb206ICR0aGlzLmRhdGEoJ3JzLWZyb20nKSxcbiAgICAgICAgICAgIHRvOiAkdGhpcy5kYXRhKCdycy10bycpLFxuICAgICAgICAgICAgc3RlcDogJHRoaXMuZGF0YSgncnMtc3RlcCcpLFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmluaXNoOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgZnJvbTogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgdG86ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7IiwiJC5pa1NlbGVjdC5leHRlbmREZWZhdWx0cyh7YXV0b1dpZHRoOiBmYWxzZSwgZGRGdWxsV2lkdGg6IGZhbHNlLCBkeW5hbWljV2lkdGg6IGZhbHNlLCBleHRyYWN0TGluazogZmFsc2UsIGRkTWF4SGVpZ2h0OiAyMDAsIG9uU2hvdzogZnVuY3Rpb24gKGUpe1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2xpbmsnKS5hZGRDbGFzcygnaWtfc2VsZWN0X2xpbmtfb3BlbmVkJyk7XG59LCBvbkhpZGU6IGZ1bmN0aW9uIChlKXtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9saW5rJykucmVtb3ZlQ2xhc3MoJ2lrX3NlbGVjdF9saW5rX29wZW5lZCcpO1xuICAgIGUuJGVsLmlrU2VsZWN0KCdyZWRyYXcnKTtcbn0sIG9uSW5pdDogZnVuY3Rpb24gKGUpIHtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9kcm9wZG93bicpLmZpbmQoJy5pa19zZWxlY3RfbGlzdF9pbm5lcicpLmFkZENsYXNzKCdwcy1zY3JvbGwnKTtcbn19KTtcblxuZnVuY3Rpb24gaW5pdFNlbGVjdCgpIHtcbiAgICAkKCdzZWxlY3Quc2VsZWN0Om5vdCguc2VsZWN0X2hhcyknKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuaWtTZWxlY3Qoe2N1c3RvbUNsYXNzOiAkKHRoaXMpLmF0dHIoJ2NsYXNzJyl9KS5hZGRDbGFzcygnc2VsZWN0X2hhcycpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZUluaXRTZWxlY3QoKSB7XG4gICAgaW5pdFNlbGVjdCgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZUluaXRTZWxlY3QoKTtcbiAgICB9LCAxMDApO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICByZUluaXRTZWxlY3QoKTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnc2VsZWN0LnNlbGVjdC5zZWxlY3RfaGFzJykuaWtTZWxlY3QoJ3JlZHJhdycpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuc2V0LWRpc3BsYXlfX3ZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NldC1kaXNwbGF5X192aWV3X2FjdGl2ZScpLnNpYmxpbmdzKCcuc2V0LWRpc3BsYXlfX3ZpZXcnKS5yZW1vdmVDbGFzcygnc2V0LWRpc3BsYXlfX3ZpZXdfYWN0aXZlJyk7XG5cbiAgICAgICAgJCgnIycgKyAkKHRoaXMpLmNsb3Nlc3QoJy5zZXQtZGlzcGxheScpLmRhdGEoJ2Zvci1saXN0JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RzLWxpc3Rfdmlld19saXN0IHByb2R1Y3RzLWxpc3Rfdmlld19ncmlkJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHJvZHVjdHMtbGlzdF92aWV3XycgKyAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zZXREaXNwbGF5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5TbSAtIDEpICsgJ3B4KScpKXtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19ncmlkJykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19saXN0JykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuc2V0RGlzcGxheScpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJy52ay13aWRnZXQnKS5sZW5ndGgpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuVktXaWRnZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBWSy5XaWRnZXRzLkdyb3VwKFwidmtfZ3JvdXBzXCIsIHttb2RlOiAzLCB3aWR0aDogJCgnI3ZrX2dyb3VwcycpLnBhcmVudCgpLndpZHRoKCksIGNvbG9yMzogJzZGOUQzQSd9LCAyMDAwMzkyMik7XG4gICAgICAgICAgICAkKCcjdmtfZ3JvdXBzIConKS5yZW1vdmUoKTtcbiAgICAgICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5WS1dpZGdldCcpO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5zbGlkZXItbWFpbicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1sZWZ0XCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG5cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiXX0=
