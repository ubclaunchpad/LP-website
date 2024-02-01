<script lang="ts">
</script>

<section class="stats">
	<section>
		<p>8</p>
		<p>years active</p>
	</section>

	<section>
		<p>4100+</p>
		<p>Pull requests</p>
	</section>

	<section>
		<p>4100+</p>
		<p>Projects</p>
	</section>

	<section>
		<p>400+</p>
		<p>Total Members</p>
	</section>
</section>

<style lang="scss">
	.stats {
		z-index: 4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: var(--color-black-2);
		border-top: 1px solid var(--color-border-1);
		border-bottom: 1px solid var(--color-border-1);
		padding: 2rem 0.5rem;

		> section {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			flex: 1;
			align-items: center;
			border-right: 1px solid var(--color-border-2);

			&:last-child {
				border-right-color: transparent;
			}

			> p {
				font-size: 2rem;
				font-weight: 700;
				color: var(--color-text-0);

				&:last-child {
					font-size: 1rem;
					font-weight: 400;
					color: var(--color-text-1);
					text-transform: uppercase;
				}
			}
		}

		@media (max-width: 768px) {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0rem 0.5rem;

			> section {
				border-right: none;
				border-bottom: 1px solid var(--color-border-1);
				padding: 1rem 0;
				width: 100%;
				text-align: center;

				&:last-child {
					border-bottom-color: transparent;
				}
			}
		}

		margin: 0 0 2rem;
	}
</style>
