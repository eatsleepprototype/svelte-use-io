<script lang="ts">
	import { onDestroy } from 'svelte';
	import { create_observer } from '~/lib/observer';

	const once = false;
	const { observer, io } = create_observer({
		rootMargin: `-49% 0px`
	});

	let count = 6;
	let currentId = 0;

	const handleIntersection = (id) => () => {
		currentId = id;
	};

	onDestroy(() => {
		io.disconnect();
	});
</script>

<nav class="nav">
	<div class="content">
		<div data-test-id-container={currentId + 1}>{currentId + 1}</div>
	</div>
</nav>
<main class="container">
	{#each Array.from({ length: count }) as _, i (i)}
		<section use:observer={{ once }} class="block" on:intersecting={handleIntersection(i)}>
			<div class="block-num">
				{i + 1}
			</div>
		</section>
	{/each}
</main>

<style>
	.nav {
		color: rgba(var(--color-white) / 1);
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-fg);

		position: sticky;
		top: 0;
		padding: 1rem;
	}

	.block {
		height: 80vh;
	}
</style>
