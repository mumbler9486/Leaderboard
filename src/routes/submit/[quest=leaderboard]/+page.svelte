<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ServerRegionSelector from './options/ServerRegionSelector.svelte';
	import Alert from '$lib/Components/Alert.svelte';
	import PartyOptions from './options/PartyOptions.svelte';
	import SubmitFinish from '../SubmitFinish.svelte';
	import TextArea from '$lib/Components/TextArea.svelte';
	import CategoryOptions from './options/CategoryOptions.svelte';
	import RankOptions from './options/RankOptions.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import RunOptions from './options/RunOptions.svelte';
	import RunTimeInput from './options/RunTimeInput.svelte';
	import PartySizeOptions from './options/PartySizeOptions.svelte';

	import { t } from 'svelte-i18n';
	import { partyForm } from './partyForm';
	import { ErrorCodes, type BadRequestApiError } from '$lib/types/api/error';
	import { allLeaderboards } from '$lib/leaderboard/boards';
	import { page } from '$app/stores';
	import { runForm } from './runForm';
	import { submitRun } from './submit';
	import { questForm } from './questForm';
	import { onMount } from 'svelte';
	import { mapCategoryToRoute } from '../../../params/category';

	let submitting: boolean = false;
	let serverErrorMessage: string | undefined = undefined;
	let submitFinish = false;

	$: quest = $page.params.quest;
	$: boards = allLeaderboards.filter((b) => b.quest === quest);
	$: currentBoard =
		allLeaderboards.find((b) => b.quest === quest && b.category === $questForm.category) ??
		boards[0];
	$: mainBoard = boards[0];

	runForm.reset();
	partyForm.setPartySize(1);
	onMount(() => {
		$questForm.category = boards[0].category;
		$questForm.questRank = boards.reduce(
			(max, board) => (board.maxQuestRank > max ? board.maxQuestRank : max),
			1
		);
	});

	async function submitRunToApi() {
		if (submitting) {
			return;
		}

		try {
			serverErrorMessage = undefined;
			submitting = true;
			const category = mapCategoryToRoute($questForm.category);
			const submitPath = `/ngs-api/runs/${mainBoard.route}/${category}`;
			const response = await submitRun<unknown>(
				submitPath,
				mainBoard.quest,
				$questForm.category,
				$questForm.questRank
			);

			// Success, done
			if (response.hasOwnProperty('success')) {
				submitFinish = true;
				return;
			}

			// Process error
			const responseError = response as BadRequestApiError;
			if (responseError.code == ErrorCodes.ValidationError) {
				serverErrorMessage = responseError.details?.[0].message;
			} else if (responseError.code == ErrorCodes.Unexpected) {
				serverErrorMessage = 'Unexpected error, please contact site admin.';
			}
		} catch (err) {
			serverErrorMessage = 'Unexpected error, please contact site admin.';
			console.error(err);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Submit a Run</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<div class="text-center text-4xl font-light">Submit a Run</div>
			<div class="divider -mx-8" />
			{#if submitFinish}
				<SubmitFinish />
			{:else}
				<div id="submitForm" on:submit|preventDefault={submitRunToApi}>
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="text-center text-xl font-semibold">{$t(mainBoard.name)}</div>
						<Divider />
						<div class="text-center text-lg font-semibold">Information</div>
						<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
							<ServerRegionSelector />
							<CategoryOptions allowedCategories={boards.map((b) => b.category)} />
							<RankOptions maxRank={currentBoard.maxQuestRank} />
							<CurrentPatchLabel />
						</div>
						<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
							<PartySizeOptions sizes={currentBoard.allowedPartySizes} />
							<RunTimeInput maxMinutes={Math.floor(currentBoard.maxSeconds / 60)} />
						</div>
						<div class="form-control">
							<RunOptions board={currentBoard} />
						</div>
					</div>
					<PartyOptions />
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="form-control">
							<label class="label" for="notes-form">
								<span class="label-text">Notes</span>
							</label>
							<TextArea
								maxlength={500}
								placeholder="(Optional) Type any notes, extra run information, or descriptions here!"
								bind:value={$runForm.notes}
							/>
						</div>
					</div>

					{#if serverErrorMessage}
						<Alert type="error" message={serverErrorMessage} />
					{/if}
					{#if submitting}
						<Alert type="info" message="Submitting - Please Wait..." />
						<div class="flex flex-col place-content-center place-items-center gap-1">
							Submitting - Please Wait...<br /><progress
								class="progress progress-primary w-56 border border-neutral-content/20"
							/>
						</div>
					{/if}
					<div class="grid grid-cols-1 text-center">
						<button
							disabled={submitting}
							class="btn btn-outline btn-success mt-4 w-1/2 justify-self-center"
							on:click={submitRunToApi}>Submit Run</button
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
