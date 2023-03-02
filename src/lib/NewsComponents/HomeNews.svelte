<div>
    <div class="text-4xl font-light text-center">News</div>
    <div class="divider -mx-8"></div>
    <div class="text-2xl font-medium text-center">
        <slot name="newsTitle">
            <em>Loading news...</em>
        </slot>
    </div>
    <br>
    <slot name="newsContent">
        <em>Loading content...</em>
    </slot>
</div>