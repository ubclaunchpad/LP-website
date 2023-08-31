<script lang="ts">
	interface heading {
		name: string;
		id: number;
		subheadings: heading[];
	}
	export let headings: heading[];
</script>

<ul>
	{#each headings as heading}
		<li>
			<a href={`#${heading.id}`}>
				{heading.name}
			</a>
		</li>
		{#if heading.subheadings}
			<svelte:self headings={heading.subheadings} />
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		margin: 0rem 0.5rem 0rem;
	}

	li {
		margin: 0.5rem;
		font-size: 0.8rem;

		a {
			text-decoration: none;
			color: var(--color-text-3);
		}
	}
</style>
