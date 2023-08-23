<script lang="ts">
	export let directories;
</script>

<div class="sidebar-content">
	<!--	<div class="directory">-->
	<!--				<span />-->
	<!--				<ul class="directory-list">-->
	<!--					{#each Object.entries(directories.posts) as [directory, files]}-->
	<!--						<li>-->
	<!--							<a href={`/${files.slug}`}>-->
	<!--								{files.slug}-->
	<!--							</a>-->
	<!--						</li>-->
	<!--					{/each}-->
	<!--				</ul>-->
	<!--	</div>-->
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
		align-items: center;
		overflow-y: scroll;
		row-gap: 0.4rem;
		color: var(--color-text-1);
		padding: 1rem 3rem;
		flex: 1;
		height: 100%;

		.directory {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			width: 400px;
			max-width: 100%;
			row-gap: 0.2rem;
			list-style-type: none;
			font-weight: 500;
			text-transform: uppercase;
			padding: 0.5rem 0.4rem 0.2rem;
			font-size: 1rem;
			color: var(--color-text-3);
			border-top: 1px solid var(--color-border-2);

			&:first-child {
				border-top: none;
			}

			.directory-list {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				row-gap: 0.6rem;
				list-style-type: none;
				text-transform: capitalize;
				padding: 0.6rem 0;
				font-size: 0.9rem;

				a {
					color: var(--color-text-3);
					font-weight: 400;
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
