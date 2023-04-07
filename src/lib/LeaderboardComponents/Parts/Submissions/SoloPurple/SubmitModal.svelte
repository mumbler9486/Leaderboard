<script lang="ts">
  var d = {};
  var mainName;
  var cssOutputMain;
  var cssOutputSub;
  var mainName2;
  var subName;
  var videoCode;
  var embedHTML;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let processing = false;

  export function openRunInfo(data) {
    processing = false;
    let modal = document.getElementById("PurpleSolo_RunInfoModal");
    modal.classList.add("modal-open");
    reloadData(data);
  }

  function closeModal() {
    let modal = document.getElementById("PurpleSolo_RunInfoModal");
    modal.classList.remove("modal-open");
    d = {};
  }

  function closeModalUpdate() {
    let modal = document.getElementById("PurpleSolo_RunInfoModal");
    modal.classList.remove("modal-open");
    d = {};
    dispatch("refreshData", {
      Data: null,
    });
  }

  export async function reloadData(data) {
    d = data;
    subName = null;
    mainName = null;
    mainName2 = null;
    //console.log(d)
    cssOutputMain = generateMainName(
      d.PlayerID,
      d.PlayerPrefN,
      d.PlayerNameType
    );
    cssOutputSub = generateSubName(
      d.SubmitterID,
      d.SubmitterPrefN,
      d.SubmitterNameType
    );

    generateEmbedYoutube();
  }

  async function approveRun() {
    d.ModNotes = document.getElementById("modnote-form").value;
    d.ModNotes == "" ? (d.ModNotes = null) : null;
    processing = true;
    const response = await fetch("/ngs-api/ApproveRun?type=purplesolo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    });
    var complete = await response.json();
    //console.log(complete)
    if (complete.Code == "error") {
      processing = false;
    } else if (complete.Code == "success") {
      closeModalUpdate();
    }
  }

  async function denyRun() {
    d.ModNotes = document.getElementById("modnote-form").value;
    d.ModNotes == "" ? (d.ModNotes = null) : null;
    processing = true;
    const response = await fetch("/ngs-api/DenyRun?type=purplesolo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    });
    var complete = await response.json();
    //console.log(complete)
    if (complete.Code == "error") {
      processing = false;
    } else if (complete.Code == "success") {
      closeModalUpdate();
    }
  }

  function generateEmbedYoutube() {
    var urls = [d.Link];

    var i,
      r,
      rx =
        /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/;

    for (i = 0; i < urls.length; ++i) {
      r = urls[i].match(rx);
      ////console.log(r[1]);
      videoCode = r[1];
    }

    embedHTML =
      `<iframe class="aspect-video w-full" src="https://www.youtube-nocookie.com/embed/` +
      videoCode +
      `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }

  function generateMainName(PID, namePref, nameType) {
    switch (namePref) {
      // Main Character Name
      case 1:
        mainName = d.PlayerCName;
        mainName2 = d.RunCharacter;
        break;
      // Run Character Name
      case 2:
        mainName = d.RunCharacter;
        mainName2 = d.PlayerName;
        break;
      // Player Name
      default:
        mainName = d.PlayerName;
        mainName2 = d.RunCharacter;
        break;
    }
    if (PID != (106 || 107)) {
      var cssOutput = `font-weight: bold; `;
      switch (nameType) {
        case 1:
          cssOutput += `color: #` + d.PlayerNameColor1 + `;`;
          break;
        case 2:
          cssOutput +=
            `background: -webkit-linear-gradient(0deg, #` +
            d.PlayerNameColor1 +
            `, #` +
            d.PlayerNameColor2 +
            `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
          break;
        case 3:
          cssOutput +=
            `color: #` +
            d.PlayerNameColor2 +
            `; text-shadow: 0px 0px 5px #` +
            d.PlayerNameColor1 +
            `, 0px 0px 5px #` +
            d.PlayerNameColor1 +
            `, 0px 0px 5px #` +
            d.PlayerNameColor1 +
            `;`;
          break;
        default:
          break;
      }
      cssOutput += `cursor: pointer;`;
    } else {
      var cssOutput = ``;
    }

    return cssOutput;
  }

  function generateSubName(PID, namePref, nameType) {
    switch (namePref) {
      // Main Character Name
      case 1:
        subName = d.SubmitterCName;
        break;
      // Run Character Name
      case 2:
        subName = d.SubmitterName;
        break;
      // Player Name
      default:
        subName = d.SubmitterName;
        break;
    }
    if (PID != (106 || 107)) {
      var cssOutput = `font-weight: bold; `;
      switch (nameType) {
        case 1:
          cssOutput += `color: #` + d.SubmitterNameColor1 + `;`;
          break;
        case 2:
          cssOutput +=
            `background: -webkit-linear-gradient(0deg, #` +
            d.SubmitterNameColor1 +
            `, #` +
            d.SubmitterNameColor2 +
            `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
          break;
        case 3:
          cssOutput +=
            `color: #` +
            d.SubmitterNameColor2 +
            `; text-shadow: 0px 0px 5px #` +
            d.SubmitterNameColor1 +
            `, 0px 0px 5px #` +
            d.SubmitterNameColor1 +
            `, 0px 0px 5px #` +
            d.SubmitterNameColor1 +
            `;`;
          break;
        default:
          break;
      }
      cssOutput += `cursor: pointer;`;
    } else {
      var cssOutput = ``;
    }
    return cssOutput;
  }
