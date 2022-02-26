export interface CallbackArgs {
	entry: IntersectionObserverEntry;
	observer: IntersectionObserver;
}

export interface Options extends IntersectionObserverInit {
	callback?: (args: CallbackArgs) => void;
	showRootBound?: boolean;
}

export interface ActionOptions {
	once?: boolean;
}
