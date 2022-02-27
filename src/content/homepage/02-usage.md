---
title: Usage
---

```html
<script>
	import { create_observer } from 'svelte-use-io';
	const { observer } = create_observer();
	const doStuff = ({ detail }) => console.log({ detail });
</script>

<ul>
	{#each Array.from({ length: 6 }, (_, i) => i + 1) as i (i)}
	<li use:observer on:intersecting="{doStuff}">Item {i}</li>
	{/each}
</ul>
```
