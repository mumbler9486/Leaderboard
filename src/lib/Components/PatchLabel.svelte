<script lang="ts">
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';

	interface Props {
		code: string;
	}

	let { code }: Props = $props();
</script>

{patchCodeLabelMap[code] ?? 'Invalid Code'}
