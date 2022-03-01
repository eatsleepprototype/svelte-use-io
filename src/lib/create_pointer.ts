export const create_pointer = (entry: IntersectionObserverEntry) => {
	if (typeof window === 'undefined') {
		return;
	}

	let pointerEl: HTMLDivElement = document.querySelector('[data-use-io-dev]');

	if (!pointerEl) {
		pointerEl = document.createElement('div');
		pointerEl.dataset.useIoDev = 'true';
		pointerEl.textContent = 'rootBound';
		pointerEl.style.setProperty('font-size', '0.8rem');
		pointerEl.style.setProperty('color', 'rgb(255 20 147)');
		pointerEl.style.setProperty('mix-blend-mode', 'var(--io-pointer-blend-mode, multiply)');
		pointerEl.style.setProperty('text-indent', '10px');
		pointerEl.style.setProperty('position', 'fixed');
		pointerEl.style.setProperty('z-index', '99999');
		pointerEl.style.setProperty(
			'background-color',
			'var(--io-pointer-color, rgba(255 20 147 / 0.3 ))'
		);
		pointerEl.style.setProperty('opacity', 'var(--io-pointer-opacity, 1)');

		document.body.appendChild(pointerEl);
	}

	const { rootBounds } = entry;
	const { top, left, width, height } = rootBounds;
	pointerEl.style.setProperty('top', `${top}px`);
	pointerEl.style.setProperty('left', `${left}px`);
	pointerEl.style.setProperty('width', `${width}px`);
	pointerEl.style.setProperty('height', `${height}px`);
};
