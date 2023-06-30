<script lang="ts">
	import { onMount } from 'svelte';
	import Contributors from '$lib/components/blocks/Contributors.svelte';
	import VerticalDotsIcon from '$lib/components/general/icons/VerticalDotsIcon.svelte';
	import Icon from '$lib/components/general/Icon.svelte';
	export let data;
	let draft = data.raw;
	let isEditing = false;
	let showDraft = isEditing;
	let headings = [];

	onMount(() => {
		const anchors = document.querySelectorAll('a[href^="#"]');
		headings = Array.from(anchors).map((a) => {
			const href = a.getAttribute('href');
			const textAfterHash = href.substring(1);
			return textAfterHash;
		});
		anchors.forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();
				document.querySelector(anchor.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	});
</script>

<div class="page">
	{#if data.content}
		<div class="content">
			<div class="top">
				<select>
					{#each headings as heading}
						<option>{heading}</option>
					{/each}
				</select>

				<div class="action">
					<button
						on:click={() => {
							showDraft = !showDraft;
						}}
					>
						<Icon><VerticalDotsIcon /></Icon>
					</button>
				</div>
			</div>

			<div class="markdown">
				{#if showDraft}
					<div id="edit">
						<textarea bind:value={draft} />
					</div>
				{:else}
					<div id="write">
						<svelte:component this={data.content} />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.topbar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}
	.selected {
		background-color: var(--color-bg-btn-primary);
		color: var(--color-tex-btn-primary);
	}

	.content {
		scroll-behavior: smooth;
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		padding: 0rem;
		gap: 0.3rem;
		overflow: hidden;
		border: 1px solid var(--color-border-0);
		background-color: inherit;
		border-radius: var(--border-radius-medium);
		flex: 1;
		.top {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			padding: 0.5rem;
			background-color: var(--color-bg-3);
		}
	}
	.action {
		// padding: 0.5rem;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		column-gap: 0.5rem;
		align-items: end;
		height: 100%;
		top: 0;
		button {
			padding: 0.5rem;
			border-radius: var(--border-radius-medium);
		}
	}
	.page {
		overflow-y: scroll;
		padding: 0.5rem;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		flex-direction: column;
		min-height: 100%;

		.side {
			max-width: 500px;
			width: fit-content;
			display: flex;
			height: 100%;
			position: sticky;
			flex: 1;
		}
		.side,
		.markdown {
			display: flex;
			flex-direction: column;
			position: relative;
			align-items: center;
		}

		.markdown {
			width: 100%;
			max-width: 850px;
			height: 100%;
			overflow-y: scroll;
			flex: 3;
			padding: 4px;

			#edit {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				flex: 1;
				textarea {
					border: 1px solid var(--color-border-0);
					width: 100%;
					height: 100%;
					flex: 1;
					padding: 1rem;
					resize: none;
					border: 1px solid var(--color-border-0);
					font-family: inherit;
					background-color: inherit;
					border-radius: var(--border-radius-medium);
				}
			}

			#write {
				width: 100%;
				height: 100%;
				flex: 1;
				flex-direction: column;
			}
		}
	}
</style>
