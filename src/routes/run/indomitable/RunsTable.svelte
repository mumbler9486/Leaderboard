<script lang="ts">
	import { page } from '$app/stores';
	import ClassIcon from '$lib/Components/ClassIcon.svelte';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';

	const fetchRuns = async () => {
		const params = $page.url.searchParams.toString();

		try {
			const response = await fetch('/ngs-api/indomitable' + params, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return await response.json();
		} catch (err) {
			console.error(err);
		}
	};

	type InGameTime = {
		hours: number;
		minutes: number;
		seconds: number;
	};
	const formatIgt = (time: any) => {
		let hours = time.hours == 0 ? `${time.hours}h` : '';
		return `${hours} ${time.minutes}m ${time.seconds}s`.trim();
	};
</script>

{#await fetchRuns()}
	<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
		Loading - Please Wait...<br />
		<progress class="progress progress-primary w-56 border border-neutral-content/20" />
	</div>
{:then runs}
	{#if runs == undefined || runs.length == 0}
		<span class="flex justify-center">There are no runs that match the selected filters.</span>
	{:else}
		<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
			<table class="table-zebra table-compact table w-full">
				<thead>
					<tr>
						<th class="w-2 bg-neutral text-center text-neutral-content">#</th>
						<th class="bg-neutral text-neutral-content">Player</th>
						<th class="bg-neutral text-center text-neutral-content">Main Class</th>
						<th class="bg-neutral text-center text-neutral-content">Sub-Class</th>
						<th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
						<th class="bg-neutral text-center text-neutral-content"
							>IGT <div
								class="tooltip tooltip-bottom tooltip-info font-semibold normal-case"
								data-tip="In-Game Time"
							>
								<i class="bi-question-circle ms-2" />
							</div></th
						>
						<th class="bg-neutral text-center text-neutral-content">Video</th>
						<th class="w-2 bg-neutral text-center text-neutral-content" />
					</tr>
				</thead>
				<tbody>
					{#each runs as run}
						<tr class="hover border-t border-t-secondary/20">
							<td class="text-center font-bold">{run.rank}</td>
							<td class=" font-bold">{run.playerName}</td>
							<td class="text-center">
								<ClassIcon combatClass={run.mainClass.toLowerCase()} showLabel />
							</td>
							<td class="text-center">
								<ClassIcon combatClass={run.subClass.toLowerCase()} showLabel />
							</td>
							<td class="text-center">
								{#each run.weapons as weapon}
									<div class="inline w-[16px] object-none">
										<WeaponIcon weapon={weapon.toLowerCase()} />
									</div>
								{/each}
							</td>
							<td class="text-center">{formatIgt(run.time)}</td>
							<td class="text-center">
								<a
									href={run.videoUrl}
									target="_blank"
									rel="noreferrer noopener"
									class="link-accent link no-underline"><i class="bi bi-youtube" /> Link</a
								>
							</td>
							<td class="text-center">
								{#if run.notes != undefined}
									<i class="bi bi-sticky" />
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{:catch error}
	<span class="flex justify-center">An error has occured. Please try again later.</span>
{/await}
