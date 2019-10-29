<script>
  import { editingTerm, setDefinition } from "./Store.js";
  import Mousetrap from "mousetrap";

  let term;
  let def;

  const unsubTerm = editingTerm.subscribe(value => {
    term = value;
  });

  // ⚠️This won't work if you remove the `class="mousetrap"` on the input
  Mousetrap.bind("return", () => setDefinition(term, def));
</script>

<style>
  #rdbl-editor {
    position: absolute;
    top: 0;
    width: calc(100vw-0.5rem);
    padding: 3rem;
    margin: 0.5rem;
    background: #ffffffcc;
    color: #0f0f0f;
    font-family: Courier;
  }
</style>

{#if term.length > 0}
  <div id="rdbl-editor">
    <dl>
      <dt>{term}</dt>
      <dd>
        <input bind:value={def} class="mousetrap" />
      </dd>
    </dl>
  </div>
{/if}
