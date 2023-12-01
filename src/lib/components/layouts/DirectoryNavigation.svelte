<script lang="ts">
	import SectionNavigation from '$lib/components/layouts/SectionNavigation.svelte';

	export let directories;
</script>

<div class="sidebar-content">
	<h4>Launch Pad Wiki</h4>
	{#each Object.entries(directories.directories) as [directory, files]}
		<SectionNavigation directory={{ name: directory, files: files }} />
	{/each}
</div>

<style lang="scss">
	.sidebar-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow-y: scroll;
		row-gap: 0.4rem;
		color: var(--color-text-1);
		padding: 1rem 3rem;
		flex: 1;
		height: 100%;
	}
</style>
