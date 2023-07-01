<script lang="ts">
	import Icon from '../general/Icon.svelte';
	import ArrowRightIcon from '../general/icons/ArrowRightIcon.svelte';
	export let title: string;
	export let description: string;
	export let links = [];
</script>

<div class="wrapper">
	<div class="welcome">
		<div class="title">
			<h3>{title}</h3>
		</div>
		<slot />
		<div class="refs">
			{#each links as link}
				<a href={link.link} target="_blank">
					<p>{link.text}</p>
					<Icon>
						<ArrowRightIcon />
					</Icon>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--color-bg-3);
		padding: 3rem 1rem;
		justify-content: center;
		align-items: center;
	}
	.welcome {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		max-width: 700px;

		flex: 1;
		.refs {
			display: flex;
			flex: 1;
			height: 100%;
			flex-direction: column;
			width: 100%;
			align-items: flex-end;
			justify-content: flex-end;
			row-gap: 1rem;

			a {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: transparent;
				column-gap: 0.5rem;
				padding: 0 0 0.3rem;
				text-decoration: none;
				border-bottom: 1px solid var(--color-text-0);
				transition: all 0.2s ease-in-out;
				&:hover {
					transform: scale(1.05);
				}

				p {
					font-size: 0.8rem;
					font-weight: 500;
					color: var(--color-text-0);
				}
			}
		}

		gap: 1rem;
		padding: 1rem;

		> p {
			// max-width: 750px;
			padding: 1rem;
			font-size: 1rem;
			font-weight: 500;
			color: var(--color-text-0);
			z-index: 2;
		}

		.title {
			display: flex;
			flex-direction: row;
			column-gap: 10px;
			align-items: center;
		}
	}
</style>
