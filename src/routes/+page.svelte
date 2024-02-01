<script lang="ts">
	import HomeFooter from '$lib/components/home/HomeFooter.svelte';
	import NewsletterSection from '$lib/components/home/NewsletterSection.svelte';
	import Navbar from '$lib/components/home/Navbar.svelte';
	import rocket from '$lib/assets/temp3.png';
	import OpportunitySection from '$lib/components/home/OpportunitySection.svelte';
	import { blur, fly } from 'svelte/transition';
	import AnimateWrapper from '$lib/components/general/AnimateWrapper.svelte';
	import { backOut } from 'svelte/easing';
	import SponsorSection from '$lib/components/home/SponsorSection.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
	<script src="//embed.typeform.com/next/embed.js"></script>
</svelte:head>

<div class="page">
	<Navbar />
	<div id="bg1" />
	<div class="landing">
		<div class="landing-content">
			<div class="intro">
				<AnimateWrapper>
					<h1 in:blur={{ delay: 0, duration: 1000 }}>UBC Launch Pad</h1>
				</AnimateWrapper>
				<span in:blur={{ delay: 0, duration: 1000 }}>
					A student-run software engineering team devoted to building software projects in a
					collaborative and professional environment
				</span>
				<!-- <button
					class="apply-btn"
					data-tf-slider="ICda8O8x"
					data-tf-position="right"
					data-tf-opacity="100"
					data-tf-iframe-props="title=Launch Pad Term 2 Recruitment"
					data-tf-transitive-search-params						
					data-tf-medium="snippet">
					We are recruiting! Apply byDecember 31, 2023
				</button> -->
			</div>

			<div class="hero">
				<AnimateWrapper>
					<img
						src={rocket}
						alt="hero"
						in:fly={{
							y: 100,
							delay: 300,
							easing: backOut
						}}
					/>
				</AnimateWrapper>
			</div>
		</div>
	</div>
	<div class="content">
		<OpportunitySection />
		<SponsorSection />
		<NewsletterSection />
	</div>
	<HomeFooter />
</div>

<style lang="scss">
	:global(*) {
		font-family: 'Exo', sans-serif;
		z-index: 3;
	}

	.apply-btn {
		margin-top: 1rem;
		background-color: var(--color-bg-primary);
		border: none;
		border-radius: 4px;
		color: white;
		cursor: pointer;
		font-size: 15px;
		font-weight: 500;
		height: 40px;
		letter-spacing: 0.5px;
		line-height: 40px;
		padding: 0 20px;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
		-webkit-appearance: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-bottom: 1rem;
		transition: background-color 0.25s ease-in-out;

		&:hover {
			background-color: var(--color-bg-secondary);
		}
	}

	:global(.annotate) {
		text-decoration: underline solid #95b8ff;
		-webkit-text-decoration: underline solid #95b8ff; /* Safari, older versions of Chrome */
		-moz-text-decoration: underline solid #95b8ff; /* Firefox */
		-o-text-decoration: underline solid #95b8ff; /* Opera */
		-ms-text-decoration: underline solid #95b8ff;
	}

	.landing {
		color: var(--color-text-2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100svh;
		max-height: 100svh;
		width: 100svw;
		flex: 1;
		position: relative;
	}
	.landing-content {
		color: var(--color-text-2);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100svw;
		height: 100%;
		//overflow: visible;
		position: relative;
		flex: 1;

		overflow: hidden;

		.intro {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			flex: 1;
			:global(*) {
				z-index: 3;
			}

			h1 {
				font-size: 3rem;
				font-weight: 600;
				text-align: left;
				margin-bottom: 1rem;
				z-index: 3;
				padding: 1rem;
				vertical-align: middle;
				height: 10rem;
				text-transform: uppercase;
			}

			span {
				font-size: 1.7rem;
				font-weight: 400;
				color: rgb(201, 201, 201);
				text-align: center;
				max-width: 550px;
				z-index: 3;
				backdrop-filter: blur(10px);
			}
		}

		.hero {
			margin: 0;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			height: 100%;
			z-index: 2;
			overflow: hidden;
			flex: 1;
			position: absolute;

			img {
				object-fit: contain;
				z-index: 2;
				width: 100%;
			}
		}
	}

	#bg1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100svw;
		height: 100svh;
		background-color: hsla(0, 0%, 5%, 1);
		background-image: radial-gradient(at 66% 17%, hsla(227, 92%, 17%, 0.14) 0px, transparent 50%),
			radial-gradient(at 80% 50%, hsla(340, 0%, 0%, 1) 0px, transparent 50%),
			radial-gradient(at 21% 30%, hsla(219, 50%, 54%, 0.4) 0px, transparent 50%),
			radial-gradient(at 56% 91%, hsla(240, 0%, 0%, 1) 0px, transparent 50%),
			radial-gradient(at 18% 8%, hsla(240, 100%, 24%, 0.56) 0px, transparent 50%),
			radial-gradient(at 30% 98%, hsla(0, 0%, 0%, 0.91) 0px, transparent 50%),
			radial-gradient(at 20% 66%, hsla(201, 42%, 28%, 0.47) 0px, transparent 50%);
		opacity: 0.9;
	}
	.content {
		width: 100%;
		height: 100%;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		overflow: hidden;
	}

	.page {
		width: 100svw;
		min-height: 100svh;
		background-color: var(--color-black-1);
	}
</style>
