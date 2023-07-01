<script lang="ts">
	import { PUBLIC_GITHUB_TEAM_URI } from '$env/static/public';
	import { STRATEGY_EMAIL } from '$lib/util/links';
	import { blur } from 'svelte/transition';
	import Banner from './Banner.svelte';
	import Info from './Info.svelte';
	export let title: string;
	export let area: string | undefined;
</script>

<div class="error-section" in:blur={{ duration: 700 }}>
	<Banner
		title={`${title}`}
		description={''}
		links={[
			{
				link: PUBLIC_GITHUB_TEAM_URI,
				text: 'View the team repo'
			},
			{
				link: `${PUBLIC_GITHUB_TEAM_URI}/${area}`,
				text: 'View the requested Repository and its documents directly'
			}
		]}
	>
		<Info>
			<div class="error">
				<h4>😔 Resource is unreachable</h4>

				<p>
					Unfortuantely, we could not find the document you're looking for. Most times it could be
					access issues. Please follow the trouble shooting items for more info
				</p>
			</div>
		</Info>
		<Info>
			<div class="error">
				<h4>🔎 Troubleshooting</h4>
				<ul>
					<li>
						Make sure you have reading access scopes for this area. Visit our portal to learn more
					</li>
					<li>
						The docs pipeline could be temorarily syncing (but should rarely last more than a
						minute)
					</li>
					<li>Or we might be encountering issues integrating with Github or our server</li>
				</ul>

				<h6>If issue persists <span><a href={`mailto:${STRATEGY_EMAIL}`}>email us</a></span></h6>
			</div>
		</Info>
	</Banner>
</div>

<style lang="scss">
	.error-section {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		width: 100%;
		height: 100%;
		flex: 1;
	}

	.error {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		row-gap: 2rem;
		padding: 1rem;
		ul {
			color: var(--color-text-2);
			font-size: 0.9rem;
			padding-left: 1.5rem;

			li {
				line-height: 1.8;
			}
		}
	}
</style>
