<script lang="ts">
	interface Props {
		size: number | undefined;
	}

	let { size }: Props = $props();

	const mapPartySizeName = (size: number) => {
		if (size == 1) {
			return 'Solo';
		}
		if (size == 2) {
			return 'Duo';
		}
		if (size > 2) {
			return 'Party';
		}
		return 'Invalid';
	};

	let sizeLabel = $derived(mapPartySizeName(size ?? -1));
</script>

{sizeLabel}
