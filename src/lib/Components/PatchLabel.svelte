<script lang="ts">
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';

	export let code: string;
</script>

{patchCodeLabelMap[code] ?? 'Invalid Code'}
