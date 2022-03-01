<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/env';
	import { createObserver } from '~/lib';
	import content from '~/content/homepage.json';
	import RenderHtml from '~/components/RenderHTML.svelte';
	import Section from '~/components/Section.svelte';

	const { observer, io } = createObserver({
		showRootBound: true,
		threshold: Array.from({ length: 11 }, (_, i) => i / 10),
		rootMargin: `-49% 0px`
	});

	const colors = ['lightsalmon', 'lightgreen', 'lightpink', 'MistyRose'];

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
		currentId = null;
	};

	onDestroy(() => {
		io.disconnect();
	});
</script>

<svelte:head>
	<title>svelte-use-io | Svelte action for Intersection Observer</title>
</svelte:head>

<div class="root" style:--color-highlight={colors[colorId]}>
	<nav class="nav">
		<div class="content">
			<h1>
				<img class="logo" src="/favicon.svg" alt="svelte-use-io logo" />
				<span>svelte-use-io</span>
			</h1>
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
				{#each content as { title }, i (i)}
					<li class:active={currentId === i}>
						<a href="#{title}">
							<span class="nav-item-number">{i + 1}</span>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<ul data-grid-name="c" class="container">
			{#each content as { title, html }, i (i)}
				<li id={title}>
					<section
						use:observer
						class:showRootBound
						class="block"
						on:intersecting={handleIntersection(i)}
						on:unintersecting={handleUnintersection}
					>
						<div class="block-num">
							<div class="block-content">
								<div class="label" class:active={currentId === i}>A0{i + 1}</div>
								<h3>{title}</h3>
							</div>

							<RenderHtml {html} />
						</div>
					</section>
				</li>
			{/each}
			<li>
				<Section {observer} displayMessage={showRootBound} />
			</li>
		</ul>
	</main>
	<footer>
		<div>
			Checkout my storybook-like project for Svelte Kit called <a
				href="https://github.com/d4rekanguok/talenote">`talenote`</a
			>.
		</div>
		<div>👋 Bye!</div>
	</footer>
</div>

<style>
	.root {
		color: var(--color-fg);
		background-color: var(--color-bg);
		max-width: 2000px;
	}

	.nav {
		background-color: var(--color-bg);
		border-bottom: var(--border-w) solid var(--color-fg);
		position: sticky;
		top: 0;
		z-index: 100;
		padding: 1rem var(--margin-x, 1rem);
	}

	.main-grid {
		display: grid;
		grid-template-columns: 3rem 1fr;
		grid-template-areas:
			'a a'
			'b c';
		padding: var(--margin-x);
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

	@media (min-width: 1440px) {
		.main-nav {
			font-size: 1.2rem;
		}
	}

	.main-nav-list {
		font-weight: 800;
		writing-mode: vertical-lr;
		text-orientation: sideways-right;
		display: flex;
		gap: 1rem;
		padding: 0;
		margin: 0;
		list-style-type: none;
	}

	.main-nav-list li {
		position: relative;
		padding: 0.5rem;
		transform: translateX(0);
		transition: transform 0.3s ease;
	}

	.main-nav-list li:not(.active)::before {
		content: '';
		position: absolute;
		top: 1rem;
		left: -0.1rem;
		height: calc(100% - 1.5rem);
		width: 2px;
		transform: scaleY(0) rotate(2deg);
		transform-origin: top left;
		opacity: 0;
		transition: transform 0.3s ease, opacity 0.3s ease;
		background-color: var(--color-highlight);
	}

	.main-nav-list li:not(.active):hover {
		transform: translateX(5px);
	}

	.main-nav-list li:not(.active):hover::before {
		opacity: 1;
		transform: scaleY(1) rotate(0);
	}

	.main-nav-list li a {
		color: currentColor;
		text-decoration: none;
	}

	.nav-item-number {
		text-orientation: upright;
		opacity: 0.4;
	}

	@media (prefers-color-scheme: light) {
		.main-nav-list li.active {
			background-color: var(--color-highlight);
		}
	}

	@media (prefers-color-scheme: dark) {
		.main-nav-list li.active {
			color: var(--color-highlight);
		}
	}

	.container {
		margin: 0;
		margin-top: -5rem;
		list-style-type: none;
	}

	.container li {
		padding: 5rem 0;
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
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.content h1 .logo {
		width: 2rem;
		height: 2rem;
	}

	.page-content {
		background-color: var(--color-bg);
		color: var(--color-fg);
		margin-bottom: 10rem;
	}

	.page-content h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		max-width: 640px;
	}

	@media (min-width: 800px) {
		.page-content h2 {
			font-size: 3.5rem;
			max-width: 800px;
		}
	}

	.block {
		min-height: 20vh;
		padding-bottom: 5rem;
		border-bottom: var(--border-w) solid var(--color-fg);
		border-radius: 0px;
		transition: opacity 0.3s ease;
	}

	.block.showRootBound {
		box-shadow: 0 0 0 2px hotpink;
		opacity: 0.6;
		border-radius: 4px;
	}

	.block-num {
		background-color: var(--color-bg);
		color: var(--color-fg);
	}

	@media (min-width: 1440px) {
		.block-num {
			display: grid;
			grid-template-columns: 1fr 2fr;
		}
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
		transition: background-color 0.3s;
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
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
