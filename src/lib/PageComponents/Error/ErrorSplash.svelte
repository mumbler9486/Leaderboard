<script lang="ts">
	export let status: number;
	export let message: string;

	interface ErrorContent {
		key: string;
		image: string;
		alt: string;
		caption: string;
	}

	const errorContents: ErrorContent[] = [
		{
			key: 'HelvianSnoruq',
			image: '/error/helvian-snoruq.jpg',
			alt: 'Helvian facing off a Malevolent Snoruq.',
			caption: 'Screenshot by Helvian',
		},
		{
			key: 'HelvianBall',
			image: '/error/helvian-bujin.jpg',
			alt: 'Helvian, short, next to Bujin, tall.',
			caption: 'Screenshot by Helvian',
		},
		{
			key: 'HelvianBujin',
			image: '/error/helvian-ball.jpg',
			alt: 'Helvian, incapacitated next to a cannonball.',
			caption: 'Screenshot by Helvian',
		},
		{
			key: 'HelvianSlots',
			image: '/error/helvian-rappyslots.jpg',
			alt: 'Helvian, attacking rappy slots with a large hammer.',
			caption: 'Screenshot by Helvian',
		},
		{
			key: 'KaistaraNogleth',
			image: '/error/kaistara-nogleth.jpg',
			alt: 'Kaistara and company fighting a Nogleth.',
			caption: 'Screenshot by Kaistara',
		},
		{
			key: 'ZoutaAms',
			image: '/error/zouta-ams.jpg',
			alt: 'Zouta facing off Ams Kvaris.',
			caption: 'Screenshot by Zouta',
		},

		{
			key: 'ZoutaNex',
			image: '/error/zouta-nex.jpg',
			alt: 'Zouta staring down a Nex Aelio.',
			caption: 'Screenshot by Zouta',
		},

		{
			key: 'ZoutaRenus',
			image: '/error/zouta-renus.jpg',
			alt: 'Zouta incapacitated by Renus Retem.',
			caption: 'Screenshot by Zouta',
		},
		{
			key: 'SukeboyKaiby',
			image: '/error/sukeboy-kaiby.jpg',
			alt: 'Sukeboy in a Kaiby look with a gun.',
			caption: 'Screenshot by Kat',
		},
		{
			key: 'SukeboyRonaldine',
			image: '/error/sukeboy-ronaldinesoccer.jpg',
			alt: 'Ronaldine playing soccer, drawn by Sukeboy.',
			caption: 'Art by Sukeboy',
		},
	];

	const randomPick = errorContents[(errorContents.length * Math.random()) | 0];
</script>

<div
	class="m-2 flex grow flex-col items-center rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-row"
>
	<div class="hidden md:block md:w-2/5 md:flex-col">
		<img class="pointer-events-none" src={randomPick.image} alt={randomPick.alt} />
		<div class="text-center text-secondary">{randomPick.caption}</div>
	</div>
	<div class="flex grow flex-col place-content-center">
		<p class="text-center text-8xl font-light">{status}</p>
		<p class="text-center text-4xl font-light">{message}</p>
		{#if randomPick.key === 'HelvianSnoruq'}
			<div class="mb-2 mt-4 text-center">
				Consider rolling back to the <a class="link link-primary" href="/">Home</a> page!
			</div>
		{:else if randomPick.key === 'HelvianBall'}
			<div class="mb-2 mt-4 text-center">
				We came up short while looking for this page.<br />Why not head
				<a class="link link-primary" href="/">Home</a>?
			</div>
		{:else if randomPick.key === 'HelvianBujin'}
			<div class="mb-2 mt-4 text-center">
				Don't drop the ball!<br />Restart and head <a class="link link-primary" href="/">Home</a>?
			</div>
		{:else if randomPick.key === 'HelvianSlots'}
			<div class="mb-2 mt-4 text-center">
				<strong>Jackpot!</strong><br />Someone just won big at slots!<br /><a
					class="link link-primary"
					href="/">Spin again</a
				>?
			</div>
		{:else if randomPick.key === 'KaistaraNogleth'}
			<div class="mb-2 mt-4 text-center">
				Our party couldn't find that page!<br />Try searching on the
				<a class="link link-primary" href="/">Home</a> page!
			</div>
		{:else if randomPick.key === 'ZoutaAms'}
			<div class="mb-2 mt-4 text-center">
				"Oh, you're approaching me?"<br />"I can't go back to the
				<a class="link link-primary" href="/">Home</a> page without getting closer."
			</div>
		{:else if randomPick.key === 'ZoutaNex'}
			<div class="mb-2 mt-4 text-center">
				This page is about to have a blast.<br />Dodge to the
				<a class="link link-primary" href="/">Home</a> page?
			</div>
		{:else if randomPick.key === 'ZoutaRenus'}
			<div class="mb-2 mt-4 text-center">
				We dug around, but we couldn't find that page.<br />Revive in 5 seconds at the
				<a class="link link-primary" href="/">Home</a> page.
			</div>
		{:else if randomPick.key === 'SukeboyKaiby'}
			<div class="mt-4 text-center">
				You've encountered a Malevolent Kaibygun. What will you do?
			</div>
		{:else if randomPick.key === 'SukeboyRonaldine'}
			<div class="mt-4 text-center">HAHAHAHA, RONALDINE SOCCER!</div>
			<div class="mb-2 text-center">
				<a class="link link-primary" href="/"><strong>START</strong></a>
			</div>
		{/if}
	</div>
	<div class="md:hidden">
		<img class="pointer-events-none" src={randomPick.image} alt={randomPick.alt} />
		<div class="text-center text-secondary">{randomPick.caption}</div>
	</div>
</div>