</script>

<div class="modal" id="PurpleSolo_RunInfoModal">
  <div class="modal-box relative max-h-full max-w-6xl rounded">
    <div class="flex flex-row">
      <span class="flex-1 self-center text-3xl font-light md:text-4xl"
        >Run Information</span
      >
      {#if d.RunID !== undefined && !processing}
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
      {/if}
    </div>
    <div class="divider -mx-6" />
    <div class="widget-discord max-h-[20rem] overflow-auto md:max-h-[44rem]">
      {#if d.RunID !== undefined && !processing}
        <div class="flex grow flex-col gap-1">
          {#if (localStorage.getItem("consent-google") ?? false) === "true"}
            <div class="rounded-md border border-secondary bg-black p-1">
              {@html embedHTML}
            </div>
          {:else}
            <div
              class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
            >
              <div class="flex flex-col text-center">
                <span class="text-lg font-semibold"
                  ><i class="bi bi-youtube" /> Video Link:</span
                >
                <a
                  class="link-primary link"
                  href={d.Link}
                  target="_blank"
                  rel="noreferrer noopener">{d.Link}</a
                >
              </div>
            </div>
          {/if}
          <div class="flex flex-col gap-2 p-2 md:flex-row md:gap-0">
            <div class="flex basis-full flex-col justify-center md:flex-row">
              <span class="flex place-content-center md:mr-1">Run By:</span>
              {#if d.PlayerID !== (106 || 107)}
                <a
                  href="/users?id={d.PlayerID}"
                  target="_blank"
                  rel="noreferrer noopener"
                  class="flex place-content-center"
                  ><p style={cssOutputMain} class="inline place-self-center">
                    {mainName}
                  </p></a
                >
              {:else}
                <p style={cssOutputMain} class="flex place-content-center">
                  {mainName}
                </p>
              {/if}
              {#if mainName !== mainName2 && d.PlayerID !== (106 || 107)}
                <p
                  class="flex place-self-center text-sm text-base-content/50 md:ml-1"
                >
                  ({mainName2})
                </p>
              {/if}
            </div>

            <div class="flex basis-full flex-col justify-center md:flex-row">
              <span class="flex place-content-center md:mr-1"
                >Submitted By:</span
              >
              {#if d.SubmitterID !== (106 || 107)}
                <a
                  href="/users?id={d.SubmitterID}"
                  target="_blank"
                  rel="noreferrer noopener"
                  class="flex place-content-center"
                  ><p style={cssOutputSub} class="inline place-self-center">
                    {subName}
                  </p></a
                >
              {:else}
                <p style={cssOutputSub} class="flex place-content-center">
                  {subName}
                </p>
              {/if}
            </div>

            {#if d.VideoTag}
              <div class="flex basis-full justify-center">
                <span><i class="bi bi-film mr-1" /> Low Video Quality</span>
              </div>
            {/if}
          </div>
          <div class="flex grow flex-col gap-1 md:flex-row">
            {#if d.Notes}
              <div
                class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
              >
                <div class="flex grow flex-col">
                  <span class="text-center text-lg font-semibold"
                    >Runner's Notes:</span
                  >
                  <div class="whitespace-pre-wrap p-2">{d.Notes}</div>
                </div>
              </div>
            {/if}

            <div
              class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
            >
              <div class="flex grow flex-col">
                <span class="text-center text-lg font-semibold"
                  >Moderator's Notes:</span
                >
                <div class="whitespace-pre-wrap p-2">
                  <textarea
                    class="widget-discord textarea-bordered textarea w-full grow"
                    placeholder="(Optional) Type any moderator notes you want to display here!"
                    id="modnote-form"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else if processing}
        <div
          class="flex basis-full flex-col place-content-center place-items-center gap-1"
        >
          Please Wait...<br /><progress
            class="progress progress-primary w-56 border border-neutral-content/20"
          />
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
      {#if d.RunID !== undefined && !processing}
        <label
          on:click={denyRun}
          class="btn-outline btn-error btn rounded md:btn-sm">Deny</label
        >
        <label
          on:click={approveRun}
          class="btn-outline btn-success btn rounded md:btn-sm">Approve</label
        >
        <label
          on:click={closeModal}
          class="btn-outline btn-secondary btn rounded md:btn-sm">Close</label
        >
      {/if}
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
