<script lang="ts">
	import Fullpage from '$lib/components/layouts/Fullpage.svelte';
	import './styles.scss';
	import './markdown.scss';
	import DirectoryNavigation from '$lib/components/Navigation/DirectoryNavigation.svelte';
	export let data;
</script>

<Fullpage>
	<DirectoryNavigation {data} slot="nav" />
	<article>
		<section class="blog">
			<slot />
		</section>
	</article>
</Fullpage>

<style lang="scss">
	article {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		align-items: center;
	}
	.blog {
		overflow-y: scroll;
		width: 100%;
		height: 100%;
		:global(p) {
			max-width: 800px;
		}
	}
</style>
