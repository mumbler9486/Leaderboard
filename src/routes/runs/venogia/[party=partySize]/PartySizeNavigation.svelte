<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Components/Button.svelte';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';

	const highlightClass = 'btn-primary';

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSoloFocused = partySize == PartySize.Solo ? highlightClass : '';
	$: isDuoFocused = partySize == PartySize.Duo ? highlightClass : '';
	$: isPartyFocused = partySize == PartySize.Party ? highlightClass : '';

	const linkClick = (href: string) => {
		goto(href);
	};
</script>

<Button class={isSoloFocused} on:click={() => linkClick('/runs/venogia/solo')}>Solo</Button>
<Button class={isDuoFocused} on:click={() => linkClick('/runs/venogia/duo')}>Duo</Button>
<Button class={isPartyFocused} on:click={() => linkClick('/runs/venogia/party')}>Party</Button>
