<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let modalID: string;

	export let filters = {};

	let allowedPatches = ['P60'];

	export function openRefresh() {
		if (filters.patch != null && allowedPatches.includes(filters.patch)) {
			document.getElementById('radio-patchFilter-' + filters.patch).checked = true;
		} else {
			document.getElementById('radio-patchFilter-60R').checked = true;
		}

		if (filters.server != null && (filters.server === 'global' || filters.server === 'japan')) {
			document.getElementById('radio-serverFilter-' + filters.server).checked = true;
		} else {
			document.getElementById('radio-serverFilter-none').checked = true;
		}
	}

	function evtFilters(patch, server) {
		dispatch('msgFiltersUpdate', {
			patch: patch,
			server: server
		});
	}
</script>

<input type="checkbox" id={modalID} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative max-w-4xl rounded">
		<div class="flex flex-row">
			<span class="flex-1 self-center text-3xl font-light md:text-4xl">Filters</span>
			<label
				for={modalID}
				class="btn-outline btn-secondary btn-square btn-sm btn flex-initial self-center rounded"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</label>
		</div>
		<div class="divider -mx-6" />

		<span
			class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
			>Patch</span
		>

		<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
			<label
				class="label w-[17rem] cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<span class="label-text text-neutral-content">Historical</span>
				<input
					type="radio"
					id="radio-patchFilter-P60"
					value="P60"
					name="radio-patchFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
				/>
			</label>

			<label
				class="label w-[17rem] cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<span class="label-text text-neutral-content">+60 Release</span>
				<input
					type="radio"
					id="radio-patchFilter-60R"
					value="60R"
					name="radio-patchFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
					checked
				/>
			</label>
			<!--
      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <span class="label-text text-neutral-content">Ultra Evolution Update (June 2023)</span> 
        <input type="radio" id="radio-patchFilter-J23" name="radio-patchFilter" class="radio radio-sm checked:bg-neutral-content rounded border-neutral-content/25" checked />
      </label>
-->
		</div>

		<div class="divider" />

		<span
			class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
			>Server</span
		>

		<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
			<label
				class="label w-[17rem] cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<span class="label-text text-neutral-content">No Filter</span>
				<input
					type="radio"
					id="radio-serverFilter-none"
					value="null"
					name="radio-serverFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
					checked
				/>
			</label>

			<label
				class="label w-[17rem] cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<img src="/icons/server/server-global.png" alt="Global" />
				<span class="label-text text-neutral-content">Global</span>
				<input
					type="radio"
					id="radio-serverFilter-global"
					value="global"
					name="radio-serverFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
				/>
			</label>

			<label
				class="label w-[17rem] cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<img src="/icons/server/server-japan.png" alt="Japan" />
				<span class="label-text text-neutral-content">Japan</span>
				<input
					type="radio"
					id="radio-serverFilter-japan"
					value="japan"
					name="radio-serverFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
				/>
			</label>
		</div>

		<div class="divider -mx-6" />
		<div class="modal-action justify-center md:justify-end">
			<label
				for={modalID}
				on:click={() => evtFilters(null, null)}
				class="btn-outline btn-secondary btn rounded md:btn-sm">Reset Filters</label
			>
			<label
				for={modalID}
				on:click={() =>
					evtFilters(
						document.querySelector('input[name="radio-patchFilter"]:checked').value,
						document.querySelector('input[name="radio-serverFilter"]:checked').value
					)}
				class="btn-outline btn-primary btn rounded md:btn-sm">Apply Filters</label
			>
		</div>
	</div>
</div>
