<script>
  import { onMount } from "svelte";
  import findAndReplaceDOMText from "findandreplacedomtext";
  import { editingTerm, dictionary } from "./Store.js";
  import Mousetrap from "mousetrap";
  import Help from "./Help.svelte";
  import Editor from "./Editor.svelte";

  let information = "";

  dictionary.subscribe(model => {
    console.log(`model: ${JSON.stringify(model)}`);
    for (const [term, definition] of Object.entries(model)) {
      findAndReplaceDOMText(document.body, {
        find: new RegExp(
          `([^(0-9)^(a-z)^(A-Z)])${term}([^(0-9)^(a-z)^(A-Z)])`,
          "gi"
        ),
        replace: ` $1${definition}$2 `,
        wrap: "span",
        wrapClass: "rdbl"
      });
    }
  });

  export const addStyles = () => {
    const styleString = `
      .rdbl {
        padding: .1rem;
        border-radius: .5rem;
        background-image: linear-gradient(to right, hsla(275, 89%, 68%, 0.5) 0%, hsla(300, 97%, 76%, 0.5) 51%, hsla(46, 89%, 68%, .5) 100%)
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

  export function findMyText(needle, replacement) {
    const targetNode = () => document.body;

    if (haystackText.length == 0) {
      haystackText = targetNode().innerHTML;
    }

    var re = `([> ])${needle}([ <])`;
    var match = new RegExp(re, "ig");
    var replaced = "";

    if (replacement.length > 0) {
      replaced = haystackText.replace(match, `$1${replacement}$2`);
    } else {
      var boldText =
        '<div style="background-color: yellow; display: inline; font-weight: bold;">' +
        needle +
        "</div>";
      replaced = haystackText.replace(match, boldText);
    }

    targetNode().innerHTML = replaced;
  }

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
