import type { Options, ActionOptions } from './types';
import { create_pointer } from './create_pointer';

export const default_callback: Options['callback'] = ({ entry, observer }) => {
	const el = entry.target as HTMLElement;

	if (entry.isIntersecting) {
		el.dispatchEvent(
			new CustomEvent('intersecting', {
				detail: entry
			})
		);
		if (el.dataset.ioOnce === 'true') {
			observer.unobserve(el);
		}
	} else {
		el.dispatchEvent(
			new CustomEvent('unintersecting', {
				detail: entry
			})
		);
	}
};

const default_options: Options = {
	root: null,
	rootMargin: '0px',
	callback: default_callback
};

export function create_observer(options: Options = {}) {
	let io = {
		disconnect: () => null
	} as IntersectionObserver;
	let observer: (node: HTMLElement, action_options?: ActionOptions) => void;

	const { callback, showRootBound, ...io_options } = {
		...default_options,
		...options
	};

	const cb: IntersectionObserverCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (showRootBound) {
				create_pointer(entry);
			}
			callback({ entry, observer });
		});
	};

	if (typeof window !== 'undefined') {
		io = new IntersectionObserver(cb, io_options);

		observer = (node: HTMLElement, { once = false } = {}) => {
			node.dataset.ioOnce = once.toString();
			io.observe(node);

			return {
				update(nextOption: ActionOptions) {
					const current_once = node.dataset.ioOnce;
					const next_once = nextOption.once.toString();

					// re-observe this node if 'once' is disabled
					if (current_once === 'true' && next_once === 'false') {
						io.observe(node);
					}
					node.dataset.ioOnce = next_once;
				},
				destroy() {
					io.unobserve(node);
				}
			};
		};
	}

	return { observer, io };
}
