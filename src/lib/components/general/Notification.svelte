<script lang="ts">
	import type { INotification } from '$lib/types/INotification';
	import { fly } from 'svelte/transition';
	import { notificationStore } from '../../../stores/notification';
	let notification: INotification | undefined;
	let width = 0;

	notificationStore.subscribe((value) => {
		notification = value;
	});

	$: if (notification) {
		setTimeout(() => {
			notificationStore.set(undefined);
		}, notification.timeout || 5000);
	}

	const statusColours = {
		info: '#2196f3',
		success: '#4caf50',
		warning: 'var(--color-bg-0)',
		error: 'var(--color-bg-secondary)'
	};

	let color: string = statusColours.info;
	$: if (notification) {
		color = statusColours[notification.type];
	}
</script>

{#if notification}
	<div
		class="notificaiton-wrapper"
		in:fly|global={{ x: 1000, duration: 500 }}
		out:fly|global={{ x: width, duration: 600 }}
		bind:clientWidth={width}
	>
		<div class="notification" style={`background-color: ${color}`}>
			<h2>{notification.title}</h2>
			<p>{notification.message}</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.notificaiton-wrapper {
		position: fixed;
		top: 0;
		right: 0;
		min-width: 400px;
		width: fit-content;
		max-width: 100%;
		height: 100px;
		padding: 1rem;
		z-index: 10000;
		.notification {
			display: flex;
			flex-direction: column;
			border-radius: 4px;
			padding: 1rem;
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
			h2 {
				margin: 0;
				font-size: 0.9rem;
				padding-bottom: 0.5rem;
			}
			p {
				margin: 0;
				font-size: 0.8rem;
			}
		}
	}
</style>
