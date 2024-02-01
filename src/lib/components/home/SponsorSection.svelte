<script>
	import HomeSection from '$lib/components/home/HomeSection.svelte';
	import TeamWorkflow from '$lib/components/home/TeamWorkflow.svelte';
	import Sponsors from '$lib/components/home/Sponsors.svelte';
</script>

<HomeSection title="Sponsors and Partners" id="sponsors">
	<p slot="text">
		We actively work with companies and non-profits to build software that aims to
		<span class="annotate">solve real-world problems</span>
	</p>
	<Sponsors />

	<!--	<p>-->
	<!--		These are some of the benefits of partnering with us.-->
	<!--		<span class="annotate">Contact us for more information</span>-->
	<!--	</p>-->
</HomeSection>
