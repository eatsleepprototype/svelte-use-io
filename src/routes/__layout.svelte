<script>
	import 'modern-normalize';
	import Ukraine from '~/components/Ukraine.svelte';
</script>

<Ukraine />
<slot />

<style>
	:global(body),
	:global(code) {
		font-family: 'Space Mono', monospace;
	}

    :global(a) {
        color: hotpink;
    }

	:root {
		--color-fg: #1b1b1b;
		--color-bg: #fff;
		--color-bg-code: #f9fafb;
		--color-bg-code-hover: #f3f4f6;
		--color-code-inline: slateblue;
		--border-w: 3px;
		--margin-x: 1rem;
	}

	:global(html) {
		background-color: var(--color-bg);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--color-fg: #fff;
			--color-bg: #1b1b1b;
			--io-pointer-blend-mode: normal;
			--color-bg-code: #222;
			--color-code-inline: #d8b4fe;
			--color-bg-code-hover: #2d2d2d;
		}
	}

	@media (min-width: 800px) {
		:root {
			--margin-x: 3rem;
		}
	}
</style>
