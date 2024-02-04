<script lang="ts">
	import { browser } from '$app/environment';
	let play = false;
	let scrollY = 0;
	let element;

	$: if (browser) {
		if (element) {
			const top = element.getBoundingClientRect().top;
			// if div is in scroll view
			console.log('top', top);
			console.log('scroll', scrollY);
			console.log('window', window.innerHeight);

			play = top < scrollY + window.innerHeight;
		}
	}
</script>

<svelte:window bind:scrollY />

<div bind:this={element}>
	{#if play}
		<slot />
	{/if}
</div>

<style>
	div {
		display: unset;
		width: fit-content;
	}
</style>
