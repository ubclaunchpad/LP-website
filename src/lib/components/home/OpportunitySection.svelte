<script>
	import HomeSection from '$lib/components/home/HomeSection.svelte';
	import RoleSection from '$lib/components/home/RoleSection.svelte';
	import TeamWorkflow from '$lib/components/home/TeamWorkflow.svelte';
</script>

<HomeSection title="Opportunities" id="opportunities">
	<p slot="text">
		We are looking for students <span class="annotate">passionate about tech</span> with varying levels
		of experience to join our teams
	</p>

	<RoleSection />
</HomeSection>

<HomeSection title="Collaboration" id="collaboration">
	<p slot="text">
		At our core we value <span class="annotate"
			>building foundational relationships and collaborating</span
		> with each other
	</p>

	<TeamWorkflow />
</HomeSection>
