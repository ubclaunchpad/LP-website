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
	</article>
</div>

<style lang="scss">
	.page {
		overflow-y: scroll;
	}
	article {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex: 1;
		padding: 0.3rem;
		border-radius: 4px;
		column-gap: 1rem;
	}
</style>
