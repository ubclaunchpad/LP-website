<script lang="ts">
	// import './variables.scss';
	// import './styles.scss';
</script>

<div class="page">
	<section>
		<div>
			<h1>404</h1>
			<h3>
				<span>Oops! </span>
				<span>This page doesn't exist.</span>
			</h3>
		</div>
	</section>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		height: 100svh;
		width: 100%;
		font-weight: bold;
		background: var(--color-bg-2);
		section {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			position: relative;
			width: 100%;
			div {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				width: 100%;
				gap: 2rem;
				padding: 1rem 1rem;
				opacity: 0.7;
				font-size: 1rem;
				h3 {
					max-width: 500px;
					line-height: 1.9;
					color: var(--color-text-2);
				}
				h1 {
					background: -webkit-linear-gradient(
						45deg,
						var(--color-text-2),
						var(--color-text-primary)
					);
					-webkit-background-clip: text;
					background-clip: text;
					-webkit-text-fill-color: transparent;
					font-size: 8rem;
					opacity: 0.6;
					margin: 0;
					padding: 0;
					line-height: 1;
					top: 0;
				}
			}
		}
	}
</style>
