const get_intersecting = (entries) => {
	let count = 0;
	for (const entry of entries) {
		if (entry.isIntersecting) {
			count++;
			break;
		}
	}

	return count > 0;
};

export const create_pointer = (entries: IntersectionObserverEntry[]) => {
	if (typeof window === 'undefined') {
		return;
	}

	const entry = entries[0];
	const intersecting = get_intersecting(entries);

	let pointerEl: HTMLDivElement = document.querySelector('[data-use-io-dev]');

	if (!pointerEl) {
		pointerEl = document.createElement('div');
		pointerEl.dataset.useIoDev = 'true';
		pointerEl.style.setProperty('font-size', '0.8rem');
		pointerEl.style.setProperty('mix-bl	end-mode', 'var(--io-pointer-blend-mode, multiply)');
		pointerEl.style.setProperty('text-indent', '10px');
		pointerEl.style.setProperty('position', 'fixed');
		pointerEl.style.setProperty('z-index', '99999');
		pointerEl.style.setProperty('opacity', 'var(--io-pointer-opacity, 1)');

		document.body.appendChild(pointerEl);
	}

	const { rootBounds } = entry;
	const { top, left, width, height } = rootBounds;
	pointerEl.style.setProperty('top', `${top}px`);
	pointerEl.style.setProperty('left', `${left}px`);
	pointerEl.style.setProperty('width', `${width}px`);
	pointerEl.style.setProperty('height', `${height}px`);
	if (intersecting) {
		pointerEl.style.setProperty('color', 'var(--io-pointer-color-text-intersecting, #14532d)');
		pointerEl.style.setProperty(
			'background-color',
			'var(--io-pointer-color-intersecting, rgba(0 250 154 / 0.3))'
		);
		pointerEl.textContent = 'intersecting';
	} else {
		pointerEl.style.setProperty('color', 'var(--io-pointer-color-text, deeppink)');
		pointerEl.style.setProperty(
			'background-color',
			'var(--io-pointer-color, rgba(255 20 147 / 0.3 ))'
		);
		pointerEl.textContent = 'rootBound';
	}
};
