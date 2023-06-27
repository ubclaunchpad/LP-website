<script>
	export let data;
</script>

<div class="page">
	{#if data.content}
		<div class="markdown">
			<div id="write">
				<svelte:component this={data.content} />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		overflow-y: scroll;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
</style>
