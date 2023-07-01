<script>
	let isOpen = true;
</script>

<div class="hero">
	<div class="main-page">
		<slot name="main" class="content" />
	</div>

	{#if $$slots.side}
		<div id="side-content">
			<button
				id="collapser"
				on:click={() => {
					isOpen = !isOpen;
				}}
			/>

			{#if isOpen}
				<div id="side-div">
					<slot name="side" />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.hero {
		height: 100%;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		flex: 1;
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.main-page {
		position: relative;
		background-color: var(--color-bg-0);
		border-radius: 4px 0 0 4px;
		flex-direction: column;
		height: 100%;
		overflow: scroll;
		flex: 1;
		height: 100%;
	}

	#side-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		position: relative;
		padding: 0;
		height: 100%;
		border-radius: 0 4px 4px 0;
		overflow: hidden;
		transition: all 0.4s ease-in-out;
		#collapser {
			position: relative;
			z-index: 3;
			top: 0;
			left: 0;
			overflow: hidden;
			height: 100%;
			background-color: var(--color-bg-0);
			border-left: 3px double var(--color-border-1);
			opacity: 0.8;
		}
		#side-div {
			position: relative;
			flex: 1;
			height: 100%;
			width: 450px;
			overflow-x: hidden;
		}
	}
</style>
