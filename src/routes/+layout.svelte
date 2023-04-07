<script>
  import "../app.css";
  import { browser } from "$app/environment";
  let consent = browser ? localStorage.getItem("consent") ?? null : "waiting";
  import GDPRCookieConsent from "$lib/cookieconsent/GDPRCookieConsent.svelte";
</script>

{#if consent === null}
  <GDPRCookieConsent />
{/if}

<slot />
