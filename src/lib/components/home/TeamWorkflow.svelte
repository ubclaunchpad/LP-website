<script lang="ts">
	import teamDiscussion from '$lib/components/general/icons/illustrations/team.svg';
	import feedbackAndIteration from '$lib/components/general/icons/illustrations/feedbackAndIteration.svg';
	import developmentAndDesign from '$lib/components/general/icons/illustrations/developmentAndDesign.svg';
	import AnimateWrapper from '$lib/components/general/AnimateWrapper.svelte';
	import { fade } from 'svelte/transition';
</script>

<AnimateWrapper>
	<section in:fade={{ delay: 500, duration: 1000 }} out:fade>
		<div>
			<div class="img-wrapper">
				<img src={teamDiscussion} alt="logo" />
			</div>
			<div>
				<h1>Discussion</h1>
				<p>
					Weekly meetings to go over their progress and build together. Gathering ideas and
					narrowing down project scope. UX research around the problem space
				</p>
			</div>
		</div>

		<div>
			<div class="img-wrapper">
				<img src={developmentAndDesign} alt="logo" />
			</div>
			<div>
				<h1>Development and Design</h1>

				<p>
					Developer and designer collaboration to build the product. Implementing developer
					pipelines and design systems
				</p>
			</div>
		</div>

		<div>
			<div class="img-wrapper">
				<img src={feedbackAndIteration} alt="logo" />
			</div>
			<div>
				<h1>Feedback and Reiteration</h1>

				<p>
					Collecting feedback from users and stakeholders. Reiterating on the product based on
					feedback. Releasing new versions of the product
				</p>
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
