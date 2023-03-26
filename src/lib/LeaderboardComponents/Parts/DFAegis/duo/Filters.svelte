<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let modalID: string;

	export let filters = {};

	let allowedPatches = ['P60'];

	export function openRefresh() {
		if (filters.buff != null) {
			document.getElementById('radio-buffFilter-' + filters.buff).checked = true;
		} else {
			document.getElementById('radio-buffFilter-none').checked = true;
		}

		if (filters.server != null && (filters.server === 'global' || filters.server === 'japan')) {
			document.getElementById('radio-serverFilter-' + filters.server).checked = true;
		} else {
			document.getElementById('radio-serverFilter-none').checked = true;
		}
	}

	function evtFilters(buff, server) {
		dispatch('msgFiltersUpdate', {
			buff: buff,
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
				class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
			>
				<img src="/icons/dfa/nadereh.png" alt="Nadereh" />
				<span class="label-text text-neutral-content">Nadereh</span>
				<input
					type="radio"
					id="radio-buffFilter-nadereh"
					value="nadereh"
					name="radio-buffFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
				/>
			</label>

			<label
				class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
			>
				<img src="/icons/dfa/ainamanon.png" alt="Aina & Manon" />
				<span class="label-text text-neutral-content">Aina & Manon</span>
				<input
					type="radio"
					id="radio-buffFilter-ainamanon"
					value="ainamanon"
					name="radio-buffFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
				/>
			</label>

			<label
				class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
			>
				<img src="/icons/dfa/ilma.png" alt="Ilma" />
				<span class="label-text text-neutral-content">Ilma</span>
				<input
					type="radio"
					id="radio-buffFilter-ilma"
					value="ilma"
					name="radio-buffFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
				/>
			</label>

			<label
				class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
			>
				<img src="/icons/dfa/glen.png" alt="Glen" />
				<span class="label-text text-neutral-content">Glen</span>
				<input
					type="radio"
					id="radio-buffFilter-glen"
					value="glen"
					name="radio-buffFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
				/>
			</label>

			<label
				class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
			>
				<img src="/icons/class/class-unknown.png" alt="No Filter" />
				<span class="label-text text-neutral-content">No Filter</span>
				<input
					type="radio"
					id="radio-buffFilter-none"
					value="null"
					name="radio-buffFilter"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
					checked
				/>
			</label>
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
						document.querySelector('input[name="radio-buffFilter"]:checked').value,
						document.querySelector('input[name="radio-serverFilter"]:checked').value
					)}
				class="btn-outline btn-primary btn rounded md:btn-sm">Apply Filters</label
			>
		</div>
	</div>
</div>
