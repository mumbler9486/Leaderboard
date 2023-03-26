<div>
	<div class="text-center text-4xl font-light">News</div>
	<div class="divider -mx-8" />
	<div class="text-center text-2xl font-medium">
		<slot name="newsTitle">
			<em>Loading news...</em>
		</slot>
	</div>
	<br />
	<slot name="newsContent">
		<em>Loading content...</em>
	</slot>
</div>
