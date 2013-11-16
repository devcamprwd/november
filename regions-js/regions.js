(function () {
	'use strict';

	var flows = document.webkitGetNamedFlows(),
		flow = flows.namedItem('content'),
		regionsContainer = document.getElementById('regions');

	function checkOverset() {
		if (flow.overset) {
			// add a region element if necessary
			var newRegion = document.createElement('div');
			newRegion.classList.add('region');
			newRegion.classList.add('region-' + (flow.getRegions().length + 1));
			regionsContainer.appendChild(newRegion);
			checkOverset();
		} else {
			// remove empty region elements
			var regions = flow.getRegions();

			if (flow.firstEmptyRegionIndex !== -1) {
				for (var j = flow.firstEmptyRegionIndex; j < regions.length; j += 1) {
					regionsContainer.removeChild(regions[j]);
				}
			}
		}
	}

	function init() {
		checkOverset();
		flow.addEventListener('webkitregionoversetchange', checkOverset);
	}

	init();
})();

(function () {
	'use strict';

	document.getElementById('do-nest').addEventListener('click', function () {
		document.getElementById('regions').className = 'regions-nest';
	});
})();