function LazyLoader(rootEl, config={
	webservice: 'https://image.webservices.ft.com/v1/images/raw/', 
	sponsorClassName: 'sponsor',
	srcAttribute: 'data-src',
	typeAttribute: 'data-loader-type'
	}) {
	const loader = this;

	function init() {
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		loader.rootEl = rootEl;
		
		var loaderType = rootEl.getAttribute(config.typeAttribute);
		var src = rootEl.getAttribute(config.srcAttribute);

		if (!src) {
			return;
		}

		if (src && loaderType === 'image') {
			src = src.replace('i.ftimg.net', 'i.ftmailbox.com');
		} 			


		loader.width = rootEl.offsetWidth;
		loader.height = rootEl.offsetHeight;

		loader.isSponsor = rootEl.classList.contains(config.sponsorClassName);

		if (loaderType === 'image') {
			createImg(src);
		} else if (loaderType === 'video') {
			createIframe(src);
		}
		
	}

	function createImg (url) {
		const imgEl = document.createElement('img');
		imgEl.src = generateSrc(url);
		loader.rootEl.appendChild(imgEl);
	}

	function generateSrc (url) {
		url = encodeURIComponent(url);
		if (loader.isSponsor) {
			return config.webservice + url  + '?source=ftchinese&height=' + loader.height + '&fit=cover';
		} else {
			return config.webservice + url + '?source=ftchinese&width=' + loader.width + '&height=' + loader.height + '&fit=cover';
		}
	}

	function createIframe(id) {
		const iframeEl = document.createElement('iframe');
		iframeEl.name = 'video-frame';
		iframeEl.id = 'video-frame';
		iframeEl.src = '/video/' + id + '?i=2&k=1&w='+loader.width+'&h='+loader.height+'&autostart=false';

		loader.rootEl.appendChild(iframeEl);
	}

	init();
}

LazyLoader.init = function(el) {
	const loaderInstances = [];

	if (!el) {
		el = document.body
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}

	const loaderEls = el.querySelectorAll('[data-o-component=image-loader]');

	for (let i = 0; i < loaderEls.length; i++) {
		const loader = new LazyLoader(loaderEls[i]);
		console.log(loader);
		loaderInstances.push(loader);
	}

	return loaderInstances;
}

module.exports = LazyLoader;