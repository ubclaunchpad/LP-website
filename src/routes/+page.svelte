<script>
	export let data;
</script>

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

<style lang="scss">
	article {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		flex: 1;
		padding: 0.3rem;
		border-radius: 4px;
		column-gap: 1rem;
		justify-content: center;
		overflow-y: scroll;
	}
</style>
