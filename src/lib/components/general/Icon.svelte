<script lang="ts">
	export let width = '1rem';
</script>

<div class="icon" style={`width: ${width}`}>
	<div class="icon-wrapper">
		<slot />
	</div>
</div>

<style lang="scss">
	.icon {
		display: inline-block;
		background-color: transparent;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}

	.icon-wrapper > * {
		display: block;
	}

	.icon-wrapper > *:not(:last-child) {
		margin-right: 0.5rem;
	}
</style>
