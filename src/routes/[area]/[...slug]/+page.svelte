<script>
	import Footer from "$lib/components/layouts/Footer.svelte";

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
	<Footer>
		<div class="action">
			<div />
	
			<button> Edit this page on Github </button>
		</div>
	</Footer>
	
</div>

<style lang="scss">

.action {
			padding: 0.5rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: end;
			top: 0;

			button {
				padding: 0.5rem;
				
				border-radius: var(--border-radius-medium);
			}
		}
	.page {
		overflow-y: scroll;
		padding: 0rem;
		display: flex;
		justify-content:flex-end;
		width: 100%;
		flex-direction: column;
		min-height: 100%;
		

		.markdown {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			flex: 1;
			border-bottom: 1px solid var(--color-border-0);

			#write {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				:global(*) {
					max-width: 850px;
				}
				:global(table) {
					max-width: 1050px;

					:global(*) {
						max-width: 1050px;
					}
				}
				:global(.table-wrapper) {
					max-width: 1050px;
				}
			}

			overflow-y: scroll;
			overflow-x: hidden;
		}
	}
</style>
