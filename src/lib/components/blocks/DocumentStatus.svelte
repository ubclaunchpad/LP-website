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
		background-color: var(--color-black-1);
		border: 1px solid var(--color-bg-0);
		width: 100%;
		border-radius: 6px;
		color: var(--color-text-2);
	}

	.document-status-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 0 0.6rem;
		top: 0;
		z-index: 10;
	}
</style>
