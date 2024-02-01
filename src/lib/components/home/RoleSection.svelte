<script lang="ts">
	import developerIcon from '$lib/components/general/icons/illustrations/developerRole.svg';
	import designerIcon from '$lib/components/general/icons/illustrations/designerRole.svg';
	import designLeadIcon from '$lib/components/general/icons/illustrations/designLeadRole.svg';
	import coPresidentIcon from '$lib/components/general/icons/illustrations/CopresRole.svg';
	import techLeadRoleIcon from '$lib/components/general/icons/illustrations/techLeadRole.svg';
	import strategyRoleIcon from '$lib/components/general/icons/illustrations/strategyRole.svg';

	import { fade } from 'svelte/transition';
	import type { IRoleComponent } from '$lib/types/types';
	import {
		DEVELOPER_ROLE_LINK,
		DESIGNER_ROLE_LINK,
		CO_PRESIDENT_ROLE_LINK,
		STRATEGY_ROLE_LINK,
		DESIGN_LEAD_ROLE_LINK,
		TECH_LEAD_ROLE_LINK
	} from '$lib/util/links';
	import RoleCell from '$lib/components/home/RoleCell.svelte';
	import AnimateWrapper from '$lib/components/general/AnimateWrapper.svelte';

	const roles: IRoleComponent[] = [
		{
			title: 'Developer',
			anchorLink: DEVELOPER_ROLE_LINK,
			image: developerIcon,
			description: 'Develop intricate and complex projects for the club and the community'
		},
		{
			title: 'Designer',
			anchorLink: DESIGNER_ROLE_LINK,
			image: designerIcon,
			description: 'Create the visual identity of the project and the club'
		},

		{
			title: 'Strategy Coordinator',
			anchorLink: STRATEGY_ROLE_LINK,
			image: strategyRoleIcon,
			description:
				'Contribute to the internal operations of the club and plan the future of the club'
		},

		{
			title: 'Tech Lead',
			anchorLink: TECH_LEAD_ROLE_LINK,
			image: techLeadRoleIcon,
			description: 'Lead a team of developers and designers to build a project for 4-8 months'
		},

		{
			title: 'Design Lead',
			anchorLink: DESIGN_LEAD_ROLE_LINK,
			image: designLeadIcon,
			description:
				'Lead and mentor designers of all levels and work with the tech lead to realized projects'
		},
		{
			title: 'Co-president',
			anchorLink: CO_PRESIDENT_ROLE_LINK,
			image: coPresidentIcon,
			description: 'Plan, organize and lead the club to success'
		}
	];
	let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<div class="roles">
	{#each roles as role, i}
		<AnimateWrapper>
			<div in:fade={{ delay: 500 * i, duration: 1000 }} out:fade class="wrapper">
				<RoleCell {role}>
					<img src={role.image} alt="logo" />
				</RoleCell>
			</div>
		</AnimateWrapper>
	{/each}
</div>

<style lang="scss">
	.roles {
		display: grid;
		grid-template-columns: repeat(3, 380px);
		justify-items: center;
		justify-content: center;
		width: 100%;
		padding: 3rem 0;
		@media screen and (max-width: 1100px) and (min-width: 550px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 550px) {
			grid-template-columns: repeat(1, 1fr);
		}

		.wrapper {
			padding: 1.2rem;
			width: 100%;
		}
	}
</style>
