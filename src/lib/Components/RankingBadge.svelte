<script lang="ts">
	export let rank: number;

	$: hasCrown = rank >= 1 && rank <= 3;
	$: crownImg = hasCrown ? crownImgs[rank - 1] : '';

	const crownImgs = [
		'/icons/leaderboard/gold-1.png',
		'/icons/leaderboard/silver-2.png',
		'/icons/leaderboard/bronze-3.png',
	];
</script>

{#if hasCrown}
	<img class="pointer-events-none inline w-[16px] max-w-none object-none" src={crownImg} alt="1" />
{:else}
	<span>{rank}</span>
{/if}
