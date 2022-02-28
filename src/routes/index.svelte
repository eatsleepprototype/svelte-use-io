<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/env';
	import { create_observer } from '~/lib';
	import content from '~/content/homepage.json';
	import RenderHtml from '~/components/RenderHTML.svelte';
	import Section from '~/components/Section.svelte';

	const { observer, io } = create_observer({
		showRootBound: true,
		threshold: Array.from({ length: 11 }, (_, i) => i / 10),
		rootMargin: `-49% 0px`
	});

	const colors = ['lightsalmon', 'lightgreen', 'lightpink', 'tomato', 'lightblue'];

	let colorId = 0;
	let currentId = 0;
	let showRootBound = false;

	$: browser &&
		document.body.style.setProperty('--io-pointer-opacity', Number(showRootBound).toString());

	const handleIntersection = (id: number) => () => {
		colorId = (colorId + 1) % colors.length;
		currentId = id;
	};

	const handleUnintersection = () => {
		currentId = null
	}

	onDestroy(() => {
		io.disconnect();
	});
</script>

<div class="root" style:--color-highlight={colors[colorId]}>
	<nav class="nav">
		<div class="content">
			<h1>svelte-use-io</h1>
			<label class="fancy-switch">
				<input bind:checked={showRootBound} type="checkbox" />
				<span>Show <code>rootBound</code></span>
			</label>
			<div>
				<a href="https://github.com/d4rekanguok/svelte-use-io">Github↗</a>
			</div>
		</div>
	</nav>

	<main class="main-grid">
		<div data-grid-name="a" class="page-content">
			<h2>A Svelte action for intersection observer</h2>
			<div>
				<code>npm i svelte-use-io</code>
				·
				<span>Complaint box: <a href="https://twitter.com/DerekNguyen10">@dereknguyen10</a></span>
			</div>
		</div>
		<nav class="main-nav" data-grid-name="b">
			<ul class="main-nav-list">
				{#each content as _, i (i)}
					<li class:active={currentId === i}>
						A0{i + 1}
					</li>
				{/each}
			</ul>
		</nav>
		<div data-grid-name="c" class="container">
			{#each content as { title, html }, i (i)}
				<section
					use:observer
					class:showRootBound
					class="block"
					on:intersecting={handleIntersection(i)}
					on:unintersecting={handleUnintersection}
				>
					<div class="block-num">
						<div class="label" class:active={currentId === i}>A0{i + 1}</div>
						<h3>{title}</h3>
						<RenderHtml {html} />
					</div>
				</section>
			{/each}
			<Section {observer} displayMessage={showRootBound} />
		</div>
	</main>
	<footer>
		<div>If you like this, checkout my storybook rip-off called `talenote`.</div>
		<div>👋 Bye!</div>
	</footer>
</div>

<style>
	.root {
		--color-black: 2 2 2;
		--color-fg: rgba(var(--color-black) / 1);
		--color-bg: white;
		--color-bg-100: #f3f4f6;
		--border-w: 3px;

		color: var(--color-fg);
		transition: background-color 0.3s ease;
	}

	.nav {
		color: rgba(var(--color-black) / 1);
		background-color: var(--color-bg);
		border-bottom: var(--border-w) solid var(--color-fg);

		position: sticky;
		top: 0;
		z-index: 100;
		padding: 1rem;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 3rem 1fr;
		grid-template-areas:
			'a a'
			'b c';
	}

	@media (min-width: 600px) {
		.main-grid {
			grid-template-columns: 20% 1fr;
		}
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
		top: 5rem;
	}

	.main-nav-list {
		font-weight: 800;
		writing-mode: vertical-lr;
		text-orientation: sideways-right;
		display: flex;
		gap: 1rem;
		padding: 0;
		list-style-type: none;
	}

	.main-nav-list li {
		padding: 0.5rem 0.25rem;
	}

	.main-nav-list li.active {
		background-color: var(--color-highlight);
	}

	.container {
		padding: 0 2rem;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.content h1 {
		margin: 0;
		font-size: 1rem;
	}

	.page-content {
		padding: 0 1rem;
		background-color: white;
		color: #222;
		margin-bottom: 8rem;
	}

	.page-content h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		max-width: 640px;
	}

	.block {
		min-height: 20vh;
		padding-bottom: 4rem;
		margin-bottom: 4rem;
		border-bottom: var(--border-w) solid black;
		border-radius: 4px;
		transition: opacity 0.3s ease;
	}

	.block.showRootBound {
		box-shadow: 0 0 0 2px hotpink;
		opacity: 0.6;
	}

	.block-num {
		--color-opacity: 1;
		color: rgba(var(--color-black) / var(--color-opacity));
	}

	.block-num .label {
		position: relative;
		display: inline-block;
		font-size: 1.5rem;
		font-weight: 800;
		position: relative;
		transform: translateX(0);
		transition: transform 0.3s ease;
	}

	.block-num .label::before {
		content: '';
		position: absolute;
		top: 40%;
		left: -50px;
		width: 44px;
		height: 8px;
		opacity: 0;
		background-color: var(--color-highlight);
		transform: scaleX(0);
		transform-origin: center right;
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.block-num .label.active {
		transform: translateX(50px);
	}

	.block-num .label.active::before {
		transform: scaleX(1);
		opacity: 1;
	}

	.block-num h3 {
		font-size: 3rem;
		margin: 0;
		font-weight: 600;
		opacity: 1;
	}

	.fancy-switch {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.fancy-switch input {
		appearance: none;
		position: relative;
		width: 2.25rem;
		height: 1.5rem;
		border-radius: 999px;
		background-color: var(--color-fg);
		transition: background-color 0.3s ease;
	}

	.fancy-switch input::before {
		content: '';
		position: absolute;
		top: 0.25rem;
		left: 0.25rem;
		transform: translateX(0rem);
		width: 1rem;
		height: 1rem;
		border-radius: 999px;
		background-color: var(--color-bg);
		transition: transform 0.3s ease;
	}

	.fancy-switch input:checked {
		background-color: hotpink;
	}

	.fancy-switch input:checked::before {
		transform: translateX(0.75rem);
	}

	footer {
		border-top: var(--border-w) solid var(--color-fg);
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}
</style>
