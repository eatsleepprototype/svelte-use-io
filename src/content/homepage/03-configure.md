---
title: Configure
---

### #create_observer / createObserver

`createObserver` accepts IO options, plus a callback on _a single entry_, and a visual toggle to show the root element's rootBound (give it a try! It's on the top menu bar of this page.)

```typescript
interface Options {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
	callback?: ({
        entry: IntersectionObserverEntry
        observer: IntersectionObserver
    }) => void;
	showRootBound?: boolean;
}

interface Returns {
    observer: (node: HTMLElement) => void;
    io: IntersectionObserver
}
```

> ⚠️ If you pass in a custom `callback`, you'll have to create your own custom events.
> To retain the default behavior, import `defaultCallback` & wrap around it:
>
> ```js
> import { defaultCallback } from 'svelte-use-io';
> const customCallback = ({ entry, observer }) => {
> 	doStuff(entry);
> 	defaultCallback({ entry, observer }); // send `on:intersecting`, `on:unintersecting`
> };
> ```

### #observer

This code

```html
<div use:observer={{ once: true }}>
```

...will observe the `div` only once. Note that if `once` is `false` _and then_ set to `true`, `div` will be observed once again, _once_.

### #Clean up / disconnect()

When an observed element is destroyed, it'll also be unobserved. The observer instance will be garbage-collected when it no longer observes anything _and_ have no references (See this [thread](https://github.com/w3c/IntersectionObserver/issues/64).)

If you'd like to disconnect all observers manually:

```js
import { onDestroy } from 'svelte';

const { observer, io } = createObserver();

onDestroy(() => {
	io.disconnect();
});
```
