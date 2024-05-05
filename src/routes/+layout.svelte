<script>
	import './app.css';
	import './styles.scss';
	import './markdown.scss';
</script>

<div id="app-wrapper">
	<slot />
</div>

<style lang="scss">
	#app-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>
