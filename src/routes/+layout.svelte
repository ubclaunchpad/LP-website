<script lang="ts">
	import LeftPanel from '$lib/components/layouts/LeftPanel.svelte';
	import Fullpage from '$lib/components/layouts/Fullpage.svelte';
	import './styles.scss';
	import './markdown.scss';
	export let data;
</script>

<Fullpage>
	<LeftPanel slot="nav">
		<div class="sidebar-content">
			<ul class="directory-list">
				{#each data.directories as directory}
					<li>
						{directory.name}
						{#if directory.files.length > 0}
							<ul class="file-list">
								{#each directory.files as file}
									<li><a href={`/docs/${directory.name}/${file}`}>{file}</a></li>
								{/each}
							</ul>
						{/if}
						{#if directory.directories.length > 0}
							<ul class="subdirectory-list">
								{#each directory.directories as subDirectory}
									<li>
										{subDirectory.name}
										{#if subDirectory.files.length > 0}
											<ul class="file-list">
												{#each subDirectory.files as file}
													<li><a href={subDirectory.name}>{file}</a></li>
												{/each}
											</ul>
										{/if}
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</LeftPanel>

	<div id="content">
		<slot />
	</div>
</Fullpage>

<style lang="scss">
	.sidebar-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		row-gap: 2rem;
		color: var(--color-text-1);
		padding: 0rem 1rem;

		> a {
			text-decoration: none;
		}

		h1 {
			background: linear-gradient(to right, var(--color-text-primary), var(--color-text-secondary));
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 1.4rem;
			font-weight: 800;
			padding: 0;
		}

		input {
			background: var(--color-border-1);
			border: 1px solid var(--color-border-1);
			border-radius: 0.5rem;
			padding: 0.6rem;
			color: var(--color-text-1);
			font-size: 1rem;
			&:focus {
				outline: none;
				border: 1px solid var(--color-text-primary);
			}
		}

		.directory-list {
			list-style-type: none;
			font-weight: 500;
			text-transform: capitalize;
			padding-bottom: 1rem;
			> li {
				padding-bottom: 1rem;
				border-bottom: 1px solid var(--color-border-1);
				font-weight: 600;
				color: var(--color-text-2);
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
			margin: 4px;

			a {
				text-decoration: none;
				color: var(--color-text-1);
				padding: 1rem 0;
				&:hover {
					text-decoration: underline;
				}
			}
		}

		li {
			padding: 0.4rem 0;
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
