<script>
	import AnimateWrapper from '$lib/components/general/AnimateWrapper.svelte';
	import { backOut } from 'svelte/easing';
	import { blur } from 'svelte/transition';
	export let id;
	export let title = 'Collaboration';
	import { fly } from 'svelte/transition';
</script>

<section {id}>
	<div class="content">
		<div class="header">
			<AnimateWrapper>
				<h3 in:blur={{ delay: 0, duration: 1000 }}>{title}</h3>
			</AnimateWrapper>

			<AnimateWrapper>
				<div
					in:fly={{
						y: 100,
						delay: 300,
						easing: backOut
					}}
				>
					<slot name="text" />
				</div>
			</AnimateWrapper>
		</div>
		<div class="details-row">
			<div>
				<slot />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	:global(*) {
		font-family: 'Exo', sans-serif;
	}

	:global(.annotate) {
		text-decoration: underline wavy #95b8ff;
		-webkit-text-decoration: underline wavy #95b8ff; /* Safari, older versions of Chrome */
		-moz-text-decoration: underline wavy #95b8ff; /* Firefox */
		-o-text-decoration: underline wavy #95b8ff; /* Opera */
		-ms-text-decoration: underline wavy #95b8ff;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		overflow-y: visible;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem 0 3rem;
		max-width: 1200px;
		width: 100%;
		//background: radial-gradient(40% 150px at 50% 0%, rgba(128, 156, 255, 0.22), transparent 100%);
	}

	.header {
		max-width: 750px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		h3 {
			width: 100%;
			font-size: 1.6rem;
			font-weight: 600;
			color: #cecece;
			margin-bottom: 1.5rem;
			text-transform: uppercase;
			z-index: 3;
			text-align: center;
		}

		:global(p) {
			font-size: 1.5rem;
			font-weight: 400;
			color: #cecece;
			text-align: center;
			max-width: 800px;
		}
	}
</style>
