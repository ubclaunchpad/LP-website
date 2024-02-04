<script lang="ts">
	export let projectInfo: {
		title: string;
		description: string;
		info: string;
		image: string;
		links: { name: string; url: string }[];
		github: string;
		tags: string[];
	} = {
		title: 'Inertia',
		description: '✈️ Effortless, self-hosted continuous deployment',
		info:
			'Inertia is an app that enables effortless setup and management of automated,\n' +
			'        continuous deployment on any virtual private server. It is used by several Launch Pad projects\n' +
			'        and features a serverside service, a command-line interface, and the ability to deploy\n' +
			'        almost anything anywhere.',
		image: 'https://raw.githubusercontent.com/ubclaunchpad/inertia/master/.static/banner.png',
		links: [
			{ name: 'repository', url: 'https://github.com/ubclaunchpad/inertia' },
			{ name: 'website', url: 'https://inertia.ubclaunchpad.com' },
			{
				name: 'writeup',
				url: 'https://medium.com/ubc-launch-pad-software-engineering-blog/building-continuous-deployment-87a2bd8eedbe'
			}
		],
		github: '',
		tags: []
	};
</script>

<section>
	<div class="content">
		<h4>{projectInfo.title}</h4>
		<p>{projectInfo.description}</p>

		<div class="info">
			<button>Learn more</button>
			<!--			<p>{projectInfo.info}</p>-->
		</div>

		<div class="links">
			{#each projectInfo.links as link}
				<a href="">
					{link.name}
				</a>
			{/each}
		</div>
	</div>

	<!--	<img src={projectInfo.image} />-->
</section>

<style lang="scss">
	.info {
		button {
			padding: 0.4rem;
			border-radius: var(--border-radius-large);
			border: 1px solid var(--color-border-2);
			background-color: rgba(42, 42, 51, 0.38);
			color: var(--color-text-2);
		}
	}
	.links {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		column-gap: 0.5rem;
		position: absolute;
		top: 0;
		padding: 1rem;
		opacity: 0.7;
	}

	.content {
		z-index: 5;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding: 1rem;
		height: 100%;
		background-color: transparent;

		&:hover {
			background-color: #000b1c;
		}
	}

	section {
		position: relative;
		height: 350px;
		overflow: hidden;
		border: 1px solid #000b1c;
		border-radius: var(--border-radius-medium);
		background-color: var(--color-bg-2);
	}

	img {
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		z-index: 1;
	}
</style>
