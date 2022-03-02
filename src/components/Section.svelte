<script>
	import { fade } from 'svelte/transition';

	export let observer;
	export let displayMessage = false;

	let intersecting;
	let ratio;
</script>

<section>
	<div class="content">
		Enable <code>showRootBound</code> and scroll over this box
	</div>
	<div
		class="hey"
		aria-live="polite"
		use:observer
		on:intersecting={({ detail }) => {
			intersecting = true;
			ratio = Math.round(detail.intersectionRatio * 10000) / 100;
		}}
		on:unintersecting={() => (intersecting = false)}
	>
		{#if displayMessage}
			<span transition:fade>
				I'm {intersecting ? '' : 'not'} intersecting
				{intersecting ? `at ${ratio}%` : ''}
			</span>
			<a
				transition:fade={{ delay: 100 }}
				href="https://github.com/eatsleepprototype/svelte-use-io/blob/main/src/components/Section.svelte"
				>Source (github)</a
			>
		{/if}
	</div>
	<div class="padder">
		{`<!-- Just empty space to pad the box up -->`}
	</div>
</section>

<style>
	.content {
		text-align: center;
		margin-bottom: 1rem;
	}

	.hey {
		position: relative;
		padding: 1rem;
		min-height: 10vh;
		width: 100%;
		color: #9d174d;
		background-color: lightpink;
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		border-radius: 4px;
	}

	.hey a {
		color: currentColor;
		font-size: 1rem;
	}

	.padder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60vh;
		opacity: 0.6;
	}
</style>
