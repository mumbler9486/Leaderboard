<script lang="ts">
	interface Props {
		slim?: boolean;
	}

	let { slim = false }: Props = $props();
</script>

<div class="divider" class:-mx-1={slim} class:my-0={slim}></div>
