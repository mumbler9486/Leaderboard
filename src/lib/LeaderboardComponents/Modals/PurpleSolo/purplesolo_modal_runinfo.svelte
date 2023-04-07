<script lang="ts">
  var d = [];
  var mainName;
  var cssOutputMain;
  var cssOutputSub;
  var mainName2;
  var subName;
  var videoCode;
  var embedHTML;

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
    subName = null;
    mainName = null;
    mainName2 = null;
    d = [];
    var params = `?GetRunID=` + id;
    const response = await fetch("/ngs-api/PurpleSoloRunInfo" + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    d = await response.json();
    d = d[0];
    //console.log(d)
    cssOutputMain = generateMainName(d.PlayerID, d.NamePref, d.NameType);
    cssOutputSub = generateSubName(d.SubPlayerID, d.SubNamePref, d.SubNameType);

    generateEmbedYoutube();
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
        mainName = d.CharacterName;
        mainName2 = d.VideoName;
        break;
      // Run Character Name
      case 2:
        mainName = d.VideoName;
        mainName2 = d.PlayerName;
        break;
      // Player Name
      default:
        mainName = d.PlayerName;
        mainName2 = d.VideoName;
        break;
    }
    if (PID != (106 || 107)) {
      var cssOutput = `font-weight: bold; `;
      switch (nameType) {
        case 1:
          cssOutput += `color: #` + d.NameColor1 + `;`;
          break;
        case 2:
          cssOutput +=
            `background: -webkit-linear-gradient(0deg, #` +
            d.NameColor1 +
            `, #` +
            d.NameColor2 +
            `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
          break;
        case 3:
          cssOutput +=
            `color: #` +
            d.NameColor2 +
            `; text-shadow: 0px 0px 5px #` +
            d.NameColor1 +
            `, 0px 0px 5px #` +
            d.NameColor1 +
            `, 0px 0px 5px #` +
            d.NameColor1 +
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
        subName = d.SubCharacterName;
        break;
      // Run Character Name
      case 2:
        subName = d.SubPlayerName;
        break;
      // Player Name
      default:
        subName = d.SubPlayerName;
        break;
    }
    if (PID != (106 || 107)) {
      var cssOutput = `font-weight: bold; `;
      switch (nameType) {
        case 1:
          cssOutput += `color: #` + d.SubNameColor1 + `;`;
          break;
        case 2:
          cssOutput +=
            `background: -webkit-linear-gradient(0deg, #` +
            d.SubNameColor1 +
            `, #` +
            d.SubNameColor2 +
            `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
          break;
        case 3:
          cssOutput +=
            `color: #` +
            d.SubNameColor2 +
            `; text-shadow: 0px 0px 5px #` +
            d.SubNameColor1 +
            `, 0px 0px 5px #` +
            d.SubNameColor1 +
            `, 0px 0px 5px #` +
            d.SubNameColor1 +
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
      {#if d.RunID !== undefined}
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
              {#if d.SubPlayerID !== (106 || 107)}
                <a
                  href="/users?id={d.SubPlayerID}"
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
            {#if d.ModNotes}
              <div
                class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
              >
                <div class="flex grow flex-col">
                  <span class="text-center text-lg font-semibold"
                    >Moderator's Notes:</span
                  >
                  <div class="whitespace-pre-wrap p-2">{d.ModNotes}</div>
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
