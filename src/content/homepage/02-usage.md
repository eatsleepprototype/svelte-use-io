---
title: Quick usage
---

Passing directly to html elements:

```html
<script>
	import { onDestroy } from 'svelte';
	import { createObserver } from 'svelte-use-io';
	const { observer } = createObserver();
	const doStuff = ({ detail }) => console.log({ detail });
	// { detail: IntersectionObserverEntry }
</script>

<ul>
	{#each Array.from({ length: 6 }, (_, i) => i + 1) as i (i)}
	<li use:observer on:intersecting="{doStuff}">Item {i}</li>
	{/each}
</ul>
```

Passing to components:

```html
<!-- In outer components -->
<ul>
	{#each content as { _id, ...data } (_id)}
	<section {observer} {data}></section>
	{/each}
</ul>

<!-- In Section.svelte -->
<section use:observer>
	<div>...</div>
</section>
```

Listening only once:

```html
	<div use:observer={{ once: true }}></div>
	<!-- or -->
	<div use:observer data-io-once="true"></div>
```

Other demos:

- [[Svelte REPL] Observe a single / multiple targets at once](https://svelte.dev/repl/ea03c5b6a4f9483fa90df6e3c0587f56?version=3.46.4)
