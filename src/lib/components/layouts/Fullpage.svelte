<script lang="ts">
	import { slide } from 'svelte/transition';
	import MenuIcon from '../general/icons/MenuIcon.svelte';
	import logo from '$lib/assets/logo.png';
	import { onMount } from 'svelte';
	let pageWidth: number;
	let collapse = true;
	const cutoff = 1200;
	$: transitionDuration = isCompact ? 300 : 0;
	$: showNav = pageWidth > cutoff || !collapse;
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

	const onNavigation = () => {
		collapseNav();
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
		<section class="topnav">
			<a href="/">
				<img src={logo} alt="logo" width="36px" />
			</a>
			<h2>Launch Pad <span>(Docs)</span></h2>
			<input class="search" placeholder="search"/>
			<div />
		</section>

		<section class="subnav" />
	</nav>
	<section>
		<aside>
			<div class="sidebar" class:compact={isCompact}>
				<div class="item" class:open={showNav}>
					{#if isCompact}
						<button on:click={() => (collapse = !collapse)}>
							<MenuIcon width={'1rem'} />
						</button>
					{/if}
				</div>

				{#if showNav}
					<div
						class="content"
						transition:slide|global={{ axis: 'x', duration: transitionDuration }}
					>
						<slot name="nav" />
					</div>
				{/if}

				<div class="item bottom" class:open={showNav}>
					<a href="/">
						<img src={logo} alt="logo" width="36px" />
					</a>
				</div>
			</div>
		</aside>

		<main class:blur={!collapse && isCompact} on:click={collapseNav}>
			<slot />
		</main>
	</section>
</div>

<style lang="scss">
	#page {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: hidden;
		padding: 0;
		height: 100svh;
		.blur {
			filter: blur(10px);
			:global(*) {
				pointer-events: none;
			}
		}
		> nav {
			width: 100%;
			border-bottom: 1px solid var(--color-border-0);

			justify-content: space-between;
			align-items: center;
			display: flex;
			flex-direction: column;

			.topnav {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				padding: 0.2rem;
				column-gap: 0.8rem;
				
				h2 {
					position: relative;
					font-size: 1.1rem;
				}

				input {
					position: fixed;
					left: 50%;
					transform: translateX(-50%);

					background-color: transparent;
					width: 100%;
					max-width: 650px;

					&:focus {
						// border: none;
						border-radius: var(--border-radius-small);
						border-color: var(--color-bg-2);
					}
				}

				span {
					position: static;
					top: 100%;
					left: 100%;
					transform: translate(0%, -90%);
					font-size: 0.8rem;
					padding: 0 0rem;
				}
			}

			.subnav {
				display: flex;
				border-top: 1px solid var(--color-border-0);
				width: 100%;
				height: 2rem;
			}
		}
		> section {
			display: flex;
			width: 100%;
			overflow-y: scroll;
			main {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-direction: column;
				flex: 1;
				overflow: scroll;
				padding: 0rem;
			}

			aside {
				position: relative;
				min-width: 2.4rem;
				height: 100%;
				background-color: var(--color-bg-1);
				z-index: 100;
				.compact {
					position: absolute;
					top: 0;
					left: 0;
				}

				.sidebar {
					.item {
						width: 2.4rem;
						padding: 1rem 0.4rem;
						display: flex;
						justify-content: center;
						button {
							background-color: inherit;
						}
					}
					z-index: 200;
					border-right: 1px solid var(--color-border-0);

					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					.content {
						width: 15rem;
						max-width: 100%;
						flex: 1;
					}
				}
			}
		}
	}
</style>
