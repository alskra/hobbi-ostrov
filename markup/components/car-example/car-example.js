$(function () {
    $(".car-example").each(function () {
        var after = $(this).find(".car-example__after");
        $(this).find(".car-example__slider").slider({
            min: 0,
            max: 100,
            value: 50,
            create: function () {
                after.width(38 + 1.28*$(this).slider("value"));
            },
            slide: function(event, ui) {
                after.width(38 + 1.28*ui.value);
            }
        });
    });
});
$(window).on('load', function () {
    $(".car-example").addClass('car-example_load');
});