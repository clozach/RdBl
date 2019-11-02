<script>
  import { onMount } from "svelte";
  import findAndReplaceDOMText from "findandreplacedomtext";
  import { editingTerm, dictionary } from "./Store.js";
  import Mousetrap from "mousetrap";
  import Help from "./Help.svelte";
  import Editor from "./Editor.svelte";

  let information = "";

  dictionary.subscribe(model => {
    for (const [term, definition] of Object.entries(model)) {
      findAndReplaceDOMText(document.body, {
        find: new RegExp(
          `([^(0-9)^(a-z)^(A-Z)])${term}([^(0-9)^(a-z)^(A-Z)])`,
          "gi"
        ),
        replace: `$1${definition}$2`,
        wrap: "span",
        wrapClass: "rdbl"
      });
    }
  });

  export const addStyles = () => {
    const styleString = `
      .rdbl {
        line-height: normal;
        background: #EEF9F2;
        border-radius: .1rem;
        font-size: 95%;
        padding: 0.2rem 0.2rem;
      }
    `;
    const firstStyleTag = document.getElementsByTagName("style")[0];
    if (firstStyleTag) {
      firstStyleTag.textContent = firstStyleTag.textContent + styleString;
    } else {
      const node = document.createElement("style");
      node.textContent = styleString;
      document.head.appendChild(node);
    }
  };

  function slashHandler() {
    const validate = windowSelection => {
      const str = windowSelection.toString();

      if (str.length === 0) {
        return {
          error: `You haven't made a selection. Highlight a word or phrase before activating RdBl with the "/" key.`
        };
      }

      if (windowSelection.anchorNode !== windowSelection.focusNode) {
        // 📝 It's possible to have both tag names below "seem" identical.
        // Calling this "good-enough for now" as I'm the only user, but
        // this could definitely be improved!
        return {
          error: `RdBl is pretty simple right now. It can only handle selections within a single HTML tag. You've currently got these tags selected: ${windowSelection
            .anchorNode.tagName ||
            windowSelection.anchorNode.parentElement
              .tagName} & ${windowSelection.focusNode.tagName ||
            windowSelection.focusNode.parentElement.tagName}`
        };
      }

      return { value: str };
    };

    const selection = window.getSelection();
    const validated = validate(selection);

    if (validated.error) {
      information = validated.error;
    } else if (validated.value) {
      editingTerm.set(validated.value);
    }
  }

  Mousetrap.bind("/", slashHandler);

  onMount(addStyles);
</script>

<Help bind:information />
<Editor />
<!-- {JSON.stringify($dictionary)} -->
