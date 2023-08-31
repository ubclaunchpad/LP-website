<script lang="ts">
	let show = false;
	const toggle = () => {
		show = !show;
	};
</script>

<svelte:head>
	<script src="//embed.typeform.com/next/embed.js"></script>
</svelte:head>

<div class="container">
	<!--	<button-->
	<!--		on:click={toggle}-->
	<!--		data-tf-slider="bmnggDXB"-->
	<!--		data-tf-position="right"-->
	<!--		data-tf-opacity="100"-->
	<!--		data-tf-iframe-props="title=Returning Members"-->
	<!--		data-tf-transitive-search-params-->
	<!--		data-tf-medium="snippet">We are recruiting! Apply by September 4th</button-->
	<!--	>-->
	<div class="markdown">
		<div id="write">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
	}
	.markdown {
		width: 100%;
	}
</style>
