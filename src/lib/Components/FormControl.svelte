<script lang="ts">
	export let label: string;
	export let error: string = '';
</script>

<div class="form-control">
	<div class="label">
		<span class="label-text text-base font-semibold">{label}</span>
	</div>
	<slot />
	<div class="text-error">
		{error}
	</div>
</div>
