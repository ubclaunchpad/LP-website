<script lang="ts">
	import ResourceNav from './ResourceNav.svelte';

	export let data;
</script>

<div class="sidebar-content">
	<ul class="directory-list">
		{#each data.directories as directory}
			<ResourceNav {directory} />
		{/each}
	</ul>
</div>

<style lang="scss">
	.sidebar-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		row-gap: 1rem;
		color: var(--color-text-1);
		padding: 0rem 0.5rem;

		.directory-list {
			list-style-type: none;
			font-weight: 500;
			text-transform: capitalize;
			padding-bottom: 1rem;
		}
	}

	#content {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex: 1;
		width: 100%;
		overflow-y: scroll;
	}
</style>
