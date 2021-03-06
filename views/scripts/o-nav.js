/*exported e, ajax*/
function Nav(rootEl) {
	var config = {navClassName: 'o-nav'};
	var oNav = this;

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		var rootDelegate = new Delegate(rootEl);

		oNav.delegate = rootDelegate;
		oNav.rootEl = rootEl;
	}

	function selected() {
		var selectAttribute = '.nav-section-head.mobile';
		var selectableEls = oNav.rootEl.querySelectorAll(selectAttribute);

		oNav.delegate.on('click', selectAttribute, function (e, selectable) {
			for (var i = 0; i < selectableEls.length; i++) {
				selectableEls[i].setAttribute('aria-selected', 'false');
			}
			selectable.setAttribute('aria-selected', 'true');
		});
	}

	function preventScroll() {
		var navToggle = oNav.rootEl.querySelector('[data-o-nav-togglable]');
		var navOpenClass = config.navClassName + '--open';

		if (navToggle) {
			navToggle.addEventListener('click', function() {
				document.documentElement.classList.toggle(navOpenClass);
				document.body.classList.toggle(navOpenClass);
			});
		}
	}

	function toggle() {
		var toggleAttribute = '[data-o-nav-togglable]';

		oNav.delegate.on('click', toggleAttribute, function (e, togglerEl) {
			var togglerElState = togglerEl.getAttribute('aria-pressed');

			if (togglerElState === 'true') {
				togglerEl.setAttribute('aria-pressed', 'false');
			} else if (togglerElState === 'false' || !togglerElState) {
				togglerEl.setAttribute('aria-pressed', 'true');
			}
		});
	}
	
	init();
	preventScroll();
	toggle();
	selected();
}

// function Sticky(fixedEl, startDistance, endDistance) {
// 	const oSticky = this;
// 	const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) }


// 	function init() {	
// 		oSticky.lastPosition = -1;
// 		if (!startDistance) {
// 			startDistance = 0;
// 		}
// 		oSticky.start = startDistance;
// 		oSticky.end = endDistance;
// 		if (!(fixedEl instanceof HTMLElement)) {
// 			fixedEl = document.querySelector(fixedEl);
// 		}
// 		oSticky.fixedEl = fixedEl;
// 	}

// 	function loop(){
// 	    // Avoid calculations if not needed
// 	    var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

// 	    if (oSticky.lastPosition == scrollY) {
// 	        rAF(loop);
// 	        return false;
// 	    } else {
// 	    	oSticky.lastPosition = scrollY;
// 	    }

// 	    var abovePeak = oSticky.lastPosition < oSticky.start;

// 	    var underTrough = oSticky.lastPosition > oSticky.end;

// 	    var between = !abovePeak && !underTrough;

// 	    console.log('abovePeak: ' + abovePeak + ', between: ' + between + ', underTrough: ' + underTrough);

// 	    //var withinRange = oSticky.end ? ((oSticky.lastPosition > oSticky.start) && (oSticky.lastPosition < oSticky.end)) : (oSticky.lastPosition > oSticky.start);

// 	    var sticked = oSticky.fixedEl.getAttribute('aria-sticky');
// 	    var troughed = oSticky.fixedEl.getAttribute('aria-troughed');

// 	    if (between && !sticked) {
// 	    	oSticky.fixedEl.setAttribute('aria-sticky', 'true');
// 	    } else if (!between && sticked) {
// 	    	oSticky.fixedEl.removeAttribute('aria-sticky');
// 	    }

// 	    if (underTrough && !troughed) {
// 	    	oSticky.fixedEl.setAttribute('aria-troughed', 'true');
// 	    } else if (!underTrough && troughed) {
// 	    	oSticky.fixedEl.removeAttribute('aria-troughed');
// 	    }

// 	    rAF( loop );
// 	}
// 	init();
// 	loop();
// }

// function getElementOffset(e) {

// 	function getPageOffset(w) {
// 		w = w || window;
// 		var x = (w.pageXOffset !== undefined) ? w.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
// 		var y = (w.pageYOffset !== undefined) ? w.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
// 		return {x: x, y: y};
// 	}

// 	if (!(e instanceof HTMLElement)) {
// 		e = document.querySelector(e);
// 	}
// 	var box = e.getBoundingClientRect();
// 	var offset = getPageOffset();
// 	var x1 = box.left + offset.x;
// 	var x2 = box.right + offset.x;
// 	var y1 = box.top + offset.y;
// 	var y2 = box.bottom + offset.y;

// 	return {xLeft: x1,  xRight: x2, yTop: y1,yBottom: y2};
// }

// callback(error, data)
var ajax = {
	getData: function (url, callback) {
	  var xhr = new XMLHttpRequest();  

	  xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
	      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
	        var type = xhr.getResponseHeader('Content-Type');
	        if (type.indexOf('html') !== -1 && xhr.responseXML) {
	          callback(null, xhr.responseXML);
	        } else if (type === 'application/json') {
	          callback(null, JSON.parse(xhr.responseText));
	        } else {
	          callback(null, xhr.responseText);
	        }
	      } else {
	        //console.log('Request was unsuccessful: ' + xhr.status);
	        callback(xhr.status);
	      }

	    } else {
	      //console.log('readyState: ' + xhr.readyState);
	    }
	  };

	  // xhr.onprogress = function(event) {
	  //   console.log('Request Progress: Received ' + event.loaded / 1000 + 'kb, Total' + event.total / 1000 + 'kb');
	  // };
	  xhr.open('GET', url);
	  xhr.send(null);
	}
};



function oNavSections(container) {
	var navSectionClassname = '.nav-section';

	var navSectionEls = container.querySelectorAll(navSectionClassname);
	var navSectionsObj = {};

	for (var i = 0, len = navSectionEls.length; i < len; i++) {
		var navSectionEl = navSectionEls[i];

		var selected = navSectionEl.getAttribute('aria-selected');
		var navSectionName = navSectionEl.getAttribute('data-section');

		if ((!selected) && navSectionName) {
			navSectionsObj[navSectionName] = navSectionEl;
		}
	}
	return navSectionsObj;
}

function zipObject(objA, objB) {
	for (var k in objA) {
		objA[k].appendChild(objB[k]);
	}
}

var navEl = document.querySelector('.o-nav');
//var navElOffset = getElementOffset(navEl);

new Nav(navEl);
// new Sticky(navEl, navElOffset.yTop);

var initialNavSections = oNavSections(navEl);

ajax.getData('ajax.php', function(error, data) {
// `data` is text, not DOM! 
// You need to parse data into DOM before appending it.
	if (error) {return;}
	var wrapperEl = document.createElement('ol');
	wrapperEl.innerHTML = data;

	var navSectionEls = wrapperEl.querySelectorAll('.nav-section');

	var navSectionsObj = {};

	for (var i = 0, len = navSectionEls.length; i< len; i++) {

		var navSectionEl = navSectionEls[i];

		var navSectionName = navSectionEl.getAttribute('data-section');
		var navItemsEl = navSectionEl.querySelector('.nav-items');

		navSectionsObj[navSectionName] = navItemsEl;
	}
	zipObject(initialNavSections, navSectionsObj);
});