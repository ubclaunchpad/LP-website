<script lang="ts">
	import {
		DOCS_LINK,
		FACEBOOK_LINK,
		GITHUB_LINK,
		INSTAGRAM_LINK,
		LINKEDIN_LINK,
		STRATEGY_EMAIL,
		TEAM_EMAIL
	} from '$lib/util/links';
</script>

<footer>
	<div class="grid">
		<section>
			<p>Resources</p>
			<a href={DOCS_LINK} target="_blank" referrerpolicy="no-referrer">Documentation</a>
			<a href={GITHUB_LINK} target="_blank" referrerpolicy="no-referrer">Github</a>
		</section>
		<section>
			<p>Contact</p>
			<a href={STRATEGY_EMAIL}>General Inquiries</a>
			<a href={TEAM_EMAIL}>Sponsorship</a>
		</section>

		<section>
			<p>Socials</p>
			<a href={FACEBOOK_LINK}>Facebook</a>
			<a href={INSTAGRAM_LINK}>Instagram</a>
			<a href={LINKEDIN_LINK}>LinkedIn</a>
		</section>
	</div>
</footer>

<style lang="scss">
	.grid {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: flex-start;
		flex-wrap: wrap;
		max-width: fit-content;
	}

	section {
		display: flex;
		flex-direction: column;
		width: 13rem;

		p {
			font-weight: 600;
			font-size: 1rem;
			margin-bottom: 1rem;
			color: var(--color-text-2);
		}

		a {
			font-size: 0.9rem;
			color: var(--color-text-3);
			margin-bottom: 0.4rem;
		}
	}

	footer {
		background-color: var(--color-black);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		padding: 1rem;
		width: 100%;
		border-top: 1px solid var(--color-border-2);
	}
</style>
