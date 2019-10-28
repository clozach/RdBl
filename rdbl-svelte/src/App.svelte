<script>
  import { onMount } from "svelte";
  import Mousetrap from "mousetrap";
  import Help from "./Help.svelte";

  export const styles = `
.rdbl {
  padding: .1rem;
  border-radius: .5rem;
  background-image: linear-gradient(to right, hsla(275, 89%, 68%, 0.5) 0%, hsla(300, 97%, 76%, 0.5) 51%, hsla(46, 89%, 68%, .5) 100%)
}
`;

  let information = "";

  export const addStyles = styleString => {
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
    const windowSelection = () => {
      const selection = window.getSelection().toString();
      return selection.length > 0 ? selection.toString() : false;
    };

    const selection = windowSelection();

    if (selection) {
      console.log("🧧" + selection);
    } else {
      information = `You haven't made a selection. Highlight a word or phrase before activating RdBl with the "/" key.`;
    }
  }

  Mousetrap.bind("/", slashHandler);
</script>

<Help bind:information />
