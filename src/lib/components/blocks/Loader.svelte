<script lang="ts">
	import { onMount } from 'svelte';
	export let height: string;
	export let width = '100%';

	onMount(() => {
		const bar = document.getElementById('loader-wrapper');
		if (bar === null) return;
		bar.style.height = height;
		bar.style.width = width;
	});
</script>

<div id="loader-wrapper">
	<div id="bar" />
</div>

<style lang="scss">
	#loader-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		background-color: var(--color-bg-3);
		position: relative;

		#bar {
			background: repeating-linear-gradient(120deg, var(--color-bg-2), var(--color-bg-0));
			height: 100%;
			position: absolute;
			background-size: 400% 100%;
			animation: AnimationName 2s ease-in-out infinite;
			width: 100%;
			animation-fill-mode: forwards;
			animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}

		@keyframes AnimationName {
			0% {
				background-position: 0 0;
			}
			50% {
				background-position: 100% 0;
			}
			100% {
				background-position: 0 0;
			}
		}
	}
</style>
