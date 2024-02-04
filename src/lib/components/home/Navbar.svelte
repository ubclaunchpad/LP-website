<nav>
	<ul>
		<li><a href="">About</a></li>
		<li><a href="#opportunities">Opportunities</a></li>
		<li><a href="#sponsors">Sponsors and Partners</a></li>
		<li><a href="#contact">Contact</a></li>
		<li>
			<a href="/docs" target="_blank" rel="noopener noreferrer"
				>Docs
				<!-- <span class="badge">Testing</span> -->
			</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	.badge {
		color: var(--color-bg-primary);
		padding: 0.25rem 0.4rem;
		border-radius: 0.2rem;
		font-size: 0.6rem;
		font-weight: 600;
		position: absolute;
		left: 80%;
		top: -10%;
		transform: translate(-50%, -50%);
	}
	nav {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: sticky;
		top: 0;
		padding: 1rem;
		width: 100%;
		z-index: 30;
		backdrop-filter: blur(7px);
		-webkit-backdrop-filter: blur(7px);
		border-bottom: 1px solid rgba(44, 44, 44, 0.42);

		@media (max-width: 768px) {
			display: none;
		}

		ul {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 5rem;
			width: 100%;

			li {
				list-style: none;
				font-size: 1rem;
				font-weight: 400;
				text-transform: uppercase;
				transition: all 0.2s ease-in-out;
				position: relative;
				cursor: pointer;
				:hover {
					color: var(--color-text-2);
				}
			}

			a {
				color: var(--color-text-2);
				text-decoration: none;
			}
		}
	}
</style>
