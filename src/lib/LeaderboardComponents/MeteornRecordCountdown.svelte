<script lang="ts">
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { date } from "svelte-i18n";

  export let recordType: string;

  export let endDate: string;

  export let linkActive: boolean = false;

  var dateEnd = new Date(endDate).getTime();

  let recordID: string;
  let recordDescription: string;
  let recordLink: string;

  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  onMount(async () => {
    switch (recordType) {
      case "aegis-party":
        recordID = "dfa";
        recordDescription = `A Meteorn Record is in progress, with the goal of suppressing Dark Falz Aegis as a full multi-party!`;
        recordLink = "/run/dfa/party";
    }
  });

  const interval = setInterval(() => {
    var now = new Date().getTime();
    var distance = dateEnd - now;

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      clearInterval(interval);
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
  }, 1000);

  onDestroy(() => clearInterval(interval));
</script>

{#if recordID}
  {#if linkActive}
    <a
      href={recordLink}
      target="_blank"
      rel="noreferrer noopener"
      class="container alert mx-auto my-4 rounded-md border border-secondary bg-cover bg-[right_-12rem_bottom_0rem] shadow-lg md:bg-[length:60%] md:bg-[right_-1rem_bottom_-2rem]"
      style="background-image:url("/meteornrecords/{recordID}.png"); background-repeat: no-repeat;"
    >
      <div class="grow flex-col md:flex-row">
        {#if !(new Date().getTime() > dateEnd)}
          <div>
            <div
              class="text-2xl font-light text-warning"
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Attention All ARKS Defenders!
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              {recordDescription}
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Select the banner to go to the associated leaderboard!
            </div>
          </div>
        {:else}
          <div>
            <div
              class="text-2xl font-light text-error"
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              The large-scale operation has ended!
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Thank you for your support!
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Select the banner to go to the associated leaderboard!
            </div>
          </div>
        {/if}
        <div
          class="ml-0 grid auto-cols-max grid-flow-col gap-2 text-center md:ml-auto"
        >
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{days};" />
            </span>
            days
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{hours};" />
            </span>
            hours
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{minutes};" />
            </span>
            min
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{seconds};" />
            </span>
            sec
          </div>
        </div>
      </div>
    </a>
  {:else}
    <div
      class="container alert mx-auto my-4 rounded-md border border-secondary bg-cover bg-[right_-12rem_bottom_0rem] shadow-lg md:bg-[length:60%] md:bg-[right_-1rem_bottom_-2rem]"
      style="background-image:url("/meteornrecords/{recordID}.png"); background-repeat: no-repeat;"
    >
      <div class="grow flex-col md:flex-row">
        {#if !(new Date().getTime() > dateEnd)}
          <div>
            <div
              class="text-2xl font-light text-warning"
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Attention All ARKS Defenders!
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              {recordDescription}
            </div>
          </div>
        {:else}
          <div>
            <div
              class="text-2xl font-light text-error"
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              The large-scale operation has ended!
            </div>
            <div
              style="filter: drop-shadow(0 0 0.25rem black) drop-shadow(0 0 0.125rem black);"
            >
              Thank you for your support!
            </div>
          </div>
        {/if}
        <div class="ml-auto grid auto-cols-max grid-flow-col gap-2 text-center">
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{days};" />
            </span>
            days
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{hours};" />
            </span>
            hours
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{minutes};" />
            </span>
            min
          </div>
          <div
            class="flex flex-col rounded-md border border-secondary/50 bg-base-100/90 p-2 text-base-content"
          >
            <span class="countdown font-mono text-5xl">
              <span style="--value:{seconds};" />
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}
