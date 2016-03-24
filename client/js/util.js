function getScrollOffset(w) {
	w = w || window;
	if (w.pageXOffset != null) {
		return {
			x: w.pageXOffset,
			y: w.pageYOffset
		};
	}
	var d = w.document;
	if (document.compatMode == CSS1Compat) {
		return {
			x: d.documentElement.scrollLeft,
			y: d.documentElement.scrollTop
		};
	}
	return {
		x: d.body.scrollLeft,
		y: d.body.scrollTop
	};
}


function getElementOffset(e) {
	var box = e.getBoundingClientRect();
	var offset = getScrollOffset();
	var x = box.left + offset.x;
	var y = box.top + offset.y;

	return {x: x, y: y};
}

module.exports = {
	elementOffset: getElementOffset,
	scrollOffset: getScrollOffset
};