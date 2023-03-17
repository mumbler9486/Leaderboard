<script lang="ts">
    import { t } from 'svelte-i18n';
    import { locale, locales } from 'svelte-i18n';
    import { onMount } from "svelte";
    import { browser } from '$app/environment';

    let storedUser = (browser ? localStorage.getItem("loginreference-last") ?? null : null);
    let storedName = (browser ? localStorage.getItem("playerreference-name") ?? null : null)
    let storedStyle = (browser ? localStorage.getItem("playerreference-style") ?? null : null)
    let userInfo = null;

    onMount(async () => {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        userInfo = clientPrincipal;

        if (userInfo != null && storedUser != userInfo.userDetails && userInfo.userRoles.includes('user') )
        {
            var params = '?asdf=' + userInfo.userId;
            const response2 = await fetch('/ngs-api/CreateNavName' + params , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
            });
            const MyPlayer = await response2.json();
            console.log(MyPlayer)
            localStorage.setItem("loginreference-last",(userInfo.userDetails).toString())
            localStorage.setItem("playerreference-name",(MyPlayer.PlayerName).toString())
            localStorage.setItem("playerreference-style",(MyPlayer.PlayerStyle).toString())
            storedUser = (browser ? localStorage.getItem("loginreference-last") ?? null : null);
            storedName = (browser ? localStorage.getItem("playerreference-name") ?? null : null)
            storedStyle = (browser ? localStorage.getItem("playerreference-style") ?? null : null)
        }
  
    });

    function storeLocale(localeReference) {
        let consentPreferences = (localStorage.getItem("consent-preferences") ?? false) === 'true';
        if (consentPreferences === true) {
            localStorage.setItem("language",localeReference.toString())
        }
    }

    function cleanLocale(localeReference) {
        const languageList = `{
            "en":"English (Global)",
            "en-alt":"English (Japan)",
            "ja":"日本語"
        }`;
        let cleanedLanguage = JSON.parse(languageList);
        return cleanedLanguage[localeReference];
    }
</script>

