$(function () {
    var $cubes = $('.cube'),
        $playground = $('.experiment'),
        $body = $('body'),
        $fps = $('#fps'),
        times = 0,
        animationOn = false,
        $rows = $('#rows'),
        rows = 1,
        $chart = $('#myChart'),
        chartVisible = false;

    function performTest() {

        animationOn = true;
        $playground.first().siblings('.experiment').remove();
        $chart.removeClass('is-hidden');

        setInterval(multiplyElements, 2000);
    }

    function toggleAnimation() {
        animationOn = !animationOn;
    }

    function toggleChart() {
        chartVisible = $chart.hasClass('is-hidden');
        if (chartVisible) {
            $chart.removeClass('is-hidden');
        } else {
            $chart.addClass('is-hidden');
        }
    }

    function multiplyElements() {
        $body.append($playground.first().clone());
        $rows.text(++rows);
        $cubes = $('.cube');
        $playground = $('.experiment');
    }


    $('#toggle-animation').on('click', toggleAnimation);
    $('#multiply-elements').on('click', multiplyElements);
    $('#toggle-chart').on('click', toggleChart);
    $('#perform-test').on('click', performTest);


    var data = {
        labels: [],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: []
            }
        ]
    }, i;

    for (i = 1; i <= 200; i += 1) {
        data.labels.push(i);
        data.datasets[0].data.push(0);
    }

    var chart = new Chart(document.getElementById("myChart").getContext("2d"));

    (function () {

        var lastLoop = new Date(),
            operations = 0;

        function tick() {
            if (new Date() - lastLoop > 1000) {
                $fps.text(operations);

                data.datasets[0].data[rows - 1] = operations;
                chart.Line(data, {animation: false, scaleFontSize: 11});

                operations = 0;
                if (animationOn) {

                    $cubes.removeClass('is-active');

                    $playground.each(function () {
                        $(this).find('.cube').eq(times % 3).addClass('is-active');
                    });
                }

                times += 1;
                lastLoop = new Date();
            } else {
                operations += 1;
            }

            requestAnimationFrame(tick);
        }

        tick();
    }());
});