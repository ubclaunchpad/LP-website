<div class="wrapper">
	<div class="info">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		flex-wrap: wrap;
		padding: 0.3rem 0;
	}

	.info {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.7rem 0.9rem;
		row-gap: 10px;
		color: var(--color-text-1);
		background-color: var(--color-bg-2);
		border-radius: 6px;
		border: 1px solid var(--color-border-1);
	}
</style>
