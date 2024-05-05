<script lang="ts">
	import FullPage from '$lib/components/layouts/FullPage.svelte';
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
							<a href={`/docs/${dir}`}>{dir}</a>
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
		justify-content: center;
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
		object-fit: contain;
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
		align-items: center;
		padding: 1rem;
		border-radius: var(--border-radius-large);
		background-color: var(--color-black-2);
		overflow: scroll;
		cursor: pointer;
		max-width: 1600px;
		width: 100%;
		gap: 1rem;
	}
	.main-directory {
		display: grid;
		grid-template-columns: repeat(6, minmax(150px, 250px));
		justify-content: center;
		width: 100%;
		gap: 10px;

		@media (max-width: 1000px) {
			grid-template-columns: repeat(3, 1fr);

			@media (max-width: 500px) {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		> div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0.4rem;
			flex-wrap: wrap;
			border-radius: var(--border-radius-medium);
			border: 1px solid var(--color-black-3);
			background: linear-gradient(145deg, var(--color-black-3), var(--color-black-2));
			color: var(--color-text-2);
			transition: all 0.4s ease-in-out;

			&:hover {
				background: linear-gradient(145deg, var(--color-black-3) 90%, var(--color-black-2));
			}

			height: 200px;
			min-height: fit-content;

			@media (max-width: 500px) {
				height: 40px;
			}
			width: 100%;
			font-size: 1.1rem;
			position: relative;
			overflow: hidden;

			> div {
				position: absolute;
				width: 100%;
				opacity: 0.1;
				display: flex;
				justify-content: center;
				align-items: center;

				> :global(*) {
					width: 40%;
					height: 100%;
					//fill: var(--color-text-3);
					stroke: var(--color-text-3);
					stroke-width: 1px;
					object-fit: contain;
				}
			}

			a {
				color: var(--color-white-1);
				text-decoration: none;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.5rem;
				//text-transform: capitalize;
				transition: all 0.2s ease-in-out;
				&:hover {
					color: var(--color-white-2);
				}
				z-index: 5;
			}
		}
	}
</style>
