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
  }

  .padding {
    padding: 2rem;
  }

  .visible-rect {
    font-family: Courier, "Lucida Sans Typewriter", "Lucida Typewriter",
      monospace;
    padding: 0.5rem 1rem 0.5rem 1rem;
    box-shadow: 0.1rem 0.2rem 0.3rem hsla(0, 0%, 0%, 0.25);
    background-color: #fffffff2;
    border: 0.07rem gray solid;
    border-radius: 0.3rem;
  }

  .term {
    margin: 0.5rem 0;
  }

  input {
    width: 90%;
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
        <div class="term">Term: {term}</div>
        <input
          bind:value={def}
          class="mousetrap"
          placeholder={def.length > 0 ? '' : 'in your own words…'} />
      </div>
    </div>
  </div>
{/if}
