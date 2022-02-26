<script lang="ts">
	import { onDestroy } from 'svelte';
	import { create_observer } from '~/lib/observer';

	const { observer, io } = create_observer({
		showRootBound: true,
		rootMargin: `-49% 0px`
	});

	const colors = ['lightsalmon', 'darkslateblue', 'lightpink', 'tomato', 'lightblue'];

	let count = 6;
	let colorId = 0;
	let currentId = 0;

	const handleIntersection = (id) => () => {
		colorId = (colorId + 1) % colors.length;
		currentId = id;
	};

	onDestroy(() => {
		io.disconnect();
	});
</script>

<div class="root" style:--color-bg={colors[colorId]}>
	<nav class="nav">
		<div class="content">
			<h1>use-observer</h1>
			<div data-test-id-container={currentId + 1}>{currentId + 1}</div>
		</div>
	</nav>

	<main class="container">
		{#each Array.from({ length: count }) as _, i (i)}
			<section use:observer={{ once: true }} class="block" on:intersecting={handleIntersection(i)}>
				<div class="block-num">
					{i + 1}
				</div>
			</section>
		{/each}
	</main>
</div>

<style>
	.root {
		--color-opacity: 0.4;
		--color-white: 255 255 255;
		--color-fg: rgba(var(--color-white) / var(--color-opacity));
		--color-bg: lightsalmon;

		background-color: var(--color-bg);
		color: var(--color-fg);
		transition: background-color 0.3s ease;
	}

	.nav {
		color: rgba(var(--color-white) / 1);
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-fg);

		position: sticky;
		top: 0;
		padding: 1rem;
	}

	.container {
		display: grid;
		grid-gap: 4rem;
		padding: 0 2rem;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content h1 {
		margin: 0;
	}

	.block {
		height: 80vh;
		margin: 4rem 0;
	}

	.block-num {
		--color-opacity: 1;
		color: rgba(var(--color-white) / var(--color-opacity));
		background-color: var(--color-fg);

		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;

		font-size: 8vw;
		font-weight: bold;
		opacity: 1;
	}
</style>
