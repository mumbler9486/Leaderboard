<script lang="ts">
	interface Props {
		rank: number;
	}

	let { rank }: Props = $props();


	const crownImgs = [
		'/icons/leaderboard/gold-1.png',
		'/icons/leaderboard/silver-2.png',
		'/icons/leaderboard/bronze-3.png',
	];
	let hasCrown = $derived(rank >= 1 && rank <= 3);
	let crownImg = $derived(hasCrown ? crownImgs[rank - 1] : '');
</script>

{#if hasCrown}
	<img class="pointer-events-none inline w-[16px] max-w-none object-none" src={crownImg} alt="1" />
{:else}
	<span>{rank}</span>
{/if}
