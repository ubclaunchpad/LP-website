<script>
	export let data;
</script>

<div class="page">
	<article>
		<section class="body">
			{#if data.content}
				<div class="markdown">
					<div id="write">
						<svelte:component this={data.content} />
					</div>
				</div>
			{/if}
		</section>
		<section class="side" />
	</article>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex: 1;
		nav {
			width: 100%;
			justify-content: space-between;
			align-items: flex-start;
			display: flex;
			flex-direction: row;
			padding: 0.6rem;
			input {
				max-width: 100%;
				padding: 0.6rem;
				border-radius: var(--border-radius-large);
				border: 1px solid transparent;
				background-color: var(--color-bg-1);
				color: var(--color-text-2);
				font-size: 1rem;
				font-weight: 500;
				&:focus {
					outline: none;
					border: 1px solid var(--color-text-primary);
				}
			}
		}
	}
	article {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex: 1;
		padding: 0.3rem;
		border-radius: 4px;
		column-gap: 1rem;
	}

	.markdown {
		max-width: 1000px;
	}

	.body {
		overflow: scroll;
	}

	.side {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		padding: 0.3rem;
		column-gap: 1rem;
		border-left: 1px solid var(--color-border-2);
	}
</style>
