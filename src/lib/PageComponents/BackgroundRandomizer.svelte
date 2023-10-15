<script lang="ts">
	import { page } from '$app/stores';
	import WallpaperImage from '$lib/Components/WallpaperImage.svelte';
	import { onMount } from 'svelte';

	let wallpaper: Wallpaper | null = null;
	let upcomingWallpaper: Wallpaper | null = null;

	interface Wallpaper {
		src: string;
		thumb: string; // 40% blur, then compressed
	}

	const backgrounds: Wallpaper[] = [
		{
			src: '/background/aelio-purp-evening.jpg',
			thumb: '/background/thumb/aelio-purp-evening-min.jpg'
		},
		{
			src: '/background/aelio-purp-night.jpg',
			thumb: '/background/thumb/aelio-purp-night-min.jpg'
		},
		{ src: '/background/aelio-purp.jpg', thumb: '/background/thumb/aelio-purp-min.jpg' },
		{ src: '/background/dfsolus_portal.jpg', thumb: '/background/thumb/dfsolus_portal-min.jpg' },
		{
			src: '/background/kvaris-purp-night.jpg',
			thumb: '/background/thumb/kvaris-purp-night-min.jpg'
		},
		{ src: '/background/kvaris-purp.jpg', thumb: '/background/thumb/kvaris-purp-min.jpg' },
		{
			src: '/background/retem-purp-night.jpg',
			thumb: '/background/thumb/retem-purp-night-min.jpg'
		},
		{ src: '/background/retem-purp.jpg', thumb: '/background/thumb/retem-purp-min.jpg' },
		{ src: '/background/stia-purp-night.jpg', thumb: '/background/thumb/stia-purp-night-min.jpg' },
		{ src: '/background/stia-purp.jpg', thumb: '/background/thumb/stia-purp-min.jpg' },
		{ src: '/background/venogia.jpg', thumb: '/background/thumb/venogia-min.jpg' }
	];

	const wallpaperSetsMap: { route: string; wallpapers: Wallpaper[] }[] = [
		{ route: '/', wallpapers: backgrounds }
	];

	// Selects one Random wallpaper from the list
	// Assumes wallpaper and upcomingWallpaper are intialized
	const randomizeWallpaper = (wallpaperSet: Wallpaper[]) => {
		wallpaper = upcomingWallpaper!;
		upcomingWallpaper = getNextWallpaper(wallpaperSet, upcomingWallpaper!);
	};

	/**
	 * Picks one wallpaper from the set
	 * Set currentWallpaper to not pick the same wallpaper from the set
	 */
	const getNextWallpaper = (wallpaperSet: Wallpaper[], currentWallpaper?: Wallpaper) => {
		const wallpapersNext = wallpaperSet.filter((w) => w.src !== currentWallpaper?.src);
		const next = wallpapersNext[randInt(wallpapersNext.length)];
		return next;
	};

	onMount(() => {
		wallpaper = getNextWallpaper(getWallpaperSet());
		upcomingWallpaper = getNextWallpaper(getWallpaperSet(), wallpaper);
		startWallpaperSlideshow();
	});

	const getWallpaperSet = () => {
		const pathname = $page.url.pathname;
		const wallpaperSet =
			wallpaperSetsMap.find((w) => pathname.startsWith(w.route))?.wallpapers ?? backgrounds;

		return wallpaperSet;
	};

	// Runs a wallpaper slideshow
	const updateInterval = 1000 * 60 * 10;
	let nextWallPaperUpdate: NodeJS.Timeout;
	const startWallpaperSlideshow = () => {
		if (!!nextWallPaperUpdate) {
			clearTimeout(nextWallPaperUpdate);
		}
		nextWallPaperUpdate = setInterval(() => randomizeWallpaper(getWallpaperSet()), updateInterval);
	};

	// Generates a number between 0 and high-1 inclusive
	const randInt = (high: number) => Math.floor(high * Math.random());
</script>

{#if !!wallpaper}
	{#key wallpaper}
		<WallpaperImage
			thumb={wallpaper.thumb}
			src={wallpaper.src}
			alt="Background"
			loading="eager"
			decoding="async"
		/>
	{/key}
{/if}
<img
	src={upcomingWallpaper?.thumb}
	class="hidden"
	loading="eager"
	decoding="async"
	alt="Preload Background Thumbnail"
	role="presentation"
/>
