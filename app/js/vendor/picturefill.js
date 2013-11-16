var PictureTest = function( w ) {

    'use strict';

    var ps = document.getElementsByTagName('span'),
        itemsLazy = [];

    for (var i = 0, il = ps.length; i < il; i++) {
        if (ps[i].getAttribute('data-picture') === 'lazy') {
            itemsLazy.push(ps[i]);
        }
    }

    w.elementInViewport = function(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    w.processScroll = function() {
        for (var i = 0; i < itemsLazy.length; i++) {
            if (w.elementInViewport(itemsLazy[i])) {
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
                w.picturefill();
            }
        }
    }

    w.picturefill = function() {
        console.log(Modernizr.webp);
        var imageType = (Modernizr.webp) ? '.webp' : '.jpg';

        // Loop the pictures
        for (var i = 0, il = ps.length; i < il; i++) {
            if (ps[i].getAttribute('data-picture') === 'shown') {

                var sources = ps[i].getElementsByTagName('span'),
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

    if (w.addEventListener) {
        w.addEventListener('resize', w.picturefill, false);
        w.addEventListener('DOMContentLoaded', function () {
            w.picturefill();
            // Run once only
            w.removeEventListener('load', w.picturefill, false);
        }, false);
        w.addEventListener('load', w.picturefill, false);
        w.addEventListener('scroll', w.processScroll, false);
    }
    else if (w.attachEvent) {
        w.attachEvent('onload', w.picturefill);
        w.attachEvent('onscroll', w.processScroll);
    }

    w.picturefill();
};


Modernizr.on('webp', function (result) {

    'use strict';

    new PictureTest( window );
});