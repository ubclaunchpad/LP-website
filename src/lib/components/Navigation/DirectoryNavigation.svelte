<script lang="ts">
	export let directories;
</script>

<div class="sidebar-content">
	<div class="directory">
		<span />
		<ul class="directory-list">
			{#each Object.entries(directories.posts) as [directory, files]}
				<li>
					<a href={`/${files.slug}`}>
						{files.slug}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	{#each Object.entries(directories.directories) as [directory, files]}
		<div class="directory">
			<span>{directory}</span>
			<ul class="directory-list">
				{#each files as m}
					<li>
						<a href={`/${directory}/${m.slug}`}>
							{m.slug}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style lang="scss">
	.sidebar-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		row-gap: 1rem;
		color: var(--color-text-1);
		padding: 0 0.5rem;
		flex: 1;
		height: 100%;

		.directory {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			row-gap: 0.2rem;
			list-style-type: none;
			font-weight: 500;
			text-transform: capitalize;
			padding: 0.8rem 0.4rem;
			font-size: 1rem;
			color: var(--color-text-3);

			.directory-list {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				row-gap: 0.5rem;
				list-style-type: none;
				text-transform: capitalize;
				padding: 0.6rem 1rem;
				font-size: 0.9rem;

				a {
					color: var(--color-text-3);
					text-decoration: none;
					transition: color 0.2s ease-in-out;
					&:hover {
						color: var(--color-text-2);
					}
				}
			}
		}
	}
</style>
