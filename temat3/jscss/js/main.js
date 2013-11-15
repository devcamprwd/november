$(function () {
    var $cubes = $('.cube'),
        $playground = $('.experiment'),
        $body = $('body'),
        times = 0,
        animateTimer;

    function animate() {

        $cubes.removeClass('is-active');

        $playground.each(function () {
            $(this).find('.cube').eq(times % 3).addClass('is-active');
        });

        times += 1;
        animateTimer = setTimeout(animate, 1000);
    }

    function toggleAnimation() {
        if (animateTimer) {
            clearTimeout(animateTimer);
            animateTimer = undefined;
        } else {
            animate();
        }
    }

    function multiplyElements() {
        $body.append($playground.first().clone());
        $cubes = $('.cube');
        $playground = $('.experiment');
    }


    $('#toggle-animation').on('click', toggleAnimation);
    $('#multiply-elements').on('click', multiplyElements);
});