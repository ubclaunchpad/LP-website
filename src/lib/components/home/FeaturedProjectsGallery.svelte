<script lang="ts">
	import ProjectSection from '$lib/components/home/ProjectSection.svelte';
</script>

<div class="project-section">
	<h3>Starred Projects</h3>
	<div class="projects">
		<ProjectSection />
		<ProjectSection />
		<ProjectSection />
		<ProjectSection />
	</div>
</div>

<style lang="scss">
	.projects {
		display: flex;
		overflow: scroll;
		flex-direction: row;
		width: 100%;
		padding: 0.4rem 0;
		border-top: 1px solid var(--color-border-2);
		border-bottom: 1px solid var(--color-border-2);
	}

	.project-section {
		padding: 1rem;
		display: flex;
		width: 100%;
		flex-direction: column;
		row-gap: 0.5rem;
	}
</style>
