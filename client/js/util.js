function getPageOffset(w) {
	w = w || window;
	var x = (w.pageXOffset !== undefined) ? w.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	var y = (w.pageYOffset !== undefined) ? w.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	return {x: x, y: y};
}


function getElementOffset(e) {
	if (!(e instanceof HTMLElement)) {
		e = document.querySelector(e);
	}
	var box = e.getBoundingClientRect();
	var offset = getPageOffset();
	var x = box.left + offset.x;
	var y = box.top + offset.y;

	return {x: x, y: y};
}

function getElementSize(e) {
	if (!(e instanceof HTMLElement)) {
		e = document.querySelector(e);
	}
	var box = e.getBoundingClientRect();
	var w = box.width || (box.right - box.left);
	var h = box.height || (box.bottom - box.top);
	return {width: w, height: h};
}
module.exports = {
	elementOffset: getElementOffset,
	pageOffset: getPageOffset,
	elementSize: getElementOffset
};