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
	<button
		on:click={toggle}
		data-tf-slider="K0jsdGu4"
		data-tf-position="right"
		data-tf-opacity="100"
		data-tf-iframe-props="title=Launch Pad Recruitment"
		data-tf-transitive-search-params
		data-tf-medium="snippet"
		>We are recruiting! Apply by September 8, 2023
	</button>

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

	button {
		background-color: var(--color-bg-primary);
		border: none;
		border-radius: 4px;
		color: white;
		cursor: pointer;
		font-size: 15px;
		font-weight: 500;
		height: 40px;
		letter-spacing: 0.5px;
		line-height: 40px;
		padding: 0 20px;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
		-webkit-appearance: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-bottom: 1rem;
		transition: background-color 0.25s ease-in-out;

		&:hover {
			background-color: var(--color-bg-secondary);
		}
	}
</style>
