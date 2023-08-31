<script lang="ts">
	import { slide, blur } from 'svelte/transition';
	import MenuIcon from '../general/icons/MenuIcon.svelte';
	import { onMount } from 'svelte';
	import Icon from '../general/Icon.svelte';
	import { DOCS_GITHUB_LINK, GITHUB_LINK, WEBSITE_LINK } from '$lib/util/links';
	import logo from '$lib/assets/logo.png';
	let pageWidth: number;
	const SLOTS = $$props.$$slots;
	let collapse = true;
	const cutoff = 1200;
	$: transitionDuration = isCompact ? 300 : 0;
	let showLinks = false;
	$: isCompact = pageWidth < cutoff;

	onMount(() => {
		pageWidth = document.body.clientWidth;
		window.addEventListener('resize', () => {
			pageWidth = document.body.clientWidth;
		});
	});

	const collapseNav = () => {
		if (!collapse) collapse = true;
	};
</script>

<div
	id="page"
	on:keyup={(e) => {
		if (e.key === 'Escape') {
			collapseNav();
		}
	}}
>
	<nav>
		<div class="topnav">
			<div class="item">
				<button on:click={() => (collapse = !collapse)}>
					<Icon>
						{#if isCompact}
							<MenuIcon width={'1rem'} />
						{/if}
					</Icon>
				</button>
				<a href="/">
					<img src={logo} alt="Launch Pad Logo" />

					<h2>Launch Pad <span>Documentation</span></h2>
				</a>
			</div>
			<div class="links">
				<button on:click={() => (showLinks = !showLinks)}>Links</button>
				{#if showLinks}
					<div>
						<ul>
							<li>
								<a href={DOCS_GITHUB_LINK}>Team repository</a>
							</li>
							<li>
								<a href={GITHUB_LINK}>Docs</a>
							</li>
							<li>
								<a href={WEBSITE_LINK}>Website</a>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</nav>
	<section>
		{#if !isCompact && SLOTS && SLOTS.nav}
			<aside>
				<div class="sidebar" class:compact={isCompact}>
					<div
						class="content"
						transition:slide|global={{ axis: 'x', duration: transitionDuration }}
					>
						<slot name="nav" />
					</div>
				</div>
			</aside>
		{/if}

		<main>
			{#if !collapse && isCompact}
				<div class="compactBar">
					<slot name="nav" />
					<div />
				</div>
			{:else}
				<slot name="main" />
			{/if}
		</main>
	</section>
</div>

<style lang="scss">
	.links {
		display: flex;
		justify-content: flex-end;
		position: relative;

		> div {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			justify-content: flex-end;
			width: 100%;
			margin-top: 2rem;
			z-index: 4;

			ul {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				padding: 0.5rem;
				background-color: var(--color-black-4);
				column-gap: 0.4rem;
				li {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					column-gap: 0.4rem;
					padding: 0.4rem;
					width: 100%;

					border-radius: var(--border-radius-small);
					&:hover {
						background-color: var(--color-black-3);
					}
					a {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text-decoration: none;
						color: var(--color-text-2);
						font-size: 0.7rem;
						width: 100%;
						&:hover {
							color: var(--color-text-1);
						}
					}
				}
			}
		}

		button {
			border: 1px solid var(--color-black-4);
			background-color: transparent;
			border-radius: var(--border-radius-small);
			padding: 0.5rem 0.8rem;
			width: 100%;
			min-width: 100px;
			color: var(--color-text-2);
		}
	}
	.compactBar {
		display: flex;
		justify-content: flex-start;
		width: 100%;

		> div {
			flex: 1;
		}
	}
	#page {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: hidden;
		padding: 0;
		height: 100svh;
		width: 100svw;
		max-width: 1600px;
		nav {
			width: 100%;
			border-bottom: 1px solid var(--color-border-2);
			background-color: var(--color-black-2);
			justify-content: space-between;
			align-items: center;
			display: flex;
			flex-direction: column;
			.topnav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0.5rem;
				position: relative;

				column-gap: 0.8rem;
				min-height: 3rem;
				.item {
					padding: 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					column-gap: 0.4rem;
					width: 100%;

					a {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						img {
							width: 1.8rem;
							height: 1.8rem;
							border-radius: 50%;
						}
						text-decoration: none;
						&:hover {
							h2 {
								color: var(--color-text-2);
							}
						}
					}

					h2 {
						font-size: 1.3rem;
						color: var(--color-text-2);
						font-weight: 600;
						text-transform: uppercase;
						flex: 1;
						span {
							font-size: 0.8rem;
							color: var(--color-text-2);
							font-weight: 400;
							text-transform: none;
						}
					}

					button {
						background-color: inherit;
						padding: 0;
					}

					&.bottom {
						button {
							padding: 0;
							width: 100%;
						}
					}
				}
			}
		}
		> section {
			display: flex;
			width: 100%;
			overflow: hidden;
			flex-wrap: nowrap;
			height: 100%;
			padding: 0;
			column-gap: 0;
			main {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-direction: column;
				flex: 1;
				overflow: scroll;
				padding: 0;
			}

			aside {
				position: relative;
				background-color: var(--color-black-2);
				z-index: 200;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				.item {
					width: 100%;
					padding: 0.6rem 0.3rem;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 2.8rem;
					column-gap: 0.4rem;

					h2 {
						font-size: 0.9rem;
						color: var(--color-text-primary);
						font-weight: 600;
						flex: 1;
						padding: 0.4rem;
					}

					button {
						background-color: inherit;
						padding: 0;
						width: 100%;
					}

					&.bottom {
						button {
							padding: 0;
							width: 100%;
						}
					}
				}
				.sidebar {
					position: relative;
					width: 20rem;
					overflow: scroll;
					height: 100%;
					.content {
						width: 100%;
						max-width: 100%;
						flex: 1;
						height: 100%;
					}
					&.compact {
						width: 2.4rem;
					}
				}
			}
		}
	}
</style>
