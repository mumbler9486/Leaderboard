<script lang="ts">
	import { t } from 'svelte-i18n';

	import AllNews from './AllNews.svelte';
</script>

<div class="flex flex-col content-center">
	<div class="container m-16 mx-auto rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 flex flex-col rounded-md border border-secondary bg-base-100 p-4 px-8">
			<div class="text-center text-4xl font-light">All News</div>
			<div class="flex flex-col items-center">
				<div class="flex max-w-4xl flex-col gap-2 pb-8">
					<AllNews />
				</div>
			</div>
		</div>
	</div>
</div>
