<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
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
	export let modifier: ButtonModifier = 'default';
	export let loading: boolean = false;
	export let href: string | null = null;
	export let size: ButtonSize = 'default';
	export let disabled: boolean = false; //Not supported on link buttons
	export let wide: boolean = false;
	export let block: boolean = false;
	export let circle: boolean = false;
	export let square: boolean = false;

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
		default: '',
	};

	const sizeClasses: Record<ButtonSize, string> = {
		lg: 'btn-lg',
		md: 'btn-md',
		sm: 'btn-sm',
		xs: 'btn-xs',
		default: '',
	};
</script>

{#if href}
	<a class="btn {btnClasses[modifier]} {$$props.class} {sizeClasses[size]}" class:loading {href}>
		<slot />
	</a>
{:else}
	<button
		class="btn {btnClasses[modifier]} {$$props.class} {sizeClasses[size]}"
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
