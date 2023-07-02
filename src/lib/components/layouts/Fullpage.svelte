<script lang="ts">
	import { slide } from 'svelte/transition';
	import MenuIcon from '../general/icons/MenuIcon.svelte';
	import logo from '$lib/assets/logo.png';
	import { onMount } from 'svelte';
	import Loader from '../blocks/Loader.svelte';
	import Icon from '../general/Icon.svelte';
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
	<section>
		{#if pageWidth}
			{#if !isCompact}
				<aside>
					<div class="sidebar" class:compact={isCompact}>
						<div class="item" class:open={showNav}>
							{#if isCompact}
								<button on:click={() => (collapse = !collapse)}>
									<Icon>
										<MenuIcon width={'1rem'} />
									</Icon>
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
						<div />

						<div class="item bottom" class:open={showNav}>
							<button on:click={() => (collapse = !collapse)}>
								<img src={logo} width="14px" />
							</button>
						</div>
					</div>
				</aside>
			{/if}

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
			background-color: var(--color-bg-primary);
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
				min-height: 3rem;

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
			padding: 0.3rem;
			column-gap: 10px;
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
				overflow: hidden;
				.sidebar {
					position: relative;
					width: 14rem;
					.content {
						width: 14rem;
						max-width: 100%;
						flex: 1;
						overflow-y: scroll;
						position: absolute;
					}

					&.compact {
						width: 2.4rem;
					}

					.item {
						width: 100%;
						padding: 0.6rem 0rem;
						display: flex;
						justify-content: flex-start;

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

							img {
								width: 100%;
								max-height: 25px;
								object-fit: contain;
							}
							// position: absolute;
						}
					}
					z-index: 200;
					border: 1px solid var(--color-border-0);
					border-radius: var(--border-radius-medium);
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
