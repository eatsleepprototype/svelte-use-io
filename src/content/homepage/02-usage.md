---
title: Quick usage
---

Passing directly to html elements:

```html
<script>
	import { onDestroy } from 'svelte';
	import { create_observer } from 'svelte-use-io';
	const { observer, io } = create_observer();
	const doStuff = ({ detail }) => console.log({ detail });
	// { detail: IntersectionObserverEntry }

	onDestroy(() => {
		io.disconnect();
	})
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
