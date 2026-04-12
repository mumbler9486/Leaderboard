<script lang="ts">
	import type { ComponentType } from 'svelte';
	import AlertInfoIcon from './icons/AlertInfoIcon.svelte';
	import AlertSuccessIcon from './icons/AlertSuccessIcon.svelte';
	import AlertWarningIcon from './icons/AlertWarningIcon.svelte';
	import AlertErrorIcon from './icons/AlertErrorIcon.svelte';

	interface Props {
		type?: 'info' | 'success' | 'warning' | 'error' | 'default';
		message: string;
	}

	let { type = 'default', message }: Props = $props();

	const alertIcons: Record<typeof type, ComponentType> = {
		info: AlertInfoIcon,
		success: AlertSuccessIcon,
		warning: AlertWarningIcon,
		error: AlertErrorIcon,
		default: AlertInfoIcon,
	};

	const SvelteComponent = $derived(alertIcons[type]);
</script>

<div
	role="alert"
	class="alert"
	class:alert-info={type === 'info'}
	class:alert-success={type === 'success'}
	class:alert-warning={type === 'warning'}
	class:alert-error={type === 'error'}
>
	<SvelteComponent />
	<span>{message}</span>
</div>
