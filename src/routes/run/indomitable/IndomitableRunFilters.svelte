<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { pageFilters } from '$lib/stores/indomitableFilterStore';
	import { t } from 'svelte-i18n';

	import Filters from './Filters.svelte';
	import IndomitableRules from './IndomitableRules.svelte';

	let augmentation: string = $page.url.searchParams.get('augs') ?? 'No Filter';
	let selectedClass: string = $page.url.searchParams.get('class') ?? 'No Filter';
	let selectedServer: string = $page.url.searchParams.get('server') ?? 'No Filter';

	const updateUrl = () => {
		if (selectedClass != 'No Filter') {
			$page.url.searchParams.set('class', selectedClass);
		}
		if (selectedClass == 'No Filter') $page.url.searchParams.delete('class');

		if (selectedServer != 'No Filter') {
			$page.url.searchParams.set('server', selectedServer);
		}
		if (selectedServer == 'No Filter') $page.url.searchParams.delete('server');

		if (augmentation != 'No Filter') {
			$page.url.searchParams.set('aug', augmentation);
		}
		if (augmentation == 'No Filter') $page.url.searchParams.delete('aug');

		goto($page.url);
		pageFilters.set({ class: selectedClass, server: selectedServer, augmentation: augmentation });
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<Dropdown
				id="drop-augmentations"
				label="Augmentations"
				options={[
					{ label: 'No Filter', value: 'No Filter' },
					{ label: 'Yes', value: 'Yes' },
					{ label: 'No', value: 'No' }
				]}
				bind:value={augmentation}
				on:change={updateUrl}
			/>
		</div>
		<div class="flex grow flex-col">
			<Dropdown id="drop-rank" label="Rank" options={[{ label: '1', value: 1 }]} />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<Filters bind:selectedClass bind:selectedServer on:applyFilters={updateUrl} />
		</div>
		<div class="m-1 md:flex-initial">
			<IndomitableRules />
		</div>
	</div>
</div>
