<script>
	export let html = '';
</script>

<div class="block-html">{@html html}</div>

<style>
	.block-html :global(pre) {
		white-space: pre-wrap;
        font-variant-ligatures: none;
		border-radius: 8px;
		overflow: hidden;
		line-height: 1.5;
		font-size: 1.1rem;
	}

	.block-html :global(p) {
		line-height: 1.5;
		font-size: 1.3rem;
		font-family: 'Quattrocento', serif;
	}
    
    .block-html :global(blockquote) {
        margin: 2rem 0;
        padding-left: 2rem;
        border-left: 4px solid var(--color-fg);
	}
</style>
