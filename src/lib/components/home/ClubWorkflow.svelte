<script lang="ts">
	import devImage from '$lib/assets/developer-image.png';
</script>

<section>
	<div>
		<div class="img-wrapper">
			<img src={devImage} alt="logo" />
		</div>
		<h1>Discussion</h1>
		<ul>
			<li>Weekly meetings to go over their progress and build together</li>
			<li>Gathering ideas and narrowing down project scope</li>
			<li>UX research around the problem space</li>
		</ul>
	</div>

	<div>
		<div class="img-wrapper">
			<img src={devImage} alt="logo" />
		</div>
		<h1>Development and Design</h1>

		<ul>
			<li>Developer and designer collaboration to build the product</li>
			<li>Building product is sprint cycles</li>
			<li>Implementing developer pipelines and design systems</li>
		</ul>
	</div>

	<div>
		<div class="img-wrapper">
			<img src={devImage} alt="logo" />
		</div>
		<h1>Feedback and Reiteration</h1>

		<ul>
			<li>Collecting feedback from users and stakeholders</li>
			<li>Reiterating on the product based on feedback</li>
			<li>Releasing new versions of the product</li>
		</ul>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		justify-content: space-around;
		gap: 1rem;
		padding: 0.5rem;

		> div {
			flex: 1;
			background-color: #1c1c1c;
			padding: 1rem;
			border-radius: var(--border-radius-large);
			border: 1px solid var(--color-bg-primary);

			.img-wrapper {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			img {
				height: 200px;
			}

			ul {
				padding: 1rem;
				li {
					list-style: none;
				}
			}
		}
	}
</style>
