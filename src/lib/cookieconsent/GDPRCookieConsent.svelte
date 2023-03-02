<script>
  import { browser } from '$app/environment';
  let consent = browser ? localStorage.getItem("consent") ?? null : 'waiting';
  let customize = 0;
  let consentPreferences = (browser ? localStorage.getItem("consent-preferences") ?? false : false) === 'true';
  let consentTwitch = (browser ? localStorage.getItem("consent-twitch") ?? false : false) === 'true';
  let consentGoogle = (browser ? localStorage.getItem("consent-google") ?? false : false) === 'true';
  let consentDiscord = (browser ? localStorage.getItem("consent-discord") ?? false : false) === 'true';

  function toggleCustomize() {
    customize = customize == 0 ? customize = 1 : customize = 0; 
  }

  function setConsent(type) {
    switch(type) {
      case 'all':
        localStorage.setItem("consent","closed");
        consent = 'closed';
        localStorage.setItem("consent-preferences",'true');
        localStorage.setItem("consent-twitch",'true');
        localStorage.setItem("consent-google",'true');
        localStorage.setItem("consent-discord",'true');
        console.log('all');
        break;
      case 'necessary':
        localStorage.setItem("consent","closed");
        consent = 'closed';
        localStorage.setItem("consent-preferences",'false');
        localStorage.setItem("consent-twitch",'false');
        localStorage.setItem("consent-google",'false');
        localStorage.setItem("consent-discord",'false');
        console.log('necessary');
        break;
      case 'selected':
        localStorage.setItem("consent","closed");
        consent = 'closed';
        localStorage.setItem("consent-preferences",consentPreferences.toString());
        localStorage.setItem("consent-twitch",consentTwitch.toString());
        localStorage.setItem("consent-google",consentGoogle.toString());
        localStorage.setItem("consent-discord",consentDiscord.toString());
        console.log('selected');
        break;
    }
  }
</script>

{#if consent === null}
<div class="z-50 fixed bottom-0 md:bottom-10 right-0 left-0 md:left-auto md:right-10">
    <div class="max-w-[32rem] md:max-w-[32vw] max-h-[32rem] md:max-h-[52vh] bg-neutral m-2 px-4 p-4 border-neutral-content/50 border rounded-md space-y-2 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] flex flex-col place-items-center overflow-y-auto">
        <div class="place-items-center flex flex-col">
          <p class="text-2xl md:text-3xl font-light mb-4 text-neutral-content">This website uses cookies.</p>
          <p class="mb-4 text-neutral-content">We use cookies (and local storage) to log you in and store your settings.</p>
          <a href="/privacy-policy" target="_blank" rel="noreferrer noopener" class="link link-accent">Please review our Privacy Policy for more information.</a>
          {#if customize==1}
          <p class="mb-4 text-neutral-content font-bold">Expand a section to read more about each setting.</p>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex="0" class="collapse collapse-plus border border-neutral-content/50 bg-neutral rounded-box w-full">
            <div class="collapse-title text-xl font-light text-neutral-content border-b border-b-neutral-content/50">
              Necessary Information
            </div>
            <div class="collapse-content bg-base-100">
              <p class="font-semibold my-4 text-xl">Registration:</p>
              <p class="mb-4">Registering stores information securely on our servers, including:</p>
              <p class="mb-4 font-semibold">Email Address, Username, and Player Name.
              <p class="font-semibold mb-4 text-xl">Logging in:</p>
              <p class="mb-4">Logging in stores the following information as a cookie on your system, including:</p>
              <p class="mb-4 font-semibold">Your User Account Information (Username, Player Name, etc.)</p>
            </div>
          </div>
          <label class="cursor-pointer label w-full mb-4">
            <span class="label-text font-semibold text-neutral-content">Enable Necessary Cookies</span> 
            <input type="checkbox" class="toggle toggle-primary" disabled checked />
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex="0" class="collapse collapse-plus border border-neutral-content/50 bg-neutral rounded-box w-full">
            <div class="collapse-title text-xl font-light text-neutral-content border-b border-b-neutral-content/50">
              Preference Information
            </div>
            <div class="collapse-content bg-base-100"> 
              <p class="font-semibold my-4 text-xl">User Settings:</p>
              <p class="mb-4">User settings are stored <strong>locally to your device</strong> and are not saved to our servers.<br>They are, however, processed by our site to allow non-default functionality.<br><br><strong>Examples of user settings are:</strong></p>
              <p class="mb-4">Your language preferences.<br>Leaderboard timer display preferences.<br>Streamer mode status.<br><strong>And other user settings.</strong></p>
            </div>
          </div>
          <label class="cursor-pointer label w-full mb-4">
            <span class="label-text font-semibold text-neutral-content">Enable Preference Cookies</span> 
            <input type="checkbox" class="toggle toggle-primary" bind:checked={consentPreferences}/>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex="0" class="collapse collapse-plus border border-neutral-content/50 bg-neutral rounded-box w-full">
            <div class="collapse-title text-xl font-light text-neutral-content border-b border-b-neutral-content/50">
              Third-Party Information
            </div>
            <div class="collapse-content bg-base-100"> 
              <p class="font-semibold my-4 text-xl">Google:</p>
              <p class="mb-4">Enabling third-party cookies will allow Google to place their own trackers, cookies, and analytics on your system.</p>
              <p class="mb-4">In exchange, this allows us to enable Youtube embeds and other features.</p>
              <p class="font-semibold my-4 text-xl">Twitch:</p>
              <p class="mb-4">Enabling third-party cookies will allow Twitch.tv to place their own trackers, cookies, and analytics on your system.</p>
              <p class="mb-4">In exchange, this allows us to enable Twitch.tv embeds and other features.</p>
              <p class="font-semibold my-4 text-xl">Discord:</p>
              <p class="mb-4">Enabling third-party cookies will allow Discord to place their own trackers, cookies, and analytics on your system.</p>
              <p class="mb-4">In exchange, this allows us to enable the Discord widget on our home page.</p>
            </div>
          </div>
          <label class="cursor-pointer label w-full">
            <span class="label-text font-semibold text-neutral-content">Enable Google Cookies</span> 
            <input type="checkbox" class="toggle toggle-primary" bind:checked={consentGoogle}/>
          </label>
          <label class="cursor-pointer label w-full">
            <span class="label-text font-semibold text-neutral-content">Enable Twitch Cookies</span> 
            <input type="checkbox" class="toggle toggle-primary" bind:checked={consentTwitch}/>
          </label>
          <label class="cursor-pointer label w-full mb-4">
            <span class="label-text font-semibold text-neutral-content">Enable Discord Cookies</span> 
            <input type="checkbox" class="toggle toggle-primary" bind:checked={consentDiscord}/>
          </label>
          <button class="btn btn-sm md:btn-md btn-warning rounded-none mb-4" on:click={() => setConsent('selected')}>Allow Selected</button>
          {/if}
          <p class="font-semibold text-neutral-content">We do NOT share your personal information.</p>
        </div>
        <div class="divider"></div>
        <div>
          <button class="btn btn-sm md:btn-md btn-secondary rounded-none" on:click={() => setConsent('necessary')}>Deny</button>
          <button class="btn btn-sm md:btn-md btn-secondary rounded-none" on:click={() => setConsent('all')}>Allow All</button>
          <button class="btn btn-sm md:btn-md btn-secondary rounded-none" on:click={toggleCustomize}>Customize</button>
        </div>
      </div>
</div>
{/if}