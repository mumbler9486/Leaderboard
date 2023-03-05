<script lang="ts">

    var d = [];
    var player1 = {};
    var player2 = {};

    var submitter = {};

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let processing = false;

    export function openRunInfo(data) {
        processing = false;
        let modal = document.getElementById('PurpleSolo_RunInfoModal');
        modal.classList.add('modal-open');
        reloadData(data);
    }

    function closeModal() {
        let modal = document.getElementById('PurpleSolo_RunInfoModal');
        modal.classList.remove('modal-open');
        d = [];
    }

    export async function reloadData(data) {
        d = data;
        player1 = {}
        player2 = {}

        submitter = {}
        
        player1 = d.p1;
        player2 = d.p2;

        submitter = d.sub;
        //console.log(player1)
        generateMainName(player1);
        generateMainName(player2);
  
        generateMainName(submitter);
        //console.log(submitter)

    }

    function closeModalUpdate() {
        let modal = document.getElementById('PurpleSolo_RunInfoModal');
        modal.classList.remove('modal-open');
        d = {};
        dispatch('refreshData', {
            Data: null
        });
    }

    async function approveRun() {
        d.shared.ModNotes = document.getElementById('modnote-form').value;
        d.shared.ModNotes == '' ? d.ModNotes = null : null
        processing = true;
        const response = await fetch('/ngs-api/ApproveRun?type=purpleduo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        });
        var complete = await response.json()
        //console.log(complete)
        if (complete.Code == "error") {
            processing = false;
        }
        else if (complete.Code == "success") {
            closeModalUpdate();
        }
    }

    function generateMainName(player) {
        if (player.PlayerID == submitter.PlayerID) {
            player.RunCharacterName = player.CharacterName;
        }
        switch (player.PreferredName) {
            // Main Character Name
            case 1:
                player.NameOut1 = player.CharacterName;
                player.NameOut2 = player.RunCharacterName;
                break;
            // Run Character Name
            case 2:
                player.NameOut1 = player.RunCharacterName;
                player.NameOut2 = player.PlayerName;
                break;
            // Player Name
            default:
                player.NameOut1 = player.PlayerName;
                player.NameOut2 = player.RunCharacterName;
                break;
        }
        if (player.PlayerID != ('106' || '107')) {
            player.CSS = `font-weight: bold; `;
            switch (player.NameType) {
            case 1:
                player.CSS += `color: #` + player.NameColor1 + `;`
                break;
            case 2:
                player.CSS += `background: -webkit-linear-gradient(0deg, #` + player.NameColor1 + `, #` + player.NameColor2 + `);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
                break;
            case 3:
                player.CSS += `color: #` + player.NameColor2 + `; text-shadow: 0px 0px 5px #` + player.NameColor1 + `, 0px 0px 5px #` + player.NameColor1 + `, 0px 0px 5px #` + player.NameColor1 + `;`;
                break;
            default:
                break;
            }
            player.CSS += `cursor: pointer;`;
        }
        else {
            player.CSS = ``;
        }

        return player.CSS;

    }

  </script>
  
  <div class="modal" id='PurpleSolo_RunInfoModal'>
    <div class="modal-box relative rounded max-w-6xl max-h-full">
      <div class="flex flex-row">
          <span class="flex-1 font-light text-3xl md:text-4xl self-center">Run Information</span>
          {#if d.shared !== undefined && !processing}
          <label on:click={closeModal} class="flex-initial btn btn-sm btn-square rounded btn-outline btn-secondary self-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
          {/if}
      </div>
      <div class="divider -mx-6"></div>
      <div class="max-h-[20rem] md:max-h-[44rem] overflow-auto widget-discord">
        {#if d.shared !== undefined && !processing}
        <div class="flex flex-col gap-1 grow">
            <div class="flex basis-full justify-center bg-secondary/25 border border-secondary rounded-md p-2">
                <div class="flex flex-col text-center">
                    <span class="font-semibold text-lg"><i class="bi bi-youtube"></i> POV Link(s):</span>
                    {#if player1.LinkPOV}
                    <span class="inline place-self-center">{player1.NameOut1}</span>
                    <a class="link link-primary" href={player1.LinkPOV} target="_blank" rel="noreferrer noopener">{player1.LinkPOV}</a>
                    {/if}
                    {#if player2.LinkPOV}
                    <div class="divider m-0"></div>
                    <span class="inline place-self-center">{player2.NameOut1}</span>
                    <a class="link link-primary" href={player2.LinkPOV} target="_blank" rel="noreferrer noopener">{player2.LinkPOV}</a>
                    {/if}

                </div>
            </div>
            <div class="flex flex-col gap-2 md:gap-0 md:flex-row p-2">

                <div class="flex flex-col basis-full justify-center">
                    <p class="flex place-content-center">Run By:</p>
                    {#if player1.PlayerID !== ('106' || '107')}
                    <p class="flex place-content-center"><a style={player1.CSS} class="inline place-self-center" href="/users?id={player1.PlayerID}" target="_blank" rel="noreferrer noopener" >{player1.NameOut1}</a></p>
                    {:else}
                    <p style={player1.CSS} class="flex place-content-center">{player1.NameOut1}</p>
                    {/if}
                    {#if player1.NameOut1 !== player1.NameOut2 && player1.PlayerID !== ('106' || '107')}
                    <p class="flex place-self-center text-base-content/50 text-sm md:ml-1">({player1.NameOut2})</p>
                    {/if}
                    <div class="divider m-0"></div>
                    {#if player2.PlayerID !== ('106' || '107')}
                    <p class="flex place-content-center"><a href="/users?id={player2.PlayerID}" target="_blank" rel="noreferrer noopener" style={player2.CSS} class="inline place-self-center">{player2.NameOut1}</a></p>
                    {:else}
                    <p style={player2.CSS} class="flex place-content-center">{player2.NameOut1}</p>
                    {/if}
                    {#if player2.NameOut1 !== player2.NameOut2 && player2.PlayerID !== ('106' || '107')}
                    <p class="flex place-self-center text-base-content/50 text-sm md:ml-1">({player2.NameOut2})</p>
                    {/if}

                </div>

                <div class="flex flex-col basis-full justify-center">
                    <p class="flex place-content-center">Submitted By:</p>
                    {#if submitter.PlayerID !== ('106' || '107')}
                    <p class="flex place-content-center"><a href="/users?id={submitter.PlayerID}" target="_blank" rel="noreferrer noopener" style={submitter.CSS} class="inline place-self-center">{submitter.NameOut1}</a></p>
                    {:else}
                    <p style={submitter.CSS} class="flex place-content-center">{submitter.NameOut2}</p>
                    {/if}
                </div>

            </div>
            <div class="flex flex-col md:flex-row gap-1 grow">
                {#if d.shared.Notes}
                <div class="flex basis-1/2 md:basis-full justify-center bg-secondary/25 border border-secondary rounded-md p-2">
                    <div class="flex flex-col grow">
                        <span class="font-semibold text-lg text-center">Runner's Notes:</span>
                        <div class="whitespace-pre-wrap p-2">{d.shared.Notes}</div>
                    </div>
                </div>
                {/if}

                <div class="flex basis-1/2 md:basis-full justify-center bg-secondary/25 border border-secondary rounded-md p-2">
                    <div class="flex flex-col grow">
                        <span class="font-semibold text-lg text-center">Moderator's Notes:</span>
                        <div class="whitespace-pre-wrap p-2">
                            <textarea class="textarea textarea-bordered w-full widget-discord grow" placeholder="(Optional) Type any moderator notes you want to display here!" id="modnote-form"></textarea>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        {:else if processing}
        <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Please Wait...<br><progress class="progress border border-neutral-content/20 progress-primary w-56"></progress></div>
        {:else}
        <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Loading - Please Wait...<br><progress class="progress border border-neutral-content/20 progress-primary w-56"></progress></div>
        {/if}
      </div>
      <div class="divider -mx-6"></div>
      <div class="modal-action">
        {#if d.shared !== undefined && !processing}
        <label on:click={closeModal} class="btn md:btn-sm btn-error btn-outline rounded">Deny</label>
        <label on:click={approveRun} class="btn md:btn-sm btn-success btn-outline rounded">Approve</label>
        <label on:click={closeModal} class="btn md:btn-sm btn-secondary btn-outline rounded">Close</label>
        {/if}
      </div>
    </div>
  </div>

  <style>


    .widget-discord::-webkit-scrollbar
    {
        width:10px;
    }
    .widget-discord::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece
    {
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 5px;
    }
    .widget-discord::-webkit-scrollbar-thumb
    {
        background-color: hsla(0,0%,100%,.1);
    }
    .widget-discord::-webkit-scrollbar-track-piece
    {
        background-color: transparent;
    }
    </style>