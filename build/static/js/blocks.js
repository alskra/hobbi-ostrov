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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2UuanMiLCJoZWFkZXIuanMiLCJtZW51LmpzIiwiYWZmaXgtY29sLmpzIiwic2xpZGVyLXByb2R1Y3QtY2FyZC5qcyIsImNvdW50ZXIuanMiLCJ0YWJzLmpzIiwicHJvZHVjdHMtbGlzdC5qcyIsImZpbHRlcnMuanMiLCJyYW5nZS1zbGlkZXIuanMiLCJzZWxlY3QuanMiLCJzZXQtZGlzcGxheS5qcyIsInZrLXdpZGdldC5qcyIsInNsaWRlci1tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJibG9ja3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJHNjcmVlblNtID0gNzY4LCAkc2NyZWVuTWQgPSA5MzUsICRzY3JlZW5MZyA9IDExNzA7XG4iLCJmdW5jdGlvbiBjbG9zZUhlYWRlckhpZGRlbigpIHtcbiAgICAkKCcuaGVhZGVyX19idG4tbWVudScpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2J0bi1tZW51X29wZW5lZCcpO1xuICAgICQoJy5oZWFkZXJfX2hpZGRlbicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2hpZGRlbl9vcGVuZWQnKS5mYWRlT3V0KDIwMCk7XG4gICAgLy8kKCdodG1sJykucmVtb3ZlQ2xhc3MoJ292ZXJmbG93LWhpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUhlYWRlclNlYXJjaCgpIHtcbiAgICAkKCcuaGVhZGVyX19idG4tc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fYnRuLXNlYXJjaF9vcGVuZWQnKTtcbiAgICAkKCcuaGVhZGVyX19zZWFyY2gnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19zZWFyY2hfb3BlbmVkJykuZmFkZU91dCgyMDApO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5oZWFkZXJfX2J0bi1tZW51JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUhlYWRlclNlYXJjaCgpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2J0bi1tZW51X29wZW5lZCcpO1xuICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4nKS50b2dnbGVDbGFzcygnaGVhZGVyX19oaWRkZW5fb3BlbmVkJykuZmFkZVRvZ2dsZSgyMDApO1xuICAgICAgICAvLyQoJ2h0bWwnKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5oZWFkZXJfX2J0bi1zZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlSGVhZGVySGlkZGVuKCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fYnRuLXNlYXJjaF9vcGVuZWQnKTtcbiAgICAgICAgJCgnLmhlYWRlcl9fc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fc2VhcmNoX29wZW5lZCcpLmZhZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgJCgnLmhlYWRlcl9fc2VhcmNoLWZpZWxkJykuZm9jdXMoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLkhlYWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9mZignLmFmZml4Jyk7XG4gICAgICAgICQoJy5hZmZpeC1jb2wnKS5yZW1vdmVEYXRhKCdicy5hZmZpeCcpLnJlbW92ZUNsYXNzKCdhZmZpeCBhZmZpeC10b3AgYWZmaXgtYm90dG9tJyk7XG4gICAgICAgICQoJy5hZmZpeC1jb2wtcG9zaXRpb24nKS5jc3MoJ21pbi1oZWlnaHQnLCAnJyk7XG5cbiAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuTWQgLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19oaWRkZW4tdG9wJykucHJlcGVuZFRvKCcuaGVhZGVyX19oaWRkZW4nKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykuaW5zZXJ0QWZ0ZXIoJy5tZW51X19pdGVtX2x2bF8xOmVxKDApJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGlkZGVuLXRvcCcpLnByZXBlbmRUbygnLmhlYWRlciAuZ3JpZF9fY29sXzInKTtcblxuICAgICAgICAgICAgJCgnLm1lbnUtY2F0YWxvZ3VlJykucHJlcGVuZFRvKCcuYWZmaXgtY29sJykuc2hvdygpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcuYWZmaXgtY29sJykuY3NzKCd0b3AnLCAnJykuYWZmaXgoe1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy50b3AgPSAkKCcubWVudScpLm9mZnNldCgpLnRvcCAtIDIwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5ib3R0b20gPSAkKCcud3JhcHBlcicpLmhlaWdodCgpIC0gJCgnLmFmZml4LWNvbC1jb250YWluZXInKS5vZmZzZXQoKS50b3AgLSAkKCcuYWZmaXgtY29sLWNvbnRhaW5lcicpLm91dGVySGVpZ2h0KGZhbHNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLm9uKCdhZmZpeC5icy5hZmZpeCBhZmZpeC1ib3R0b20uYnMuYWZmaXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5hZmZpeC1jb2wtcG9zaXRpb24nKS5jc3MoJ21pbi1oZWlnaHQnLCAkKHRoaXMpLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdhZmZpeC5icy5hZmZpeCcpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuSGVhZGVyJyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tZW51X19pdGVtX3N1Ym1lbnU+Lm1lbnVfX2J0biwgLm1lbnUtY2F0YWxvZ3VlX19pdGVtX3N1Ym1lbnU+Lm1lbnUtY2F0YWxvZ3VlX19idG4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLm5leHQoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKS50b2dnbGVDbGFzcygnb3BlbmVkJykudG9nZ2xlKCkucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpLmVuZCgpKVxuICAgICAgICAgICAgLm5vdCgkKHRoaXMpLnBhcmVudHMoJy5tZW51X19zdWJtZW51LCAubWVudS1jYXRhbG9ndWVfX3N1Ym1lbnUnKSlcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICB9KTtcbn0pOyIsIiIsIiQoZnVuY3Rpb24gKCkge1xuXG4gICAgJCgnLnNsaWRlci1wcm9kdWN0LWNhcmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX21haW4nKS5zbGljayh7XG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1yaWdodC0yXCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dCBpY29uIGljb24tYW5nbGUtcmlnaHQtMlwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgekluZGV4OiAxLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgICBhc05hdkZvcjogJHRoaXMuZmluZCgnLnNsaWRlci1wcm9kdWN0LWNhcmRfX3RodW1icycpLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWJzJykuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgICAgICBjc3NFYXNlOiAnZWFzZScsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0XCI+PC9idXR0b24+JyxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fbWFpbicpLFxuICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5TbSAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICAgICAkKGltYWdlKS5jbG9zZXN0KCcuc2xpY2stc2xpZGUnKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nX2JlZm9yZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLnNsaWRlclByb2R1Y3RDYXJkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKE1vZGVybml6ci5tcSgnKG1heC13aWR0aDogJyArICgkc2NyZWVuU20gLSAxKSArICdweCknKSl7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYi1pdGVtJykuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zbGljay10cmFjaycpLmhlaWdodCgnYXV0bycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodEl0ZW0gPSAoJHRoaXMub3V0ZXJIZWlnaHQoKSArIDIwKS8zO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuc2xpZGVyLXByb2R1Y3QtY2FyZF9fdGh1bWItaXRlbScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCBoZWlnaHRJdGVtIC0gMjAuNSArICdweCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zbGljay10cmFjaycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGVpZ2h0KCR0aGlzLmZpbmQoJy5zbGlkZXItcHJvZHVjdC1jYXJkX190aHVtYi1pdGVtJykubGVuZ3RoKihoZWlnaHRJdGVtICsgMjApKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5zbGljaygnc2xpY2tHb1RvJywgMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9KS50cmlnZ2VySGFuZGxlcigncmVzaXplLnNsaWRlclByb2R1Y3RDYXJkJyk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5jb3VudGVyX19idG5fZGVjJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5zaWJsaW5ncygnLmNvdW50ZXJfX2lucHV0JyksXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSk7XG4gICAgICAgIHZhbHVlID4gMSA/ICRpbnB1dC52YWwodmFsdWUgLSAxKSA6IG51bGxcbiAgICB9KS5vbignY2xpY2snLCAnLmNvdW50ZXJfX2J0bl9pbmMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLnNpYmxpbmdzKCcuY291bnRlcl9faW5wdXQnKSxcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKTtcbiAgICAgICAgJGlucHV0LnZhbCh2YWx1ZSArIDEpO1xuICAgIH0pLm9uKCdjaGFuZ2UnLCAnLmNvdW50ZXJfX2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnZhbCgpIDw9IDAgPyAkKHRoaXMpLnZhbCgxKSA6IG51bGxcbiAgICB9KTtcblxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG5cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5wcm9kdWN0cy1saXN0X19pbm5lci5zbGljay1zbGlkZXInKS5zbGljayh7XG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgIGNzc0Vhc2U6ICdlYXNlLW91dCcsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXYgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHQgaWNvbiBpY29uLWFuZ2xlLXJpZ2h0LTJcIj48L2J1dHRvbj4nLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgIHpJbmRleDogMSxcbiAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgIGFzTmF2Rm9yOiAnJyxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ3OSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAkc2NyZWVuU20gLSAxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6ICRzY3JlZW5MZyAtIDEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiLCIkKGZ1bmN0aW9uICgpIHtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbC5hdHRhY2hGaWx0ZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICQoJy5maWx0ZXJzW2RhdGEtc2VjdGlvbl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgdmFyIHNlY3QgPSAkKCcjJyArICQodGhpcykuZGF0YSgnc2VjdGlvbicpKTtcbiAgICAgICAgICAgdmFyIHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIDU0IC0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgIHZhciBib3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyA1NCAtIChzZWN0Lm9mZnNldCgpLnRvcCArIHNlY3QuaGVpZ2h0KCkgLSAxMDApO1xuICAgICAgICAgICBpZiAodG9wID49IDAgJiYgYm90dG9tIDwgMCl7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCQodGhpcykub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmaWx0ZXJzX2ZpeGVkJykuZmluZCgnLmZpbHRlcnNfX2lubmVyJykub3V0ZXJXaWR0aCgkKHRoaXMpLm91dGVyV2lkdGgoKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCcnKTtcbiAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpbHRlcnNfZml4ZWQnKS5maW5kKCcuZmlsdGVyc19faW5uZXInKS5vdXRlcldpZHRoKCcnKTtcbiAgICAgICAgICAgfVxuICAgICAgIH0pO1xuICAgIH0pO1xuICAgICQod2luZG93KS5vbigncmVzaXplLmNvcnJlY3RseUZpbHRlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudHJpZ2dlcignc2Nyb2xsLmF0dGFjaEZpbHRlcnMnKTtcbiAgICB9KVxufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnJhbmdlLXNsaWRlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmlvblJhbmdlU2xpZGVyKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgICAgICAgICBtaW46ICR0aGlzLmRhdGEoJ3JzLW1pbicpLFxuICAgICAgICAgICAgbWF4OiAkdGhpcy5kYXRhKCdycy1tYXgnKSxcbiAgICAgICAgICAgIGZyb206ICR0aGlzLmRhdGEoJ3JzLWZyb20nKSxcbiAgICAgICAgICAgIHRvOiAkdGhpcy5kYXRhKCdycy10bycpLFxuICAgICAgICAgICAgc3RlcDogJHRoaXMuZGF0YSgncnMtc3RlcCcpLFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykudmFsKGRhdGEuZnJvbSk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fdG8nKS52YWwoZGF0YS50byk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmluaXNoOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnJhbmdlLXNsaWRlcl9fZnJvbScpLnZhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykudmFsKGRhdGEudG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19mcm9tJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgZnJvbTogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR0aGlzLmZpbmQoJy5yYW5nZS1zbGlkZXJfX3RvJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSAkdGhpcy5maW5kKCcucmFuZ2Utc2xpZGVyX19pbnB1dCcpLmRhdGEoXCJpb25SYW5nZVNsaWRlclwiKTtcblxuICAgICAgICAgICAgc2xpZGVyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgdG86ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7IiwiJC5pa1NlbGVjdC5leHRlbmREZWZhdWx0cyh7YXV0b1dpZHRoOiBmYWxzZSwgZGRGdWxsV2lkdGg6IGZhbHNlLCBkeW5hbWljV2lkdGg6IGZhbHNlLCBleHRyYWN0TGluazogZmFsc2UsIGRkTWF4SGVpZ2h0OiAyMDAsIG9uU2hvdzogZnVuY3Rpb24gKGUpe1xuICAgIGUuJGVsLnNpYmxpbmdzKCcuaWtfc2VsZWN0X2xpbmsnKS5hZGRDbGFzcygnaWtfc2VsZWN0X2xpbmtfb3BlbmVkJyk7XG59LCBvbkhpZGU6IGZ1bmN0aW9uIChlKXtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9saW5rJykucmVtb3ZlQ2xhc3MoJ2lrX3NlbGVjdF9saW5rX29wZW5lZCcpO1xuICAgIGUuJGVsLmlrU2VsZWN0KCdyZWRyYXcnKTtcbn0sIG9uSW5pdDogZnVuY3Rpb24gKGUpIHtcbiAgICBlLiRlbC5zaWJsaW5ncygnLmlrX3NlbGVjdF9kcm9wZG93bicpLmZpbmQoJy5pa19zZWxlY3RfbGlzdF9pbm5lcicpLmFkZENsYXNzKCdwcy1zY3JvbGwnKTtcbn19KTtcblxuZnVuY3Rpb24gaW5pdFNlbGVjdCgpIHtcbiAgICAkKCdzZWxlY3Quc2VsZWN0Om5vdCguc2VsZWN0X2hhcyknKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuaWtTZWxlY3Qoe2N1c3RvbUNsYXNzOiAkKHRoaXMpLmF0dHIoJ2NsYXNzJyl9KS5hZGRDbGFzcygnc2VsZWN0X2hhcycpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZUluaXRTZWxlY3QoKSB7XG4gICAgaW5pdFNlbGVjdCgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZUluaXRTZWxlY3QoKTtcbiAgICB9LCAxMDApO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICByZUluaXRTZWxlY3QoKTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplLnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnc2VsZWN0LnNlbGVjdC5zZWxlY3RfaGFzJykuaWtTZWxlY3QoJ3JlZHJhdycpO1xuICAgIH0pO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuc2V0LWRpc3BsYXlfX3ZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NldC1kaXNwbGF5X192aWV3X2FjdGl2ZScpLnNpYmxpbmdzKCcuc2V0LWRpc3BsYXlfX3ZpZXcnKS5yZW1vdmVDbGFzcygnc2V0LWRpc3BsYXlfX3ZpZXdfYWN0aXZlJyk7XG5cbiAgICAgICAgJCgnIycgKyAkKHRoaXMpLmNsb3Nlc3QoJy5zZXQtZGlzcGxheScpLmRhdGEoJ2Zvci1saXN0JykpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RzLWxpc3Rfdmlld19saXN0IHByb2R1Y3RzLWxpc3Rfdmlld19ncmlkJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHJvZHVjdHMtbGlzdF92aWV3XycgKyAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zZXREaXNwbGF5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTW9kZXJuaXpyLm1xKCcobWF4LXdpZHRoOiAnICsgKCRzY3JlZW5TbSAtIDEpICsgJ3B4KScpKXtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19ncmlkJykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQoJy5zZXQtZGlzcGxheV9fdmlld19saXN0JykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pLnRyaWdnZXJIYW5kbGVyKCdyZXNpemUuc2V0RGlzcGxheScpO1xufSk7IiwiJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJy52ay13aWRnZXQnKS5sZW5ndGgpIHtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuVktXaWRnZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBWSy5XaWRnZXRzLkdyb3VwKFwidmtfZ3JvdXBzXCIsIHttb2RlOiAzLCB3aWR0aDogJCgnI3ZrX2dyb3VwcycpLnBhcmVudCgpLndpZHRoKCksIGNvbG9yMzogJzZGOUQzQSd9LCAyMDAwMzkyMik7XG4gICAgICAgICAgICAkKCcjdmtfZ3JvdXBzIConKS5yZW1vdmUoKTtcbiAgICAgICAgfSkudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZS5WS1dpZGdldCcpO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5zbGlkZXItbWFpbicpLnNsaWNrKHtcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2IGljb24gaWNvbi1hbmdsZS1sZWZ0XCI+PC9idXR0b24+JyxcbiAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0IGljb24gaWNvbi1hbmdsZS1yaWdodFwiPjwvYnV0dG9uPicsXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICB6SW5kZXg6IDEsXG4gICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICByZXNwb25zaXZlOiBbXG5cbiAgICAgICAgXVxuICAgIH0pLm9uKCdsYXp5TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgaW1hZ2UsIGltYWdlU291cmNlKSB7XG4gICAgICAgICQoaW1hZ2UpLmNsb3Nlc3QoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmdfYmVmb3JlJyk7XG4gICAgfSk7XG59KTsiXX0=
