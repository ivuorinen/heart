jQuery(document).ready(function ($) {
    jQuery.Color.hook("fill stroke");

    window.heartCache = {};
    heartCache.heart = $("#heart");
    heartCache.body = $("body");
    heartCache.svg = heartCache.heart.find('svg');

    window.settings = {
        colorStart: heartCache.body.data('color-start'),
        colorBright: heartCache.body.data('color-bright'),
        colorDark: heartCache.body.data('color-dark'),
        speed: heartCache.body.data('speed') * 1000,
        sizeSmall: 700,
        sizeLarge: $(window).height() + 200,
    };

    // Calculate start size (avg of max and min sizes)
    settings.sizeStart = Math.ceil((settings.sizeLarge + settings.sizeSmall) / 2);
    heartCache.startSizePx = settings.sizeStart + 'px';

    // Center with negative margin
    settings.containerMarginLarge = ((settings.sizeLarge - settings.sizeLarge * 2) / 2) + 'px';
    settings.containerMarginSmall = ((settings.sizeSmall - settings.sizeSmall * 2) / 2) + 'px';

    heartCache.heart.css({
        backgroundColor: settings.colorStart,
        width: settings.sizeLarge + 'px',
        height: settings.sizeLarge + 'px',
        position: "fixed",
        top: "50%",
        left: "50%",
        marginLeft: '-' + settings.sizeLarge + 'px',
        marginTop: '-' + settings.sizeLarge + 'px',
    });

    var startSize = {
        width: settings.sizeLarge + 'px',
        height: settings.sizeLarge + 'px'
    };

    heartCache.body.css('backgroundColor', settings.colorStart);
    heartCache.svg.find('path').attr('fill', settings.colorStart);

    heartCache.svg.css(startSize);

    function heart() {
        // Animate the heart
        heartCache.svg
            .animate({
                width: (settings.sizeLarge + 6) + "px",
                height: (settings.sizeLarge + 6) + "px"
            }, settings.speed)
            .animate({
                width: (settings.sizeSmall + 6) + "px",
                height: (settings.sizeSmall + 6) + "px"
            }, settings.speed);

        // Animate container background color and placement
        heartCache.heart
            .animate({
                backgroundColor: settings.colorBright,
                width: settings.sizeLarge + "px",
                height: settings.sizeLarge + "px",
                marginLeft: settings.containerMarginLarge,
                marginTop: settings.containerMarginLarge
            }, settings.speed)
            .animate({
                backgroundColor: settings.colorDark,
                width: settings.sizeSmall + "px",
                height: settings.sizeSmall + "px",
                marginLeft: settings.containerMarginSmall,
                marginTop: settings.containerMarginSmall
            }, settings.speed, heart);
    }

    // Start the loop
    heart();
});
