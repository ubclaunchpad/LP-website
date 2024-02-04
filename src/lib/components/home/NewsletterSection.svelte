<script lang="ts">
	const newsletterURI = 'https://buttondown.email/api/emails/embed-subscribe/ubclaunchpad';
</script>

<div id="contact" class="wrapper">
	<div class="newsletter">
		<h3>Keep In Touch</h3>

		<div>
			<p>
				Sign up for our newsletter and follow us on social media to get notified when applications
				open! You'll also be able to stay in the loop for events, articles, club updates, and more!
			</p>

			<form method="post" action={newsletterURI}>
				<input type="email" name="email" id="bd-email" placeholder="Enter your email" />
				<button type="submit" value="Subscribe">Subscribe</button>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		width: 100%;
		height: 300px;

		justify-content: center;
		align-items: center;

		> div {
			min-width: fit-content;
			max-width: 1000px;
		}
	}
	.newsletter {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 1rem;
		padding: 1rem;
		width: 100%;
		border-radius: var(--border-radius-medium);

		h3 {
			font-size: 1.2rem;
			padding-bottom: 0.5rem;
			text-align: center;
			text-transform: uppercase;
		}

		> div {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
		}
	}

	p {
		max-width: 650px;
		font-size: 1em;
		text-align: left;
		width: fit-content;
		opacity: 0.8;
		padding: 1rem 0;
	}

	form {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 1rem;
		color: var(--color-text-1);

		input {
			background-color: transparent;
			border: none;
			font-size: 1.1rem;
			border-bottom: 1px solid var(--color-border-2);
			padding: 0.8rem 1rem;
			width: 100%;
			border-radius: 0;
			&:focus {
				border-color: var(--color-bg-primary);
			}
		}

		button {
			font-size: 1.1rem;

			background-color: transparent;
			padding: 0.5rem 1rem;
			border-radius: var(--border-radius-medium);
			color: var(--color-text-1);
			font-weight: bold;
		}
	}
</style>
