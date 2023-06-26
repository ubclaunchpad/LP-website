<script lang="ts">
	import { onMount } from 'svelte';
	let headings = [];

	onMount(() => {
		// Get all the headings with IDs in the document
		headings = Array.from(
			document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
		).map((heading) => ({
			level: parseInt(heading.tagName.charAt(1)),
			text: heading.textContent,
			id: heading.id
		}));
	});

	function scrollToHeading(heading) {
		const element = document.getElementById(heading.id);
		element.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div class="blog">
	<slot />
	<div class="right-bar">
		<!-- <ul class="index">
			{#if headings.length > 0}
				{#each headings as heading}
					<li class={`h${heading.level}`}>
						<button on:click={() => scrollToHeading(heading)}> {heading.text}</button>
					</li>
				{/each}
			{/if}
		</ul> -->
	</div>
</div>

<style lang="scss">
	.blog {
		display: flex;
		flex-direction: row;
		.right-bar {
			display: flex;
			flex-direction: column;
			height: fit-content;
			position: sticky;
			top: 0;
			padding: 1rem;
			height: 100svh;
			width: 400px;
			border-left: 1px solid var(--color-border-1);
			background-color: var(--color-bg-1);
		}
	}
	.index {
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		display: flex;
		row-gap: 1rem;

		h3 {
			font-size: 0.8rem;
			font-weight: 500;
			color: var(--color-text-2);
			padding-bottom: 0.5rem;
		}

		li {
			text-transform: capitalize;
			list-style: none;
			width: 100%;
			padding-left: 1rem;
			padding-bottom: 1px;
			color: var(--color-text-2);
			border-left: 1px solid transparent;

			&.h1 {
				padding-left: 0.5rem;
				font-size: 1.1rem;
				color: var(--color-text-2);
			}

			&.h2 {
				padding-left: 1rem;
				font-size: 0.8rem;
				color: var(--color-text-2);
			}

			&.h3 {
				padding-left: 2rem;
				font-size: 0.7rem;
				color: var(--color-text-2);
			}

			&.h4 {
				padding-left: 3rem;
				font-size: 0.65rem;
				color: var(--color-text-2);
			}

			&.h5 {
				padding-left: 4rem;
				font-size: 0.6rem;
				color: var(--color-text-2);
			}

			&.h6 {
				padding-left: 5rem;
				font-size: 0.55rem;
				color: var(--color-text-2);
			}

			&:hover {
				border-left: 1px solid var(--color-border-1);
			}

			button {
				border-bottom: 1px solid transparent;
				background: none;
				font-weight: 500;
				text-decoration: none;
				color: var(--color-text-1);
				width: 100%;
				transition: all 0.1s ease-in-out;
				display: flex;

				&:hover {
					color: var(--color-text-primary);
				}
			}
		}
	}
</style>
