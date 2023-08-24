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
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

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
		//border-left: 1px solid var(--color-border-2);
	}
</style>
