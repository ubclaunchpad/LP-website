<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Icon from '../general/Icon.svelte';
	import ChevronDownIcon from '../general/icons/ChevronDownIcon.svelte';
	import ChevronRightIcon from '../general/icons/ChevronRightIcon.svelte';
	import FileIcon from '../general/icons/FileIcon.svelte';
	import FolderIcon from '../general/icons/FolderIcon.svelte';
	import DirectoryIcon from '../general/icons/DirectoryIcon.svelte';
	export let directory;
	let isExpanded = true;
	const toggleList = () => {
		isExpanded = !isExpanded;
	};
</script>

<li class="dir">
	<div class="header">
		<button on:click={toggleList}>
			<Icon>
				{#if isExpanded}
					<ChevronDownIcon />
				{:else}
					<ChevronRightIcon />
				{/if}
			</Icon>
		</button>
		<a href={`/docs/${directory.name}/index`}>
			{directory.name}
		</a>
	</div>

	{#if isExpanded}
		<ul
			class="file-list"
			in:slide|global={{ axis: 'y', duration: 500 }}
			out:slide|global={{ axis: 'y', duration: 500 }}
		>
			{#if directory.files.length > 0}
				{#each directory.files as file}
					<li>
						<a href={`/docs/${directory.name}/${file}`}>
							<Icon>
								<FileIcon />
							</Icon>

							<p>{file}</p>
						</a>
					</li>
				{/each}
			{/if}

			{#if directory.directories.length > 0}
				{#each directory.directories as subDirectory}
					<li>
						<a href={`/docs/${subDirectory.name}`}>
							<Icon>
								<DirectoryIcon />
							</Icon>

							<p>{subDirectory.name}</p>
						</a>
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</li>

<style lang="scss">
	li {
		padding: 1rem;
	}

	.dir {
		padding: 0.5rem 0;
		font-size: 0.9rem;
		color: var(--color-bg-primary);
		font-weight: 600;
	}

	.header {
		display: flex;
		width: 100%;
		column-gap: 0.8rem;
		padding: 0.5rem 0.2rem;
		border-radius: var(--border-radius-medium);
		background-color: inherit;
		color: var(--color-text-1);
		font-weight: 600;

		&:hover {
			background-color: inherit;
		}
		:global(svg) {
			stroke-width: 2px;
		}
	}

	.subdirectory-list {
		padding-left: 1rem;
		list-style-type: none;
		padding-bottom: 0.3rem;
	}

	.file-list {
		padding-left: 1rem;
		list-style-type: none;
		font-size: 0.8rem;
		li {
			padding: 0.4rem 1rem;

			a {
				display: flex;
				column-gap: 1rem;
				align-items: center;
				text-decoration: none;
				color: var(--color-text-1);

				&:hover {
					text-decoration: underline;
				}

				:global(svg) {
					width: 24px;
				}

				p {
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
