<script lang="ts">
	export let date;
	const validityRange = 1000 * 60 * 60 * 24 * 7 * 4 * 3; // 12 weeks
	const now = Date.now();

	const isValid = () => {
		const postdate = new Date(date);
		return date && now - postdate.getTime() < validityRange;
	};

	const formatDate = (date) => {
		if (!date) return 'Page is outdated  ';
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return `Page could be outdated. Last updated  ${new Date(date).toLocaleDateString(
			'en-US',
			options
		)}`;
	};
</script>

{#if !isValid()}
	<div class="document-status-wrapper">
		<div class="document-status">
			<p>{formatDate(date)}</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.document-status {
		display: flex;
		justify-content: center;
		padding: 0.9rem 0.5rem;
		font-size: 1rem;
		color: var(--color-text-muted);
		background-color: var(--color-bg-0);
		border: 1px solid var(--color-danger);
		width: 100%;
		border-radius: 6px;
		box-shadow: 0 0 4px var(--color-danger);
		color: var(--color-text-2);
		font-style: italic;

		&:before {
			content: '⚠️';
			border: 1px dashed var(--color-danger);
			border-radius: 100%;
			background-color: var(--color-bg-1);
			display: flex;
			color: var(--color-text-2);
			justify-content: center;
			align-items: center;
			font-size: 1rem;
			width: 20px;
			height: 20px;
			position: absolute;
			top: 0;
			left: 10px;
			transform: translate(-50%, -50%);
		}
	}

	.document-status-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 0 0.6rem;
		position: sticky;
		top: 0;
		z-index: 10;
	}
</style>
