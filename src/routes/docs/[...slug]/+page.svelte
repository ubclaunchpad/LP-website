<script lang="ts">
	import { onMount } from 'svelte';
	import TOC from '$lib/components/general/TOC.svelte';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import DocumentStatus from '$lib/components/blocks/DocumentStatus.svelte';
	export let data;
	$: metadata = data.metadata || {};
	let headings = [];
	const cutoff = 1000;
	let pageWidth = 0;
	let show = false;

	if (browser) {
		pageWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			pageWidth = window.innerWidth;
		});
	}
	onMount(() => {
		if (browser) headings = extractHeadings();
	});

	function extractHeadings() {
		const headings = [];
		if (!document.getElementById('write')) return headings;

		const headingElements = document
			.getElementById('write')
			.querySelectorAll('h1, h2, h3, h4, h5, h6');

		let currentHeadingLevel = 1;
		let currentParent = { subheadings: headings };

		for (const headingElement of headingElements) {
			const headingLevel = parseInt(headingElement.tagName.charAt(1));

			const headingObject = {
				name: headingElement.textContent,
				id: headingElement.getAttribute('id'),
				subheadings: []
			};

			if (headingLevel > currentHeadingLevel) {
				currentParent = currentParent.subheadings[currentParent.subheadings.length - 1];
			} else if (headingLevel < currentHeadingLevel) {
				for (let i = currentHeadingLevel; i > headingLevel; i--) {
					currentParent = currentParent.parent;
				}
			}

			currentParent.subheadings.push(headingObject);
			headingObject.parent = currentParent;
			currentHeadingLevel = headingLevel;
		}

		return headings;
	}

	$: if (browser && data) {
		headings = extractHeadings();
	}
</script>

<div class="page">
	<article>
		{#key data.url}
			{#if pageWidth < cutoff}
				<div class="side-wrapper">
					<section class="side floater">
						<button on:click={() => (show = !show)}>
							<p>Outline</p>
							{#if show}
								<div transition:slide|global={{ axis: 'y', duration: 300 }} class="toc floater">
									<TOC {headings} />
								</div>
							{/if}
						</button>
					</section>
				</div>
			{/if}
		{/key}
		<section class="body">
			<DocumentStatus date={metadata.updated} />
			{#if data.content}
				<svelte:component this={data.content} />
			{/if}
		</section>
		{#key data.url}
			{#if pageWidth > cutoff}
				<section class="side">
					<div class="toc">
						<TOC {headings} />
					</div>
				</section>
			{/if}
		{/key}
	</article>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex: 1;
		background-color: var(--color-black-2);
	}
	article {
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		overflow: hidden;
		height: 100%;
		flex: 1;
		column-gap: 1rem;
		padding: 20px 30px 10px;

		@media (max-width: 1000px) {
			flex-direction: column;
			padding: 0;
		}
	}

	.body {
		overflow: scroll;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 850px;
		overflow-x: hidden;
		padding: 20px 30px 10px;
	}

	.side-wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		flex: 1;
		padding: 0.5rem;
		column-gap: 1rem;
		position: relative;
	}

	.side {
		width: 100%;
		min-width: 200px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		flex: 1;
		padding: 0;
		column-gap: 1rem;
		position: relative;
		border-radius: var(--border-radius-medium);

		&.floater {
			background-color: var(--color-black-3);
			max-width: 200px;
		}

		button {
			border: 1px solid var(--color-black-3);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
			padding: 0.5rem;
			background-color: var(--color-black-3);
			color: var(--color-text-3);
			border-radius: var(--border-radius-medium);
			position: absolute;
			z-index: 4;

			p {
				width: fit-content;
			}
		}

		.toc {
			border-left: 1px solid var(--color-black-3);
			top: 0;
		}

		.floater {
			z-index: 4;

			width: 100%;
			background-color: var(--color-black-3);
			border-radius: var(--border-radius-medium);
		}
	}
</style>
