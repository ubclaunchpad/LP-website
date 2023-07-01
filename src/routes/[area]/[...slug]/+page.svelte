<script lang="ts">
	import Icon from '$lib/components/general/Icon.svelte';
	import Loader from '$lib/components/blocks/Loader.svelte';
	import { blur } from 'svelte/transition';
	import { PUBLIC_GITHUB_TEAM_URI } from '$env/static/public';
	import EditIcon from '$lib/components/general/icons/EditIcon.svelte';
	export let data;
	const { area, slug } = data;
	let headings: { id: string; name: string; level: number }[] = [];
	let pageContent: string;
	let sourceRef: HTMLElement;

	$: if (sourceRef) {
		headings = getHeadings();
	}

	const getContent = async () => {
		setInterval(() => {}, 3000);
		const res = await fetch(`/api/page?area=${area}&path=${slug}`, {
			method: 'GET'
		});
		pageContent = await res.text();
	};

	const getHeadings = (): { id: string; name: string; level: number }[] => {
		const headings = sourceRef.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const listOfHeadings = Array.from(headings).map((heading) => {
			const level = parseInt(heading.tagName.slice(1));
			const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');
			const name = heading.textContent || '';
			heading.id = id;
			return { level, id, name };
		});

		const anchors = sourceRef.querySelectorAll('a[href^="#"]');
		anchors.forEach((anchor) => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();
				const id = anchor.getAttribute('href')?.replace('#', '').toLowerCase();
				id && scrollToElement(id);
			});
		});
		return listOfHeadings;
	};

	const scrollToElement = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
</script>

<div class="page">
	<div class="content">
		{#await getContent()}
			<Loader width={'100%'} height={'100%'} />
		{:then}
			<div class="top">
				<select on:change={(e) => scrollToElement(e.target.value)}>
					{#each headings as heading}
						<option class={`level-9`} value={heading.id}>{heading.name}</option>
					{/each}
				</select>

				<div class="action">
					<a href={`${PUBLIC_GITHUB_TEAM_URI}/${area}/edit/main/${slug}.md`}>
						<Icon>
							<EditIcon />
						</Icon>
						Edit on Github
					</a>
				</div>
			</div>

			<div class="markdown" bind:this={sourceRef} in:blur={{ duration: 400 }}>
				<div id="write">
					{@html pageContent}
				</div>
			</div>
		{/await}
	</div>
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

	.page {
		overflow-y: scroll;
		padding: 0.5rem;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		flex-direction: column;
		min-height: 100%;

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
				align-items: center;
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
			align-items: center;
			column-gap: 0.5rem;
			align-items: end;
			height: 100%;
			top: 0;
			a {
				padding: 0.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				column-gap: 10px;
				color: var(--color-text-2);
				text-decoration: none;
				font-size: 0.9rem;
			}
		}

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
			#write {
				width: 100%;
				height: 100%;
				flex: 1;
				flex-direction: column;
			}
		}
	}
</style>
