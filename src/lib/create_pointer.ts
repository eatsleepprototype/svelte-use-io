export const create_pointer = (entry: IntersectionObserverEntry) => {
	if (typeof window === 'undefined') {
		return;
	}

	let pointerEl: HTMLDivElement = document.querySelector('[data-use-io-dev]');

	if (!pointerEl) {
		pointerEl = document.createElement('div');
		pointerEl.dataset.useIoDev = 'true';
		pointerEl.style.setProperty('position', 'fixed');
		pointerEl.style.setProperty('z-index', '99999');
		pointerEl.style.setProperty('background-color', 'red');
		pointerEl.style.setProperty('opacity', '0.4');

		document.body.appendChild(pointerEl);
	}

	const { rootBounds } = entry;
	const { top, left, width, height } = rootBounds;
	pointerEl.style.setProperty('top', `${top}px`);
	pointerEl.style.setProperty('left', `${left}px`);
	pointerEl.style.setProperty('width', `${width}px`);
	pointerEl.style.setProperty('height', `${height}px`);
};
