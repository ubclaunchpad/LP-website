<script lang="ts">
	import notFound from '$lib/assets/images/404.svg';
</script>

<div class="error">
	<h1>PAGE NOT FOUND</h1>
	<a href="/">Take me home</a>
	<img src={notFound} alt="404" />
</div>

<style>
	h1 {
		font-size: 3rem;
		padding: 1rem 0;
	}
	.error {
		height: 100%;
		display: flex;
		place-content: center;
		flex-direction: column;
	}
	.error img {
		width: 100%;
	}
</style>
