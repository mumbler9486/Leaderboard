<script lang="ts">
	export let maxlength: number;
	export let placeholder: string = '';
	export let value: string | undefined;
</script>

<textarea class="textarea textarea-bordered h-24 w-full" {placeholder} {maxlength} bind:value />
