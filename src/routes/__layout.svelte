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
</style>