<header class="z-50 sticky top-0 border-b border-b-secondary" style="background-color:RGBA(5,15,29,0.8);">
    <div class="container mx-auto px-2">
        <div class="navbar">
            <div class="navbar-start">
                <a href="/">
                    <img class="object-contain h-9" src="/logos/logo.png" alt="{$t('shared.siteName')}">
                </a>
            </div>
            
            <div class="dropdown dropdown-end ml-auto md:hidden">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Menu</label>
                <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <span class="text-center m-2 text-xs font-semibold uppercase flex"><img src="/icons/quests/trigger.png" class="mr-2">Purple Triggers</span>
                    <li>
                        <a href="/leaderboard/run/purple/solo" tabindex="0" style="border-radius: 0px">
                            Solo
                        </a>
                    </li>
                    <li>
                        <a href="/leaderboard/run/purple/duo" tabindex="0" style="border-radius: 0px">
                            Duo
                        </a>
                    </li>
                    <li>
                        <a href="/leaderboard/run/purple/party" tabindex="0" style="border-radius: 0px">
                            Party
                        </a>
                    </li>
                    <span class="text-xs m-2 font-semibold uppercase text-center flex"><img src="/icons/quests/uq.png" class="mr-2">Dark Falz Aegis</span>
                    <li>
                        <a href="/leaderboard/run/dfa/solo" tabindex="0" style="border-radius: 0px">
                            Solo
                        </a>
                    </li>
                    <li>
                        <a href="/leaderboard/run/dfa/duo" tabindex="0" style="border-radius: 0px">
                            Duo
                        </a>
                    </li>
                    <li>
                        <a href="/leaderboard/run/dfa/party" tabindex="0" style="border-radius: 0px">
                            Multi-Party
                        </a>
                    </li> 
                    {#if userInfo != null && userInfo.userRoles.includes('user') }
                    <li>
                    <a href="/leaderboard/submit" tabindex="0" style="border-radius: 0px">
                        <i class="bi bi-envelope-paper mr-2"></i>
                        <span>{$t('navigation.submitRun')}</span>
                    </a></li>{/if}
                    {#if userInfo != null && (userInfo.userRoles.includes('moderator') || userInfo.userRoles.includes('administrator')) }
                    <li>
                    <a href="leaderboard/moderator/submissions" tabindex="0" style="border-radius: 0px">
                        <i class="bi bi-inboxes mr-0"></i>{$t('navigation.modadmin.submissionQueue')}
                    </a></li>{/if}
                    {#if userInfo != null && userInfo.userRoles.includes('user') }
                    <li>
                        <a href="/profile" tabindex="0" style="border-radius: 0px">
                            <i class="bi bi-person-vcard mr-0"></i>{$t('navigation.profile')}
                        </a>
                    </li>
                    {/if}
                    {#if userInfo == null}
                    <li>
                    <a href="/login" tabindex="0" style="border-radius: 0px">
                        <i class="bi bi-box-arrow-in-right mr-2"></i>
                        <span>{$t('navigation.login')}</span>
                    </a>
                    </li>
                    {/if}
                    {#if userInfo != null && userInfo.userRoles.includes('user') }
                    <li>
                        <a href="/logout" tabindex="0" style="border-radius: 0px">
                            <i class="bi bi-box-arrow-right mr-0"></i>{$t('navigation.logout')}
                        </a>
                    </li>
                    {/if}
                </ul>
              </div>

            <div class="hidden md:flex navbar-end">
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn no-animation btn-ghost rounded-none"><span class="flex whitespace-nowrap"><i class="bi bi-card-list mr-2"></i>{$t('navigation.viewRuns')}<i class="bi bi-caret-down ml-2"></i></span></label>
                    <ul tabindex="-1" class="border border-secondary dropdown-content menu shadow bg-neutral whitespace-nowrap">
                        <span class="text-center m-2 text-xs font-semibold uppercase flex"><img src="/icons/quests/trigger.png" class="mr-2">Purple Triggers</span>
                        <li>
                            <a href="/leaderboard/run/purple/solo" tabindex="0" style="border-radius: 0px">
                                Solo
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/run/purple/duo" tabindex="0" style="border-radius: 0px">
                                Duo
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/run/purple/party" tabindex="0" style="border-radius: 0px">
                                Party
                            </a>
                        </li>
                        <span class="text-xs m-2 font-semibold uppercase text-center flex"><img src="/icons/quests/uq.png" class="mr-2">Dark Falz Aegis</span>
                        <li>
                            <a href="/leaderboard/run/dfa/solo" tabindex="0" style="border-radius: 0px">
                                Solo
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/run/dfa/duo" tabindex="0" style="border-radius: 0px">
                                Duo
                            </a>
                        </li>
                        <li>
                            <a href="/leaderboard/run/dfa/party" tabindex="0" style="border-radius: 0px">
                                Multi-Party
                            </a>
                        </li>
                    </ul>
                </div>
                {#if userInfo != null && !userInfo.userRoles.includes('user') }
                <a href="/settings" class="btn no-animation btn-ghost rounded-none">
                    <i class="bi bi-gear mr-2"></i>
                    <span>{$t('navigation.settings')}</span>
                </a>
                {/if}
                {#if userInfo != null && userInfo.userRoles.includes('user') }
                <a href="/leaderboard/submit" class="btn no-animation btn-ghost rounded-none">
                    <i class="bi bi-envelope-paper mr-2"></i>
                    <span>{$t('navigation.submitRun')}</span>
                </a>
                {/if}
                {#if userInfo != null && (userInfo.userRoles.includes('moderator') || userInfo.userRoles.includes('administrator')) }
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn no-animation btn-ghost rounded-none"><span class="flex"><i class="bi bi-shield-shaded mr-2"></i>Moderation<i class="bi bi-caret-down ml-2"></i></span></label>
                    <ul tabindex="-1" class="border border-secondary dropdown-content menu shadow bg-neutral whitespace-nowrap">
                        <li>
                            <a href="leaderboard/moderator/submissions" tabindex="0" style="border-radius: 0px">
                                <i class="bi bi-inboxes mr-0"></i>{$t('navigation.modadmin.submissionQueue')}
                            </a>
                        </li>
                    </ul>
                </div>
                {/if}
                {#if userInfo == null}
                <a href="/login" class="btn no-animation btn-ghost rounded-none">
                    <i class="bi bi-box-arrow-in-right mr-2"></i>
                    <span>{$t('navigation.login')}</span>
                </a>
                {/if}
                {#if userInfo != null && userInfo.userRoles.includes('user') }
                <div class="dropdown dropdown-end">
                    {#if storedName == undefined || storedName == null}
                    <label tabindex="0" class="btn no-animation btn-ghost rounded-none"><span class="flex" style="font-weight:bold; text-transform: none;">{$t('common.loading')}<i class="bi bi-caret-down ml-2"></i></span></label>
                    {:else}
                    <label tabindex="0" class="btn no-animation btn-ghost rounded-none"><span class="flex font-bold" style={storedStyle}>{storedName}</span><i class="bi bi-caret-down ml-2"></i></label>
                    {/if}
                    <ul tabindex="-1" class="border border-secondary dropdown-content menu shadow bg-neutral whitespace-nowrap">
                        <li>
                            <a href="/profile" tabindex="0" style="border-radius: 0px">
                                <i class="bi bi-person-vcard mr-0"></i>{$t('navigation.profile')}
                            </a>
                        </li>
                        <li>
                            <a href="/settings" tabindex="0" style="border-radius: 0px">
                                <i class="bi bi-gear mr-0"></i>
                                {$t('navigation.settings')}
                            </a>
                        </li>
                        <li>
                            <a href="/logout" tabindex="0" style="border-radius: 0px">
                                <i class="bi bi-box-arrow-right mr-0"></i>{$t('navigation.logout')}
                            </a>
                        </li>
                    </ul>
                </div>
                {/if}
                
            </div>
            <label for="modal-lang" class="btn no-animation btn-ghost rounded-none"><i class="bi bi-translate"></i></label>
        </div>
        {#if userInfo != null && !userInfo.userRoles.includes('user') }
        <a href="/setup" class="alert alert-warning shadow-lg m-2">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span class="font-bold">You must finish user setup to upload runs and access certain other features! Click or Tap here to do so!</span>
            </div>
        </a>
        {/if}
    </div>
</header>

<input type="checkbox" id="modal-lang" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative rounded max-w-4xl">
    <div class="flex flex-row">
        <span class="flex-1 font-light text-3xl md:text-4xl self-center">Language</span>
        <label for="modal-lang" class="flex-initial btn btn-sm btn-square rounded btn-outline btn-secondary self-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>
    </div>
    <div class="divider -mx-6"></div>
    <div class="flex flex-row flex-wrap gap-1 justify-center">
        {#each $locales as localeref}
            {#each [cleanLocale(localeref)] as cleanedLocale}
            <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-64">
                <span class="label-text text-neutral-content">{cleanedLocale}</span> 
                <input type="radio" bind:group={$locale} id="radio-classFilter-force" value={localeref} name="radio-shared-languagePreference" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" on:click={() => storeLocale(localeref)}/>
            </label>
            {/each}
        {/each}
    </div>
    <div class="divider -mx-6"></div>
    <div class="modal-action">
        <label for="modal-lang" class="btn md:btn-sm btn-secondary btn-outline rounded">Close</label>
    </div>
  </div>
</div>