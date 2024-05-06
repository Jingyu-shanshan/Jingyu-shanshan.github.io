$(function () {
    $('#back-to-top, #clickable-cat').on('mouseenter', function () {
        $('#clickable-cat').css({
            'transition': 'bottom 0.5s linear',
            'bottom': '110px',
        });

        $('#dialog').css({
            'display': 'grid'
        });
    });

    $('#back-to-top, #clickable-cat').on('mouseleave', function () {
        $('#clickable-cat').css({
            'transition': 'bottom 0.5s linear',
            'bottom': `84px`,
        });

        $('#dialog').css({
            'animation-name': 'divIn',
            'animation-duration': '0.5s',
            'animation-fill-mode': 'forwards'
        });

        $('#dialog').css({
            'display': 'none',
            'animation-name': 'jumpOut',
        });

        // setTimeout(() => {
        //     $('#dialog').css({
        //         'display': 'none',
        //         'animation-name': 'jumpOut',
        //     });
        // }, 100);
    });
});