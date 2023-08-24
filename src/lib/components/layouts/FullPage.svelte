<script lang="ts">
	import { slide } from 'svelte/transition';
	import MenuIcon from '../general/icons/MenuIcon.svelte';
	import { onMount } from 'svelte';
	import Icon from '../general/Icon.svelte';
	let pageWidth: number;

	let collapse = true;
	const cutoff = 1200;
	$: transitionDuration = isCompact ? 300 : 0;
	let showNav = false;
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
						<MenuIcon width={'0.9rem'} />
					</Icon>
				</button>
				<h2>Launch Pad Documentation</h2>
			</div>


		</div>
	</nav>
	<section>

			{#if !isCompact}
				<aside>
					<div class="sidebar" class:compact={isCompact}>
						<div class="content" transition:slide|global={{ axis: 'x', duration: transitionDuration }}>
							<slot name="nav" />
						</div>
					</div>
					<div class="item" class:open={showNav}>
						<button on:click={() => (collapse = !collapse)}>
							<Icon>
								<MenuIcon width={'1rem'} />
							</Icon>
						</button>
					</div>
				</aside>
				{/if}

		<main  on:click={collapseNav}>
			{#if !collapse && isCompact}
				<div class="compactBar">

				<slot name="nav" />
					<div></div>
				</div>
			{:else }
			<slot name="main" />
			{/if}
		</main>
	</section>
</div>

<style lang="scss">

	.compactBar {
		display: flex;
		justify-content: flex-start;
		width: 100%;

		>div {
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
		.blur {
			filter: blur(10px);
			:global(*) {
				pointer-events: none;
			}
		}
		nav {
			width: 100%;
			border-bottom: 1px solid var(--color-border-2);
			justify-content: space-between;
			align-items: center;
			display: flex;
			flex-direction: column;
			.topnav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 1rem;
				padding-right: 0.5rem;
				column-gap: 0.8rem;
				min-height: 3rem;
				.item {
					padding: 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					column-gap: 0.4rem;
					width: 100%;

					h2 {
						font-size: 0.9rem;
						color: var(--color-text-primary);
						font-weight: 600;
						flex: 1;
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
				border-right: 1px solid var(--color-border-2);
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
					justify-content: flex-start;
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
