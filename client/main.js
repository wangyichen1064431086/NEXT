import oGrid from 'o-grid';

const Header = require('ftc-header');
const oHeader = Header.header;
const oSwitcher = Header.switcher
const oSticky = Header.sticky;
const oMenu = Header.menu;

oHeader.init();
oSwitcher.init();

const headerEl = document.querySelector('.o-header');
const headerPrimaryEl = headerEl.querySelector('.o-header__primary');
const headerNavEl = headerEl.querySelector('.o-header__nav');

const headerFixedEl = headerEl.querySelector('.o-header__secondary');

// Get the current layout on page load. We do not want the `o-sticky` module to run if it is `S`. This does not work if user resized their window.
const currentLayout = oGrid.getCurrentLayout();
if (currentLayout !== 'S') {
	new oSticky(headerFixedEl, headerPrimaryEl.offsetHeight);
}

new oMenu(headerNavEl, 'data/nav-section.json');