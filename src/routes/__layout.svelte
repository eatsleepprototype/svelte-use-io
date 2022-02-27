<script>
	import 'modern-normalize';
</script>

<slot />

<style>
	:global(body) {
		font-family: "Space Mono", monospace;
	}

    :global(pre) {
        overflow-x: scroll;
        border-radius: 12px;
    }
</style>
