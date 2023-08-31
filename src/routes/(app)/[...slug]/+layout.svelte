<script lang="ts">
	import FullPage from '$lib/components/layouts/FullPage.svelte';
	import DirectoryNavigation from '$lib/components/layouts/DirectoryNavigation.svelte';
	export let data;
</script>

<FullPage>
	<DirectoryNavigation directories={data.posts} slot="nav" />

	<article slot="main">
		{#key data.url}
			<div class="holder">
				<section class="blog">
					<slot />
				</section>
			</div>
		{/key}
	</article>
</FullPage>

<style lang="scss">
	.holder {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	article {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		align-items: center;
	}
	.blog {
		width: 100%;
		height: 100%;
		overflow: hidden;
		:global(p) {
			max-width: 800px;
		}
	}
</style>
