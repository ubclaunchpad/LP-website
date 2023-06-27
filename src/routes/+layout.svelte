<script lang="ts">
	import Fullpage from '$lib/components/layouts/Fullpage.svelte';
	import './styles.scss';
	import './markdown.scss';
	import DirectoryNavigation from '$lib/components/Navigation/DirectoryNavigation.svelte';
	export let data;
</script>

<Fullpage>
	<DirectoryNavigation {data} slot="nav" />
	<slot />
</Fullpage>
