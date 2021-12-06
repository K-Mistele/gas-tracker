/**
 * Show a page
 * @param page - a valid page name from ${@link navigate}
 */
function showPage(page) {
	console.log(`Showing ${page}`)
	const selector = `#${page}-page`;
	_highlightPageNav(page);
	const element = document.querySelector(selector);
	element.scrollIntoView()

}

/**
 * Hide a page
 * @param page - a valid page from {@link navigate}
 */
function hidePage(page) {
	console.log(`Hiding ${page}`)
	const selector = `#${page}-page`;
	_highlightPageNav(page);
	const element = document.querySelector(selector);
	element.scrollIntoView()
}

/**
 * Highlight a page's nav. Should only be called by {@link showPage}
 * @param page - a valid page from {@link navigate}
 * @private
 */
function _highlightPageNav(page) {
	[...document.getElementsByClassName('sidebar-tab')].forEach(nav => {
		nav.style.border = '';
	})
	document.getElementById(`${page}-tab`).style.border = '1px solid #F2F4F6';
}

/**
 * 'Navigate' to a page
 * @param {'statistics' | 'notifications'} page - the page to navigate to
 */
function navigate(page) {
	console.log(`Navigating to ${page}!`);

	switch (page) {
		case 'statistics':
			hidePage('notifications');
			showPage('statistics');
			break;
		case 'notifications':
			hidePage('statistics');
			showPage('notifications');
			break;
		default:
			console.error('Invalid page to navigate to!');
			return;
	}
}