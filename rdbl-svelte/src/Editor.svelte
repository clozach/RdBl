<script>
  import { editingTerm, setDefinition } from "./Store.js";
  import Mousetrap from "mousetrap";

  let term = "";
  let def = "";

  const unsubTerm = editingTerm.subscribe(value => {
    term = value;
  });

  const reset = () => {
    term = "";
    def = "";
  };

  const save = () => {
    setDefinition(term, def);
    reset();
  };

  // ⚠️This won't work if you remove the `class="mousetrap"` on the `<input>`
  Mousetrap.bind("return", save);
</script>

<style>
  #rdbl-editor {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 40px;
  }

  .padding {
    padding: 2em;
  }

  .visible-rect {
    font-family: Courier, "Lucida Sans Typewriter", "Lucida Typewriter",
      monospace;
    padding: 0.5em 1em 0.5em 1em;
    box-shadow: 0.1em 0.2em 0.3em hsla(0, 0%, 0%, 0.25);
    background-color: #fffffff2;
    border: 0.07em gray solid;
    border-radius: 0.3em;
  }

  .term {
    margin: 0.5em 0;
    color: black;
  }

  input {
    width: 90%;
    font-size: 0.7em;
    padding: 0.5em;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #003a8050;
  }
</style>

{#if term.length > 0}
  <div class="overlay" on:click={reset} />
  <div id="rdbl-editor">
    <div class="padding">
      <div class="visible-rect">
        <!-- svelte-ignore a11y-autofocus -->
        <label for="definition" class="term" tabindex="0" autofocus>
          Enter your replacement for: {term}
        </label>
        <input
          bind:value={def}
          class="mousetrap"
          name="definition"
          placeholder={def.length > 0 ? '' : 'in your own words…'} />
      </div>
    </div>
  </div>
{/if}
