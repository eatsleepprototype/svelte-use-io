declare namespace svelte.JSX {
	export interface HTMLAttributes<T> {
		onintersecting?: () => void;
		onunintersecting?: () => void;
	}
}
