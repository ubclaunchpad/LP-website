<script lang="ts">
	import FullPage from '$lib/components/layouts/FullPage.svelte';
	import DirectoryNavigation from "$lib/components/layouts/DirectoryNavigation.svelte";
	export let data;
	const directories = data.posts.directories || {};
</script>

<FullPage>
	<article slot="main">
		<div class="contents">
			<div class="directory-wrapper">
				<section class="main-directory">
					{#each Object.keys(directories) as dir}
						<div>
							<a href={`/${dir}`}>{dir}</a>
						</div>
					{/each}
				</section>
			</div>

			<section class="body">
				<div class="markdown">
					<div id="write">
						<svelte:component this={data.content} />
					</div>
				</div>
			</section>
		</div>
	</article>
</FullPage>



<slot />

<style lang="scss">
	article {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		flex: 1;
		border-radius: 4px;
		column-gap: 1rem;
		background-color: var(--color-black-2);
	}

	img {
		width: 300px;
		max-width: 100% !important;
	}

	.directory-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid var(--color-black-3);
		background-color: var(--color-black-2);
		max-width: 1200px;
		width: 100%;
	}

	.contents {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-radius: var(--border-radius-large);
		background-color: var(--color-black-2);
		cursor: pointer;
		max-width: 1200px;
	}
	.main-directory {
		display: grid;
		grid-template-columns: repeat(6, minmax(150px, 150px));
		justify-content: center;
		width: 100%;
		gap: 10px;

		> div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0.4rem;
			flex-wrap: wrap;
			border-radius: var(--border-radius-small);
			border: 1px solid var(--color-black-3);
			background-color: var(--color-black-1);
			height: 50px;
			width: 150px;
			font-size: 1.1rem;
			text-transform: capitalize;
		}
	}
</style>
