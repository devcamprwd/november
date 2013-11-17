(function () {
	'use strict';

	var DirectionEnum = {
		LEFT: 'left',
		RIGHT: 'right',
		UP: 'top',
		DOWN: 'down'
	};

	var detectSwipe = function (el, callback) {
		var startX,
			startY,
			distanceX,
			distanceY,
			threshold = 150,
			restraint = 100,
			allowedTime = 500,
			startTime;

		callback = callback || function () {};

		el.addEventListener('touchstart', function (ev) {
			var touchObj = ev.changedTouches[0];
			startX = touchObj.pageX;
			startY = touchObj.pageY;
			startTime = new Date().getTime();

			ev.preventDefault();
		}, false);

		el.addEventListener('touchmove', function (ev) {
			ev.preventDefault();
		}, false);

		el.addEventListener('touchend', function (ev) {
			var touchobj = ev.changedTouches[0];
			var elapsedTime = new Date().getTime() - startTime;
			var direction;

			distanceX = touchobj.pageX - startX;
			distanceY = touchobj.pageY - startY;

			if (elapsedTime <= allowedTime) {
				if (Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= restraint) {
					direction = (distanceX < 0) ? DirectionEnum.LEFT : DirectionEnum.RIGHT;
				} else if (Math.abs(distanceY) >= threshold && Math.abs(distanceX) <= restraint) {
					direction = (distanceY < 0) ? DirectionEnum.UP : DirectionEnum.DOWN;
				}
			}
			callback(direction);

			ev.preventDefault();
		}, false);
	};


	window.addEventListener('load', function () {
		var el = document.getElementById('el');
		var columnCount = 5;

		detectSwipe(el, function (direction) {
			var left = parseInt(el.style.left, 10) || 0;

			if (direction === DirectionEnum.LEFT) {
				left = left - 50;
			} else if (direction === DirectionEnum.RIGHT) {
				left = left + 50;
			}

			left = Math.min(0, left);
			left = Math.max(-(columnCount - 2) * 50, left);
			left = left + '%';
			el.style.left = left;
		});
	}, false);
})();