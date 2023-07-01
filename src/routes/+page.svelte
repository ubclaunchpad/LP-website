<script>
	import DocError from '$lib/components/blocks/DocError.svelte';
	export let data;
</script>

{#if data.pageContent}
	<article>
		<section class="body">
			<div class="markdown">
				<div id="write">
					{@html data.pageContent}
				</div>
			</div>
		</section>
	</article>
{:else}
	<div class="wrapper">
		<DocError title="UBC Launch Pad Docs is unreachable right now" area="" />
	</div>
{/if}

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		height: 100%;
		width: 100%;
	}
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
