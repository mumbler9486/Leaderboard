<script context="module" lang="ts">
	export type ButtonModifier =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| 'ghost'
		| 'link'
		| 'outline'
		| 'active'
		| 'disabled'
		| 'default';

	export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs' | 'default';
</script>

<script lang="ts">
	// 1. Define the Props Interface
	interface Props {
		modifier: ButtonModifier;
		loading?: boolean;
		href?: string | null;
		size?: ButtonSize;
		disabled?: boolean;
		wide?: boolean;
		block?: boolean;
		circle?: boolean;
		square?: boolean;
	}

	// 2. Use $props() to get typed props
	const {
		modifier = 'default',
		loading = false,
		href = null,
		size = 'default',
		disabled = false,
		wide = false,
		block = false,
		circle = false,
		square = false
	}: Props = $props();

	const btnClasses: Record<ButtonModifier, string> = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		neutral: 'btn-neutral',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error',
		ghost: 'btn-ghost',
		link: 'btn-link',
		outline: 'btn-outline',
		active: 'btn-active',
		disabled: 'btn-disabled',
		default: ''
	};

	const sizeClasses: Record<ButtonSize, string> = {
		lg: 'btn-lg',
		md: 'btn-md',
		sm: 'btn-sm',
		xs: 'btn-xs',
		default: ''
	};
</script>

{#if href}
	<a class="btn {btnClasses[modifier]} {sizeClasses[size]}" class:loading {href}>
		<slot />
	</a>
{:else}
	<button
		class="btn {btnClasses[modifier]} {sizeClasses[size]}"
		class:loading
		class:btn-disabled={disabled}
		class:btn-wide={wide}
		class:btn-block={block}
		class:btn-circle={circle}
		class:btn-square={square}
		{disabled}
		on:click
	>
		<slot />
	</button>
{/if}
