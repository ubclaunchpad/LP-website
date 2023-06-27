<script lang="ts">
	// import { onMount } from 'svelte';
	// let headings = [];

	// onMount(() => {
	// 	// Get all the headings with IDs in the document
	// 	headings = Array.from(
	// 		document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
	// 	).map((heading) => ({
	// 		level: parseInt(heading.tagName.charAt(1)),
	// 		text: heading.textContent,
	// 		id: heading.id
	// 	}));
	// });

	// function scrollToHeading(heading) {
	// 	const element = document.getElementById(heading.id);
	// 	element.scrollIntoView({ behavior: 'smooth' });
	// }
</script>

<article>
	
	<section class="blog">
		<slot />
	</section>
</article>

<style lang="scss">
	article {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		border-radius: 4px;
		column-gap: 1rem;
		overflow: hidden;
		position: relative;

		.blog {
			overflow-y: scroll;
			width: 100%;
			height: 100%;
			:global(p) {
				max-width: 800px;
			}
		}

		.action {
			padding: 0.5rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			position: sticky;
			top: 0;

			button {
				padding: 0.5rem;
				border: 1px solid var(--color-border-0);
				border-radius: var(--border-radius-medium);
			}
		}
	}
</style>
