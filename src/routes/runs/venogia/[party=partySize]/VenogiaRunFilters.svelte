<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RunRules from '../../RunRules.svelte';

	export let solo: boolean;

	const partyLinks = [
		{ link: '/runs/venogia/solo', label: 'Solo' },
		{ link: '/runs/venogia/duo', label: 'Duo' },
		{ link: '/runs/venogia/party', label: 'Party' },
	];
	const rules = ['Do not abuse bugs or exploits.'];
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 px-4 py-2">
			<PartySizeNavigation parties={partyLinks} />
		</div>
	</div>

	<Divider slim />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal classFilter={solo} />
		</div>
		<div class="m-1 md:flex-initial">
			<RunRules {rules} />
		</div>
	</div>

	<Divider slim />

	<div class="flex flex-row gap-2 px-1">
		<RunFilterTags />
	</div>
</div>
