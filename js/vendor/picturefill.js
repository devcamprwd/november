Modernizr.on('webp', function (result) {

    'use strict';

    var imageType = (result) ? '.webp' : '.jpg',
        ps = document.getElementsByTagName('span'),
        itemsLazy = [];

    for (var i = 0, il = ps.length; i < il; i++) {
        if (ps[i].getAttribute('data-picture') === 'lazy') {
            itemsLazy.push(ps[i]);
        }
    }
    
    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function processScroll() {
        for (var i = 0; i < itemsLazy.length; i++) {
            if (elementInViewport(itemsLazy[i])) {
                itemsLazy[i].setAttribute('data-picture', 'shown');
                itemsLazy.splice(i, i);
                if (itemsLazy.length === 1) {
                    if (window.removeEventListener) {
                        window.removeEventListener('scroll', processScroll, false);
                    }
                    else if (window.detachEvent){
                        window.detachEvent('onscroll', processScroll)
                    }
                }
                picturefill();
            }
        }
    }

    function picturefill() {
        // Loop the pictures
        for (var i = 0, il = ps.length; i < il; i++) {
            if (ps[i].getAttribute('data-picture') === 'shown') {

                var sources = ps[i].getElementsByTagName('div'),
                    matches = [];

                // See if which sources match
                for (var j = 0, jl = sources.length; j < jl; j++) {
                    var media = sources[j].getAttribute('data-media');
                    // if there's no media specified, OR window.matchMedia is supported
                    if (!media || (window.matchMedia && window.matchMedia(media).matches)) {
                        matches.push(sources[j]);
                    }
                }

                // Find any existing img element in the picture element
                var picImg = ps[i].getElementsByTagName('img')[0];

                if (matches.length) {
                    if (!picImg) {
                        picImg = document.createElement('img');
                        picImg.alt = ps[i].getAttribute('data-alt');
                        ps[i].appendChild(picImg);
                    }

                    picImg.src = matches.pop().getAttribute('data-src') + imageType;
                }
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener('resize', picturefill, false);
        window.addEventListener('DOMContentLoaded', function () {
            picturefill();
            // Run once only
            window.removeEventListener('load', picturefill, false);
        }, false);
        window.addEventListener('load', picturefill, false);
        window.addEventListener('scroll', processScroll, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onload', picturefill);
        window.attachEvent('onscroll', processScroll);
    }

});