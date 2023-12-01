<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import Icon from '$lib/components/general/Icon.svelte';
	import ChevronRightIcon from '$lib/components/general/icons/ChevronRightIcon.svelte';
	import ChevronDownIcon from '$lib/components/general/icons/ChevronDownIcon.svelte';
	import handbook from '$lib/assets/handbook.png';
	import onboarding from '$lib/assets/onboarding.png';
	import projects from '$lib/assets/projects.png';
	import recruitment from '$lib/assets/recruitment.png';
	import templates from '$lib/assets/templates.png';
	import tools from '$lib/assets/tools.png';
	export let directory;
	export let isExpanded = true;
	
	const toggleList = () => {
		isExpanded = !isExpanded;
	};

	const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

	const pickImage = (name) => {
		switch (name) {
			case 'handbook':
				return handbook;
			case 'onboarding':
				return onboarding;
			case 'projects':
				return projects;
			case 'recruitment':
				return recruitment;
			case 'templates':
				return templates;
			case 'tools':
				return tools;
			default:
				return handbook;
		}
	};

	const getDirectory = () => {
    const segments = new URL($page.url).pathname.split('/');
    return `/${segments[1]}`;
  };
	const getSubDirectory = () => {
    const segments = new URL($page.url).pathname.split('/');
    return `/${segments[2]}`;
  };

	let directoryURL = getDirectory();
  let subDirectoryURL = getSubDirectory();

	beforeUpdate(() => {
    directoryURL = getDirectory();
    subDirectoryURL = getSubDirectory();
  });

	let isActive = (directoryURL === `/${directory.name}` ? 'active' : '');

	console.log('directoryURL:', directoryURL);

	
</script>

<div class="wrapper">
	<li class="dir">
		<div class="header">
			<img src={pickImage(directory.name)} alt="directoryImage">
			<p class = {isActive}>
				{capitalizeFirstLetter(directory.name)}
			</p>
			<button on:click={toggleList}>
				{#if isExpanded}
					<Icon>
						<ChevronDownIcon />
					</Icon>
				{:else}
					<Icon>
						<ChevronRightIcon />
					</Icon>
				{/if}
			</button>
		</div>
		{#if isExpanded}
			<div class="expanded">
				<ul class="file-list" in:slide={{ axis: 'y', duration: 500 }}>
					{#if directory.files.length > 0}
						{#each directory.files as file}
							<li>
								<a href={`/${directory.name}/${file.slug}`}>
									<p>{capitalizeFirstLetter(file.slug)}</p>
								</a>
							</li>
						{/each}
					{/if}

					<!--{#if directory.directories && directory.directories.length > 0}-->
					<!--	{#each directory.directories as subDirectory}-->
					<!--		<svelte:self directory={subDirectory} />-->
					<!--	{/each}-->
					<!--{/if}-->
				</ul>
			</div>
		{/if}
	</li>
</div>

<style lang="scss">
	.active {
		
	}
	img {
		width: 20px;
	}
	a {
		text-decoration: none;
		color: var(--color-text-3);
	}
	li {
		list-style: none;
	}

	.wrapper {
		display: flex;
		padding: 0 0 0.5rem;
		width: 100%;
	}
	.expanded {
		border-left: 1px solid var(--color-border-2);
		margin-left: 7px;
	}

	.dir {
		padding: 0;
		font-size: 0.8rem;
		color: var(--color-bg-primary);
		font-weight: 500;
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	.header {
		display: flex;
		width: 100%;
		column-gap: 5px;
		padding: 0.2rem 0;
		border-radius: var(--border-radius-medium);
		background-color: inherit;
		color: var(--color-text-3);
		align-items: center;
		position: relative;

		button {
			background-color: transparent;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		:global(svg) {
			stroke-width: 2px;
			background-color: inherit;
			stroke: var(--color-text-3);
		}
	}

	.file-list {
		padding-left: 0.2rem;
		list-style-type: none;
		font-size: 1rem;

		li {
			padding: 0.3rem;

			a {
				display: flex;
				column-gap: 5px;
				align-items: center;
				text-decoration: none;
				font-size: 0.8rem;

				:global(svg) {
					width: 14px;
				}

				p {
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
