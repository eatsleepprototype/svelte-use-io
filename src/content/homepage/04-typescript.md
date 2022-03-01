---
title: Typescript
---

To prevent type error when adding custom event listeners on HTML elements, Add these to a definition file such as `global.d.ts`:

```ts
declare namespace svelte.JSX {
	export interface HTMLAttributes<T> {
		onintersecting?: () => void;
		onunintersecting?: () => void;
	}
}
```
