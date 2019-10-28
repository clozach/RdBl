<script>
  export let information = "";

  const helpId = "rdbl-help";
  // Display `information` to the user for a few seconds
  $: if (information.length > 0) {
    setTimeout(() => {
      information = "";
    }, 5000);
  }
</script>

<style>
  #rdbl-help {
    position: absolute;
    top: 0;
    width: calc(100vw-0.5rem);
    padding: 3rem;
    margin: 0.5rem;
    background: #ffffffcc;
    color: #0f0f0f;
    font-size: 3rem;
    font-family: Courier;
  }
</style>

{#if information.length > 0}
  <div id="rdbl-help">{information}</div>
{/if}
