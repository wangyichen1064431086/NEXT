import oGrid from 'o-grid';

const util = require('./js/util');
const Header = require('ftc-header');
const oHeader = Header.header;
const oSwitcher = Header.switcher
const oSticky = Header.sticky;
const oMenu = Header.menu;

oHeader.init();
oSwitcher.init();

const headerEl = document.querySelector('.o-header');

const headerNavEl = headerEl.querySelector('.o-header__nav');

const headerSecondaryEl = headerEl.querySelector('.o-header__secondary');

const headerSecondaryElOffset = util.elementOffset(headerSecondaryEl);


// Get the current layout on page load. We do not want the `o-sticky` module to run if it is `S`. This does not work if user resized their window.
const currentLayout = oGrid.getCurrentLayout();
if (currentLayout !== 'S') {
	new oSticky(headerSecondaryEl, headerSecondaryElOffset.y);
}

new oMenu(headerNavEl, 'data/sub-nav.json');