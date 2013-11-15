function slider(element) {
    
    var self = this;
    element = $(element);

    var container = $(">ul", element);
    var panes = $(">ul>li", element);

    var pane_width = 0;
    var pane_count = panes.length;

    var current_pane = 0;

    this.init = function() {
        setPaneDimensions();

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
    };

    function setPaneDimensions() {
        pane_width = element.width();
        panes.each(function() {
            $(this).width(pane_width);
        });
        container.width(pane_width*pane_count);
    };

    this.showPane = function( index ) {
        index = Math.max(0, Math.min(index, pane_count-1));
        current_pane = index;

        var offset = -((100/pane_count)*current_pane);
        
        // 1. disable sliding for desktops
        var has_touch_events = ( 'ontouchstart' in window ) ? true : false;

        setContainerOffset(offset, has_touch_events); // was 'true' before 1.

    };

    function setContainerOffset(percent, animate) {
        container.removeClass("js--transition");

        if(animate) {
            container.addClass("js--transition");
        }

        if(Modernizr.csstransforms3d) {
            container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
        }
        else if(Modernizr.csstransforms) {
            container.css("transform", "translate("+ percent +"%,0)");
        }
        else {
            var px = ((pane_width*pane_count) / 100) * percent;
            container.css("left", px+"px");
        }
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };

    function handleHammer(ev) {
        
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                var pane_offset = -(100/pane_count)*current_pane;
                var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
                    (current_pane == pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
                    drag_offset *= .4;
                }

                setContainerOffset(drag_offset + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                if(Math.abs(ev.gesture.deltaX) > pane_width/4) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    element.hammer({ drag_lock_to_axis: true })
        .on("release dragleft dragright swipeleft swiperight", handleHammer);
}


