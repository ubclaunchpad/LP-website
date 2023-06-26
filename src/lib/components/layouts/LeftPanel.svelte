<section class="sidebar">
	<div>
		<slot />
	</div>
</section>

<style lang="scss">
	.sidebar {
		position: sticky;
		top: 0;
		overflow-y: hidden;
		overflow-x: hidden;
		height: 100svh;
		min-width: 15rem;
		width: max-content;
		max-width: 100%;
		> div {
			overflow: scroll;
			height: 100%;
		}
	}
</style>
