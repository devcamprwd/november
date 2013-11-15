$(function () {
    var $cubes = $('.cube'),
        $playground = $('.experiment'),
        $body = $('body'),
        times = 0,
        animateTimer;

    function animate() {

        $cubes.removeClass('is-active');

        $('.experiment').each(function () {
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
        console.log($playground.clone());
        $body.append($playground.clone());
        $cubes = $('.cube');
    }


    $('#toggle-animation').on('click', toggleAnimation);
    $('#multiply-elements').on('click', multiplyElements);
});