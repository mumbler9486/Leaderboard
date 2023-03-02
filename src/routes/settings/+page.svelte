<script lang="ts">
    import { t } from 'svelte-i18n'
// @ts-nocheck
    import { browser } from '$app/environment';
    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

    
    let consent = browser ? localStorage.getItem("consent") ?? null : 'waiting';

    let consentPreferences = (browser ? localStorage.getItem("consent-preferences") ?? false : false) === 'true';
    let consentTwitch = (browser ? localStorage.getItem("consent-twitch") ?? false : false) === 'true';
    let consentGoogle = (browser ? localStorage.getItem("consent-google") ?? false : false) === 'true';
    let consentDiscord = (browser ? localStorage.getItem("consent-discord") ?? false : false) === 'true';
    let userStreamermode = (browser ? localStorage.getItem("user-streamermode") ?? 'false' : false) === 'true';
  
  
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
            if (!consentPreferences) {
                        userStreamermode = false
                        localStorage.setItem("user-streamermode",'false');

            }
          localStorage.setItem("consent-twitch",consentTwitch.toString());
          localStorage.setItem("consent-google",consentGoogle.toString());
          localStorage.setItem("consent-discord",consentDiscord.toString());
          console.log('selected');
          break;
      }
    }

    function updateSetting(setting) {
        if (consentPreferences) {
            switch(setting) {
                case 'streamermode':
                    localStorage.setItem("user-streamermode",userStreamermode.toString());
                break;
            }
        }
    }
  </script>

<svelte:head>
    <title>{$t('shared.siteName')} - 404 Not Found</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col md:flex-col grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md">
                <div class="text-4xl font-light text-center">Settings</div>
                <div class="divider -mx-8"></div>
                <div class="text-2xl font-medium text-center">
                    User Settings
                    <div class="divider -mx-8"></div>
                </div>
                <span class="text-warning text-center mb-4">User Settings can only be saved if Preference Cookies are enabled.</span>
                <label class="cursor-pointer label place-self-center">
                    <span class="label-text font-semibold mr-2">Enable Streamer Mode</span> 
                    <input type="checkbox" class="toggle toggle-primary" bind:checked={userStreamermode} on:change={() => updateSetting('streamermode')}/>
                </label>
                <span class="text-center">Streamer mode hides user avatars and user descriptions.</span><span class="text-warning text-center">We don't allow overly NSFW content, but this can help add peace of mind if you want to show the leaderboard in live content!</span>
                <div class="divider -mx-8"></div>
                <div class="text-2xl font-medium text-center">
                    Cookies
                    <div class="divider -mx-8"></div>
                </div>
                <div class="place-items-center flex flex-col">
                    <p class="text-2xl md:text-3xl font-light mb-4">This website uses cookies.</p>
                    <p class="mb-4">We use cookies (and local storage) to log you in and store your settings.</p>
                    <a href="/privacy-policy" target="_blank" rel="noreferrer noopener" class="link link-accent">Please review our Privacy Policy for more information.</a>

                    <p class="mb-4 font-bold">Expand a section to read more about each setting.</p>
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
                      <span class="label-text font-semibold">Enable Necessary Cookies</span> 
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
                      <span class="label-text font-semibold">Enable Preference Cookies</span> 
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
                      <span class="label-text font-semibold">Enable Google Cookies</span> 
                      <input type="checkbox" class="toggle toggle-primary" bind:checked={consentGoogle}/>
                    </label>
                    <label class="cursor-pointer label w-full">
                      <span class="label-text font-semibold">Enable Twitch Cookies</span> 
                      <input type="checkbox" class="toggle toggle-primary" bind:checked={consentTwitch}/>
                    </label>
                    <label class="cursor-pointer label w-full mb-4">
                      <span class="label-text font-semibold">Enable Discord Cookies</span> 
                      <input type="checkbox" class="toggle toggle-primary" bind:checked={consentDiscord}/>
                    </label>
                    <button class="btn btn-sm md:btn-md btn-warning rounded-none mb-4" on:click={() => setConsent('selected')}>Update Cookie Settings</button>

                    <p class="font-semibold">We do NOT share your personal information.</p>
                  </div>
                  <div class="divider"></div>
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>