---
title: Configure
---

### # create_observer

`create_observer` accepts IO options, plus a callback on _a single entry_, and a visual toggle to show the root element's rootBound (give it a try! It's on the top menu bar of this page.)

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
```

> ⚠️ If you pass in a custom `callback`, you'll have to create your own custom events.
> To retain the default behavior, import `default_callback` & wrap around it:
> ```js
> import { default_callback } from 'svelte-use-io';
> const custom_callback = ({ entry, observer }) => {
>   doStuff(entry);
>   default_callback({ entry, observer }); // send `on:intersecting`, `on:unintersecting`
> }
> ```

### # observer

This code

```html
<div use:observer={{ once: true }}>
```

...will observe the `div` only once. Note that if `once` is `false` _and then_ set to `true`, `div` will be observed once again, _once_.

### # Clean up

You'd need to clean up instance of IO on component destroy:

```js
import { onDestroy } from 'svelte'
import { create_observer } from 'svelte-use-io'

const { observer, io } = create_observer({
    rootMargin: `-49% 0px`
})

onDestroy(() => {
    io.disconnect()
})

```

`create_observer` can be used dynamically, but need work to clean up:

```html
<script>
	let margin;
	let observer;
	let io;

	$: marginY = browser && (innerHeight - 2) / 2;
	$: {
        if (io) {
            io.disconnect();
        };
        
        const res = create_observer({
            rootMargin: `-{marginY}px 0px`
        });

        io = res.io
        observer = res.observer
	}
</script>
```