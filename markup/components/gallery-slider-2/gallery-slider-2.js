// Gallery-slider
function initGallerySlider2() {
    $('.gallery-slider-2').each(function () {
        $(this).find('.gallery-slider-2__view').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'ease',
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            prevArrow: '<button type="button" class="slick-prev icon icon-angle-right-2"></button>',
            nextArrow: '<button type="button" class="slick-next icon icon-angle-right-2"></button>',
            autoplay: false,
            autoplaySpeed: 5000,
            zIndex: 1,
            lazyLoad: 'ondemand',
            asNavFor: $(this).find('.gallery-slider-2__thumb-inner'),
            responsive: [

            ]
        }).on('lazyLoaded', function (event, slick, image, imageSource) {
            $(image).closest('.slick-slide').removeClass('loading loading_before');
        });

        var g = $(this);
        g.find('.gallery-slider-2__thumb-inner').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            fade: false,
            cssEase: 'ease',
            slidesToShow: 4,
            slidesToScroll: 1,
            mobileFirst: true,
            prevArrow: '<button type="button" class="slick-prev icon icon-angle-right"></button>',
            nextArrow: '<button type="button" class="slick-next icon icon-angle-right"></button>',
            autoplay: false,
            autoplaySpeed: 5000,
            zIndex: 1,
            lazyLoad: 'ondemand',
            asNavFor: g.find('.gallery-slider-2__view'),
            focusOnSelect: true,
            vertical: false,
            verticalSwiping: true,
            initialSlide: 0,
            centerMode: true,
            centerPadding: '0px',
            responsive: [

            ]
        }).on('lazyLoaded', function (event, slick, image, imageSource) {
            $(image).closest('.slick-slide').removeClass('loading loading_before');
        });
    });
}

$(function () {
    initGallerySlider2();
});