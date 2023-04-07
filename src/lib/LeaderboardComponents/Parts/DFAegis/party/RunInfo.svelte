<script lang="ts">
  var d = [];
  var player1 = {};
  var player2 = {};
  var player3 = {};
  var player4 = {};
  var player5 = {};
  var player6 = {};
  var player7 = {};
  var player8 = {};
  var submitter = {};

  export function openRunInfo(id) {
    let modal = document.getElementById("PurpleSolo_RunInfoModal");
    modal.classList.add("modal-open");
    reloadData(id);
  }

  function closeModal() {
    let modal = document.getElementById("PurpleSolo_RunInfoModal");
    modal.classList.remove("modal-open");
    d = [];
  }

  export async function reloadData(id) {
    d = [];
    player1 = {};
    player2 = {};
    player3 = {};
    player4 = {};
    player5 = {};
    player6 = {};
    player7 = {};
    player8 = {};
    submitter = {};
    var params = `?GetRunID=` + id;
    const response = await fetch("/ngs-api/DFAPartyRunInfo" + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    d = await response.json();
    d = d[0];
    player1 = d.p1;
    player2 = d.p2;
    player3 = d.p3;
    player4 = d.p4;
    player5 = d.p5;
    player6 = d.p6;
    player7 = d.p7;
    player8 = d.p8;
    submitter = d.s;
    generateMainName(player1);
    generateMainName(player2);
    generateMainName(player3);
    generateMainName(player4);
    generateMainName(player5);
    generateMainName(player6);
    generateMainName(player7);
    generateMainName(player8);
    generateMainName(submitter);
    //console.log(submitter)
  }

  function generateMainName(player) {
    if (player.PlayerID == submitter.PlayerID) {
      player.RunCharacterName = player.CharacterName;
    }
    switch (player.PreferredName) {
      // Main Character Name
      case "1":
        player.NameOut1 = player.CharacterName;
        player.NameOut2 = player.RunCharacterName;
        break;
      // Run Character Name
      case "2":
        player.NameOut1 = player.RunCharacterName;
        player.NameOut2 = player.PlayerName;
        break;
      // Player Name
      default:
        player.NameOut1 = player.PlayerName;
        player.NameOut2 = player.RunCharacterName;
        break;
    }
    if (player.PlayerID != ("106" || "107")) {
      player.CSS = `font-weight: bold; `;
      switch (player.NameType) {
        case "1":
          player.CSS += `color: #` + player.NameColor1 + `;`;
          break;
        case "2":
          player.CSS +=
            `background: -webkit-linear-gradient(0deg, #` +
            player.NameColor1 +
            `, #` +
            player.NameColor2 +
            `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
          break;
        case "3":
          player.CSS +=
            `color: #` +
            player.NameColor2 +
            `; text-shadow: 0px 0px 5px #` +
            player.NameColor1 +
            `, 0px 0px 5px #` +
            player.NameColor1 +
            `, 0px 0px 5px #` +
            player.NameColor1 +
            `;`;
          break;
        default:
          break;
      }
      player.CSS += `cursor: pointer;`;
    } else {
      player.CSS = ``;
    }

    return player.CSS;
  }
</script>

<div class="modal" id="PurpleSolo_RunInfoModal">
  <div class="modal-box relative max-h-full max-w-6xl rounded">
    <div class="flex flex-row">
      <span class="flex-1 self-center text-3xl font-light md:text-4xl"
        >Run Information</span
      >
      <label
        on:click={closeModal}
        class="btn-outline btn-secondary btn-square btn-sm btn flex-initial self-center rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </label>
    </div>
    <div class="divider -mx-6" />
    <div class="widget-discord max-h-[20rem] overflow-auto md:max-h-[44rem]">
      {#if d.shared !== undefined}
        <div class="flex grow flex-col gap-1">
          <div
            class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
          >
            <div
              class="flex flex-col place-content-center text-center md:flex-row md:flex-wrap"
            >
              <span class="basis-full text-lg font-semibold"
                ><i class="bi bi-youtube" /> POV Link(s):</span
              >
              {#if player1.LinkPOV}
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player1.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player1.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player1.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player2.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player2.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player2.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player2.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player3.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player3.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player3.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player3.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player4.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player4.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player4.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player4.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player5.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player5.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player5.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player5.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player6.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player6.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player6.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player6.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player7.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player7.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player7.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player7.LinkPOV}</a
                  >
                </span>
              {/if}

              {#if player8.LinkPOV}
                <div class="divider m-0" />
                <span class="flex basis-1/2 flex-col">
                  <span class="inline place-self-center"
                    >{player8.NameOut1}</span
                  >
                  <a
                    class="link-primary link"
                    href={player8.LinkPOV}
                    target="_blank"
                    rel="noreferrer noopener">{player8.LinkPOV}</a
                  >
                </span>
              {/if}
            </div>
          </div>
          <div class="flex flex-col gap-2 p-2 md:flex-row md:gap-0">
            <div
              class="flex basis-full flex-col justify-center md:flex-row md:flex-wrap"
            >
              <p class="flex basis-full place-content-center">Run By:</p>
              <span class="basis-1/2">
                {#if player1.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      style={player1.CSS}
                      class="inline place-self-center"
                      href="/users?id={player1.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener">{player1.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player1.CSS} class="flex place-content-center">
                    {player1.NameOut1}
                  </p>
                {/if}
                {#if player1.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player1.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player2.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player2.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player2.CSS}
                      class="inline place-self-center">{player2.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player2.CSS} class="flex place-content-center">
                    {player2.NameOut1}
                  </p>
                {/if}
                {#if player2.NameOut1 !== player2.NameOut2 && player2.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player2.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player3.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player3.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player3.CSS}
                      class="inline place-self-center">{player3.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player3.CSS} class="flex place-content-center">
                    {player3.NameOut1}
                  </p>
                {/if}
                {#if player3.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player3.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player4.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player4.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player4.CSS}
                      class="inline place-self-center">{player4.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player4.CSS} class="flex place-content-center">
                    {player4.NameOut1}
                  </p>
                {/if}
                {#if player4.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player4.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player5.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player5.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player5.CSS}
                      class="inline place-self-center">{player5.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player5.CSS} class="flex place-content-center">
                    {player5.NameOut1}
                  </p>
                {/if}
                {#if player5.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player5.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player6.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player6.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player6.CSS}
                      class="inline place-self-center">{player6.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player6.CSS} class="flex place-content-center">
                    {player6.NameOut1}
                  </p>
                {/if}
                {#if player6.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player6.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player7.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player7.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player7.CSS}
                      class="inline place-self-center">{player7.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player7.CSS} class="flex place-content-center">
                    {player7.NameOut1}
                  </p>
                {/if}
                {#if player7.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player7.NameOut2})
                  </p>
                {/if}
              </span>
              <div class="divider m-0" />
              <span class="basis-1/2">
                {#if player8.PlayerID !== ("106" || "107")}
                  <p class="flex place-content-center">
                    <a
                      href="/users?id={player8.PlayerID}"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={player8.CSS}
                      class="inline place-self-center">{player8.NameOut1}</a
                    >
                  </p>
                {:else}
                  <p style={player8.CSS} class="flex place-content-center">
                    {player8.NameOut1}
                  </p>
                {/if}
                {#if player8.PlayerID !== ("106" || "107")}
                  <p
                    class="flex place-content-center text-sm text-base-content/50 md:ml-1"
                  >
                    ({player8.NameOut2})
                  </p>
                {/if}
              </span>
            </div>

            <div class="flex basis-full flex-col justify-center">
              <p class="flex place-content-center">Submitted By:</p>
              {#if submitter.PlayerID !== ("106" || "107")}
                <p class="flex place-content-center">
                  <a
                    href="/users?id={submitter.PlayerID}"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={submitter.CSS}
                    class="inline place-self-center">{submitter.NameOut1}</a
                  >
                </p>
              {:else}
                <p style={submitter.CSS} class="flex place-content-center">
                  {submitter.NameOut2}
                </p>
              {/if}
            </div>
          </div>
          <div class="flex grow flex-col gap-1 md:flex-row">
            {#if d.shared.Notes}
              <div
                class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
              >
                <div class="flex grow flex-col">
                  <span class="text-center text-lg font-semibold"
                    >Runner's Notes:</span
                  >
                  <div class="whitespace-pre-wrap p-2">{d.shared.Notes}</div>
                </div>
              </div>
            {/if}
            {#if d.shared.ModNotes}
              <div
                class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
              >
                <div class="flex grow flex-col">
                  <span class="text-center text-lg font-semibold"
                    >Moderator's Notes:</span
                  >
                  <div class="whitespace-pre-wrap p-2">{d.shared.ModNotes}</div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <div
          class="flex basis-full flex-col place-content-center place-items-center gap-1"
        >
          Loading - Please Wait...<br /><progress
            class="progress progress-primary w-56 border border-neutral-content/20"
          />
        </div>
      {/if}
    </div>
    <div class="divider -mx-6" />
    <div class="modal-action">
      <label
        on:click={closeModal}
        class="btn-outline btn-secondary btn rounded md:btn-sm">Close</label
      >
    </div>
  </div>
</div>

<style>
  .widget-discord::-webkit-scrollbar {
    width: 10px;
  }
  .widget-discord::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track-piece {
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 5px;
  }
  .widget-discord::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  .widget-discord::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
</style>
