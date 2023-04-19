<script lang="ts">
	export let tip: string;
	export let bottom: boolean = false;
</script>

<div
	class="tooltip tooltip-info font-semibold normal-case"
	class:tooltip-bottom={bottom}
	data-tip={tip}
>
	<i class="bi-question-circle ms-2" />
</div>
