<script lang="ts">
	import { onDestroy } from 'svelte';
	import { create_observer } from '~/lib/observer';

	const { observer, io } = create_observer({
		showRootBound: true,
		rootMargin: `-49% 0px`
	});

	const colors = ['lightsalmon', 'lightgreen', 'lightpink', 'tomato', 'lightblue'];

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

<div class="root" style:--color-highlight={colors[colorId]}>
	<nav class="nav">
		<div class="content">
			<h1>svelte-use-observer</h1>
			<div>
				<a href="https://github.com/d4rekanguok/svelte-use-io">Github↗</a>
			</div>
		</div>
	</nav>

	<main class="main-grid">
		<div data-grid-name="a" class="page-content">
			<h2>A Svelte action for intersection observer</h2>
			
		</div>
		<nav class="main-nav" data-grid-name="b">
			<ul class="main-nav-list">
				{#each Array.from({ length: count }) as _, i (i)}
					<li class:active={currentId === i}>
						A0{i + 1}
					</li>
				{/each}
			</ul>
		</nav>
		<div data-grid-name="c" class="container">
			{#each Array.from({ length: count }) as _, i (i)}
				<section use:observer class="block" on:intersecting={handleIntersection(i)}>
					<div class="block-num">
						A0{i + 1}
					</div>
				</section>
			{/each}
		</div>
	</main>
</div>

<style>
	.root {
		--color-black: 2 2 2;
		--color-fg: rgba(var(--color-black) / 1);
		--color-bg: white;
		--border-w: 3px;

		background-color: --color-bg;
		color: var(--color-fg);
		transition: background-color 0.3s ease;
	}

	.nav {
		color: rgba(var(--color-black) / 1);
		background-color: var(--color-bg);
		border-bottom: var(--border-w) solid var(--color-fg);

		position: sticky;
		top: 0;
		padding: 1rem;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 3rem 1fr;
		grid-template-areas:
			'a a'
			'b c';
	}

	[data-grid-name='a'] {
		grid-area: a;
	}
	[data-grid-name='b'] {
		grid-area: b;
	}
	[data-grid-name='c'] {
		grid-area: c;
	}

	.main-nav {
		align-self: start;
		position: sticky;
		top: 4rem;
	}

	.main-nav-list {
		font-weight: 800;
		writing-mode: vertical-lr;
		text-orientation: sideways-right;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0;
		list-style-type: none;
	}

	.main-nav-list li.active {
		background-color: var(--color-highlight);
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
		font-size: 1rem;
	}

	.page-content {
		padding: 1rem;
		background-color: white;
		color: #222;
	}
	
	.page-content h2 {
		font-size: 3rem;
	}

	.block {
		height: 20vh;
		margin: 4rem 0;
	}

	.block-num {
		--color-opacity: 1;
		color: rgba(var(--color-black) / var(--color-opacity));

		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-bottom: var(--border-w) solid black;

		font-size: 4rem;
		font-weight: bold;
		opacity: 1;
	}
</style>
