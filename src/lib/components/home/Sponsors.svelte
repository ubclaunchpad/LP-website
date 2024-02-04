<script lang="ts">
	import sponsorPromotion from '$lib/components/general/icons/illustrations/sponsor-promotion.svg';
	import sponsorDiscovery from '$lib/components/general/icons/illustrations/sponsor-discovery.svg';
	import sponsorAccess from '$lib/components/general/icons/illustrations/sponsor-access.svg';
	import sponsorDevelopment from '$lib/components/general/icons/illustrations/sponsor-development.svg';
	import AnimateWrapper from '$lib/components/general/AnimateWrapper.svelte';
	import { fade } from 'svelte/transition';
</script>

<AnimateWrapper>
	<section in:fade={{ delay: 500, duration: 1000 }} out:fade>
		<div>
			<div class="img-wrapper">
				<img src={sponsorDiscovery} alt="logo" />
			</div>
			<div>
				<h1>Product Discovery</h1>
				<p>Introduce product, platform, API to project teams</p>
			</div>
		</div>

		<div>
			<div class="img-wrapper">
				<img src={sponsorAccess} alt="logo" />
			</div>
			<div>
				<h1>Exclusive Access</h1>

				<p>Access members’ resumes, GitHub, contact info, and more</p>
			</div>
		</div>

		<div>
			<div class="img-wrapper">
				<img src={sponsorDevelopment} alt="logo" />
			</div>
			<div>
				<h1>Dedicated Development</h1>

				<p>
					Work with a dedicated team of developers and designers to build or improve your product
				</p>
			</div>
		</div>

		<div>
			<div class="img-wrapper">
				<img src={sponsorPromotion} alt="logo" />
			</div>
			<div>
				<h1>Promotion</h1>

				<p>Personalized shout-out at workshops and techtalks</p>
			</div>
		</div>
	</section>
</AnimateWrapper>

<style lang="scss">
	section {
		display: flex;
		justify-content: space-around;
		gap: 1rem;
		padding: 0.5rem;
		flex-wrap: wrap;

		@media (max-width: 850px) {
			flex-direction: column;
		}

		> div {
			flex: 1;
			padding: 1rem;
			flex-direction: column;
			display: flex;
			background-color: var(--color-black-2);

			border-radius: var(--border-radius-large);

			@media (max-width: 850px) {
				flex-direction: row;
			}

			div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 1rem;
			}

			.img-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
				@media (max-width: 850px) {
					width: fit-content;
				}
			}

			img {
				height: 200px;
				width: 200px;
			}

			p {
				padding: 1rem;

				list-style: none;
				font-size: 0.9rem;
				color: var(--color-text-2);
			}
		}
	}
</style>
