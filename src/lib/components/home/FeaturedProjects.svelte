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
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0.4rem 0;
		gap: 1rem;

		@media screen and (max-width: 1200px) and (min-width: 750px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 750px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.project-section {
		padding: 1rem;
		display: flex;
		width: 100%;
		flex-direction: column;
		row-gap: 0.5rem;
	}
</style>
