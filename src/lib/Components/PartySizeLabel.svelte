<script lang="ts">
	export let size: number | undefined;

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

	$: sizeLabel = mapPartySizeName(size ?? -1);
</script>

{sizeLabel}
