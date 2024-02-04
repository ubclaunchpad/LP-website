<script lang="ts">
	import Icon from '$lib/components/general/Icon.svelte';
	// import Loader from '$lib/components/blocks/Loader.svelte';
	import { blur } from 'svelte/transition';
	// import { PUBLIC_GITHUB_TEAM_URI } from '$env/static/public';
	// import EditIcon from '$lib/components/general/icons/EditIcon.svelte';
	import DocError from '$lib/components/blocks/DocError.svelte';
	import { unified } from 'unified';
	import remarkparse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import rehypeSanitize from 'rehype-sanitize';
	import rehypestringify from 'rehype-stringify';
	import remarkgfm from 'remark-gfm';
	import rehypewrap from 'rehype-wrap-all';
	export let area: string;
	export let slug = 'index';
	console.log(slug);
	console.log(area);
	const fileName = !slug || slug === 'index' ? 'README' : slug;
	let headings: { id: string; name: string; level: number }[] = [];
	let pageContent: string;
	let sourceRef: HTMLElement;

	$: if (sourceRef) {
		headings = getHeadings();
	}

	async function parseMd(draft) {
		const file = await unified()
			.use(remarkparse)
			.use(remarkgfm)
			.use(remarkRehype)
			.use(rehypeSanitize)
			.use(rehypewrap, [
				{
					wrapper: 'div.table-wrapper',
					selector: 'table'
				},
				{
					wrapper: 'div.code-wrapper',
					selector: 'pre'
				}
			])

			.use(rehypestringify)
			.process(draft);
		return file.value;
	}

	const getContent = async () => {
		const res = await fetch(`http://127.0.0.1:8080/docs/${area}/${slug}`, {
			method: 'GET'
		});
		if (res.status !== 200) {
			throw new Error('Could not get document');
		}
		const file = (await parseMd(await res.text())) as string;
		pageContent = file;
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
			<div>loading</div>
			<!--			<Loader width={'100%'} height={'100%'} />-->
		{:then}
			<div class="top">
				<div />
				<select on:change={(e) => scrollToElement(e.target.value)}>
					{#each headings as heading}
						<option class={`level-9`} value={heading.id}>{heading.name}</option>
					{/each}
				</select>

				<!--                <div class="action">-->
				<!--                    <a href={`${PUBLIC_GITHUB_TEAM_URI}/${area}/edit/main/${fileName}.md`}>-->
				<!--                        <Icon>-->
				<!--                            <EditIcon />-->
				<!--                        </Icon>-->
				<!--                        Edit-->
				<!--                    </a>-->
				<!--                </div>-->
			</div>

			<div class="markdown" bind:this={sourceRef} in:blur={{ duration: 400 }}>
				<div id="write">
					{@html pageContent}
				</div>
			</div>
		{:catch e}
			<DocError title={`${area}\t/\t${slug}`} {area} />
		{/await}
	</div>
</div>

<style lang="scss">
	.topbar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		position: sticky;
	}
	.selected {
		background-color: var(--color-bg-btn-primary);
		color: var(--color-tex-btn-primary);
	}

	.page {
		padding-left: 0;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		flex-direction: column;
		overflow-y: hidden;
		height: 100%;
		.content {
			scroll-behavior: smooth;
			display: flex;
			width: 100%;
			height: 100px;
			flex-direction: column;
			align-items: center;
			padding: 0;
			gap: 0.3rem;
			overflow-y: scroll;

			flex: 1;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				position: sticky;
				padding: 0.2rem;
				background-color: transparent;

				select {
					width: 20rem;
					font-size: 14px;
					border: 1px solid var(--color-border-0);
					option {
						font-size: 14px;
					}
				}
			}
		}
		.action {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			column-gap: 0.5rem;
			align-items: end;

			top: 0;
			a {
				padding: 0.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				column-gap: 10px;
				color: var(--color-text-2);
				text-decoration: none;
				font-size: 0.8rem;
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
			background-color: var(--color-bg-1);
			width: 100%;
			height: 100%;
			overflow: hidden;
			flex: 3;
			padding: 4px;
			#write {
				height: 100%;
				max-width: 850px;
				flex: 1;
				width: 100%;
				flex-direction: column;
				flex-wrap: wrap;
				overflow-y: scroll;
				overflow-x: hidden;
			}
		}
	}
</style>
