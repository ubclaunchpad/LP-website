<script lang="ts">
	import { slide } from 'svelte/transition';
	import MenuIcon from '../general/icons/MenuIcon.svelte';
	import logo from '$lib/assets/logo.png';
	import { onMount } from 'svelte';
	import Loader from '../blocks/Loader.svelte';
	let pageWidth: number;
	$: isCompact = pageWidth < cutoff;
	let collapse = true;
	const cutoff = 1200;
	$: transitionDuration = isCompact ? 300 : 0;
	$: showNav = pageWidth > cutoff || !collapse;

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
			<div>
				<a href="/">
					<img src={logo} alt="logo" width="30px" />
				</a>

				<h2>Launch Pad <span>(Docs)</span></h2>
			</div>
			<input class="search" placeholder="search" />
		</section>
	</nav>

	<section>
		{#if pageWidth}
			<aside>
				<div class="sidebar" class:compact={isCompact}>
					{#if showNav}
						<div
							class="content"
							transition:slide|global={{ axis: 'x', duration: transitionDuration }}
						>
							<slot name="nav" />
						</div>
					{/if}
					<div />

					<div class="item bottom" class:open={showNav}>
						{#if isCompact}
							<button on:click={() => (collapse = !collapse)}>
								<MenuIcon width={'1rem'} />
							</button>
						{/if}
					</div>
				</div>
			</aside>

			<main class:blur={!collapse && isCompact} on:click={collapseNav}>
				<slot />
			</main>
		{:else}
			<Loader width={'100%'} height={'100%'} />
		{/if}
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
		width: 100svw;
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
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0.2rem;
				padding-right: 0.5rem;
				column-gap: 0.8rem;

				> div {
					display: flex;
					justify-content: space-between;
					align-items: center;
					a {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
				h2 {
					position: relative;
					font-size: 1rem;
					color: var(--color-text-2);
					font-weight: 600;

					span {
						color: var(--color-text-primary);
						font-weight: 500;
					}
				}

				input {
					right: 0;
					// transform: translateX(-50%);
					background-color: transparent;
					border: 1px solid var(--color-border-0);
					width: 100%;
					max-width: 300px;

					&:focus {
						// border: none;
						border-color: var(--color-border-1);
					}
				}

				span {
					position: static;
					top: 100%;
					left: 100%;
					transform: translate(0%, -90%);
					font-size: 0.7rem;
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
			overflow: hidden;
			flex-wrap: nowrap;
			height: 100%;
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
				background-color: var(--color-bg-2);
				z-index: 100;
				.sidebar {
					position: relative;
					overflow: hidden;
					.content {
						width: 14rem;
						max-width: 100%;
						flex: 1;
						overflow-y: scroll;
					}

					&.compact {
						// width: 2.4rem;
					}

					.item {
						width: 100%;
						padding: 0.6rem 0.8rem;
						display: flex;
						justify-content: flex-start;

						button {
							background-color: inherit;
						}

						&.bottom {
							background-color: var(--color-bg-3);
							// position: absolute;
						}
					}
					z-index: 200;
					border-right: 1px solid var(--color-border-0);

					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
				}
			}
		}
	}
</style>
