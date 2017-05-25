$(function () {
    $('.main-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        fade: true,
        cssEase: 'ease',
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        prevArrow: '<button type="button" class="slick-prev icon icon-angle-left"></button>',
        nextArrow: '<button type="button" class="slick-next icon icon-angle-right"></button>',
        autoplay: false,
        autoplaySpeed: 5000,
        zIndex: 1,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: $screenSm - 1,
                settings: {
                    dots: false,
                    arrows: true
                }
            }
        ]
    }).on('lazyLoaded', function (event, slick, image, imageSource) {
        $(image).closest('.slick-slide').removeClass('loading loading_before');
    });

    $(window).on('resize.mainSlider', function () {
        $('.main-slider__caption').trigger('destroy');
        setTimeout(function () {
            $('.main-slider__caption').dotdotdot();
        }, 3000);
    }).triggerHandler('resize.mainSlider');
});