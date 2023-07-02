<script lang="ts">
	import type { IDirectory } from '../../../routes/api/areas/+server';
	import ResourceNav from './ResourceNav.svelte';
	export let directories: IDirectory[];
</script>

<div class="sidebar-content">
	<!-- <div class="progress">This section is in progress</div> -->
	<!-- <ul class="directory-list">
	
		
		{#each directories as directory}
			<ResourceNav {directory} />
		{/each}
	</ul> -->
</div>

<style lang="scss">
	.progress {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--color-text-2);
		opacity: 0.7;
		width: 100%;
		height: 100%;
		font-size: 0.7rem;
		flex: 1;
	}
	.sidebar-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		row-gap: 1rem;
		color: var(--color-text-1);
		padding: 0rem 0.5rem;
		flex: 1;
		height: 100%;

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
