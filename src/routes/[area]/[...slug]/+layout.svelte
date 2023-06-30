<article>
	<section class="blog">
		<slot />
	</section>
</article>

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
