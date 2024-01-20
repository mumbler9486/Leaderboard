<script lang="ts">
	import type { ComponentType } from 'svelte';
	import AlertInfoIcon from './Icons/AlertInfoIcon.svelte';
	import AlertSuccessIcon from './Icons/AlertSuccessIcon.svelte';
	import AlertWarningIcon from './Icons/AlertWarningIcon.svelte';
	import AlertErrorIcon from './Icons/AlertErrorIcon.svelte';

	export let type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default';
	export let message: string;

	const alertIcons: Record<typeof type, ComponentType> = {
		info: AlertInfoIcon,
		success: AlertSuccessIcon,
		warning: AlertWarningIcon,
		error: AlertErrorIcon,
		default: AlertInfoIcon,
	};
</script>

<div
	role="alert"
	class="alert"
	class:alert-info={type === 'info'}
	class:alert-success={type === 'success'}
	class:alert-warning={type === 'warning'}
	class:alert-error={type === 'error'}
>
	<svelte:component this={alertIcons[type]} />
	<span>{message}</span>
</div>
