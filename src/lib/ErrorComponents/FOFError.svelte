<script>
  import { onMount } from "svelte";
  /**
   * @type {string}
   */
  var FourOhFourMessage = "";
  /**
   * @type {string}
   */
  var FourOhFourImage = "";

  onMount(async () => {
    const array404s = [
      "HelvianSnoruq",
      "HelvianBall",
      "HelvianBujin",
      "HelvianSlots",
      "KaistaraNogleth",
      "ZoutaAms",
      "ZoutaNex",
      "ZoutaRenus",
      "SukeboyKaiby",
      "SukeboyRonaldine",
    ];

    var randomPick = array404s[(array404s.length * Math.random()) | 0];

    switch (randomPick) {
      case "HelvianSnoruq":
        FourOhFourImage = `<img src="/error/helvian-snoruq.png" alt="Helvian facing off a Malevolent Snoruq.">
                <div class="text-secondary text-center">Screenshot by Helvian</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">Consider rolling back to the <a class="link link-primary" href="/">Home</a> page!</div>`;
        break;
      case "HelvianBujin":
        FourOhFourImage = `<img src="/error/helvian-bujin.png" alt="Helvian, short, next to Bujin, tall.">
                <div class="text-secondary text-center">Screenshot by Helvian</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">We came up short while looking for this page.<br>Why not head <a class="link link-primary" href="/">Home</a>?</div>`;
        break;
      case "HelvianBall":
        FourOhFourImage = `<img src="/error/helvian-ball.png" alt="Helvian, incapacitated next to a cannonball.">
                <div class="text-secondary text-center">Screenshot by Helvian</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">Don't drop the ball!<br>Restart and head <a class="link link-primary" href="/">Home</a>?</div>`;
        break;
      case "HelvianSlots":
        FourOhFourImage = `<img src="/error/helvian-rappyslots.png" alt="Helvian, attacking rappy slots with a large hammer.">
                <div class="text-secondary text-center">Screenshot by Helvian</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center"><strong>Jackpot!</strong><br>Someone just won big at slots!<br><a class="link link-primary" href="/">Spin again</a>?</div>`;
        break;
      case "KaistaraNogleth":
        FourOhFourImage = `<img src="/error/kaistara-nogleth.png" alt="Kaistara and company fighting a Nogleth.">
                <div class="text-secondary text-center">Screenshot by Kaistara</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">Our party couldn't find that page!<br>Try searching on the <a class="link link-primary" href="/">Home</a> page!</div>`;
        break;
      case "ZoutaAms":
        FourOhFourImage = `<img src="/error/zouta-ams.png" alt="Zouta facing off Ams Kvaris.">
                <div class="text-secondary text-center">Screenshot by Zouta</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">"Oh, you're approaching me?"<br>"I can't go back to the <a class="link link-primary" href="/">Home</a> page without getting closer."</div>`;
        break;
      case "ZoutaNex":
        FourOhFourImage = `<img src="/error/zouta-nex.png" alt="Zouta staring down a Nex Aelio.">
                <div class="text-secondary text-center">Screenshot by Zouta</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">This page is about to have a blast.<br>Dodge to the <a class="link link-primary" href="/">Home</a> page?</div>`;
        break;
      case "ZoutaRenus":
        FourOhFourImage = `<img src="/error/zouta-renus.png" alt="Zouta incapacitated by Renus Retem.">
                <div class="text-secondary text-center">Screenshot by Zouta</div>`;
        FourOhFourMessage = `<div class="mt-4 mb-2 text-center">We dug around, but we couldn't find that page.<br>Revive in 5 seconds at the <a class="link link-primary" href="/">Home</a> page.</div>`;
        break;
      case "SukeboyKaiby":
        FourOhFourImage = `<img src="/error/sukeboy-kaiby.png" alt="Sukeboy in a Kaiby look with a gun.">
                <div class="text-secondary text-center">Screenshot by Kat</div>`;
        FourOhFourMessage = `<div class="mt-4 text-center">You've encountered a Malevolent Kaibygun. What will you do?</div>
                <div class="mb-2 text-center"><a class="link link-primary" href="/"><strong>> Run</strong></a></div>`;
        break;
      case "SukeboyRonaldine":
        FourOhFourImage = `<img src="/error/sukeboy-ronaldinesoccer.png" alt="Ronaldine playing soccer, drawn by Sukeboy.">
                <div class="text-secondary text-center">Art by Sukeboy</div>`;
        FourOhFourMessage = `<div class="mt-4 text-center">HAHAHAHA, RONALDINE SOCCER!</div>
                <div class="mb-2 text-center"><a class="link link-primary" href="/"><strong>> START</strong></a></div>`;
        break;
    }
  });
</script>

<div class="md:flex-col">
  {@html FourOhFourImage}
</div>
<div class="flex grow flex-col place-content-center">
  <p class="text-center text-8xl font-light">404</p>
  <p class="text-center text-4xl font-light">Page not Found</p>
  {@html FourOhFourMessage}
</div>
