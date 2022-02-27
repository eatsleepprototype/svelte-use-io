<script>
	export let observer;
	let intersecting;
	let ratio;
</script>

<section>
	<div class="content">
		Enable <code>showRootBound</code> and scroll over this box
	</div>
	<div
		class="hey"
		use:observer
		on:intersecting={({ detail }) => {
			intersecting = true;
			ratio = Math.round(detail.intersectionRatio * 10000) / 100;
		}}
		on:unintersecting={() => (intersecting = false)}
	>
		I'm {intersecting ? '' : 'not'} intersecting
		{intersecting ? `at ${ratio}%` : ''}
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
		background-color: lightpink;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		margin-bottom: 60vh;
        border-radius: 4px;
	}
</style>
