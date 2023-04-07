// src/lib/i18n/index.ts
import { browser } from "$app/environment";
import { init, register } from "svelte-i18n";

const defaultLocale = "en";

const englishHandler = [
  "en",
  "en-AU",
  "en-BZ",
  "en-CA",
  "en-CB",
  "en-GB",
  "en-IE",
  "en-JM",
  "en-NZ",
  "en-PH",
  "en-TT",
  "en-US",
  "en-ZA",
  "en-ZW",
];

register("en", () => import("./locales/en.json"));
register("en-alt", () => import("./locales/en-alt.json"));
//register('ja', () => import('./locales/ja.json'))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser
    ? englishHandler.includes(window.navigator.language)
      ? defaultLocale
      : window.navigator.language
    : defaultLocale,
});
