<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let link: string | undefined = undefined;

	const dispatcher = createEventDispatcher();

	$: buttonAction = link ? gotoLink : dispatchClick;

	const gotoLink = (e: MouseEvent) => {
		goto(link!);
	};

	const dispatchClick = (e: MouseEvent) => {
		dispatcher('click', e);
	};
</script>

<Button class="p-70" on:click={buttonAction}>
	{label}
</Button>
