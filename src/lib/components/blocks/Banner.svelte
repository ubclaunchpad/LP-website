<script lang="ts">
	import Icon from '../general/Icon.svelte';
	import ArrowRightIcon from '../general/icons/ArrowRightIcon.svelte';
	export let title: string;
	export let description: string;
	export let links = [];
	export let type = 0;
</script>

<div class="wrapper">
	{#each Array(type) as _}
		<div />
	{/each}
	<div class="welcome">
		<div class="title">
			<h3>{title}</h3>
		</div>
		<p>
			{description}
		</p>
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
	}
	.welcome {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		height: 100%;
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

		&:nth-child(1) {
			background: linear-gradient(
				to bottom right,
				var(--color-bg-primary-faded),
				var(--color-bg-primary)
			);
		}

		&:nth-child(2) {
			background: linear-gradient(
				to top right,
				var(--color-bg-secondary-faded),
				var(--color-bg-secondary)
			);
		}

		&:nth-child(3) {
			background: linear-gradient(
				to top right,
				var(--color-bg-tertiary-faded),
				var(--color-bg-tertiary)
			);
		}

		gap: 1rem;

		border-radius: 10px;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
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
