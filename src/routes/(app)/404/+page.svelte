<script lang="ts">
	import notFound from '$lib/assets/images/404.svg';
</script>

<div class="error">
	<h1>PAGE NOT FOUND</h1>
	dd
	<img src={notFound} alt="404" />
</div>

<style>
	.error {
		height: 100%;
		display: grid;
		place-content: center;
	}
</style>
