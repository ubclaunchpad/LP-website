<script lang="ts">
	import './styles.scss';
	import './markdown.scss';
	import DirectoryNavigation from '$lib/components/layouts/DirectoryNavigation.svelte';
	export let data;
</script>

<slot />
<!--{/key}-->

<div class="hidden">
	<DirectoryNavigation directories={data.posts} />
</div>

<style lang="scss">
	.hidden {
		display: none;
	}
</style>
