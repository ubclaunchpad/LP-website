<script lang="ts">
	export let data;
</script>

<article>
	<section class="body">
		<div class="markdown">
			<div id="write">
				<svelte:component this={data.content} />
			</div>
		</div>
	</section>
</article>

<style lang="scss">
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
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
