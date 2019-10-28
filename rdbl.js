
var haystackText = "";

const styles = `
.rdbl {
  padding: .1rem;
  border-radius: .5rem;
  background-image: linear-gradient(to right, hsla(275, 89%, 68%, 0.5) 0%, hsla(300, 97%, 76%, 0.5) 51%, hsla(46, 89%, 68%, .5) 100%)
}
`

const addStyles = (styleString) => {
  const firstStyleTag = document.getElementsByTagName("style")[0]
  if (firstStyleTag) {
    firstStyleTag.textContent = firstStyleTag.textContent + styleString
  } else {
    const node = document.createElement("style");
    node.textContent = styleString;
    document.head.appendChild(node)
  }
}

function findMyText(needle, replacement) {

  const targetNode = () => document.body

  if (haystackText.length == 0) {
    haystackText = targetNode().innerHTML;
  }

  var match = new RegExp(needle, "ig");
  var replaced = "";

  if (replacement.length > 0) {
    replaced = haystackText.replace(match, replacement);
  } else {
    var boldText = "<div style=\"background-color: yellow; display: inline; font-weight: bold;\">" + needle + "</div>";
    replaced = haystackText.replace(match, boldText);
  }

  targetNode().innerHTML = replaced;
}

addStyles(styles)
findMyText(" the ", ` <span class="rdbl">&nbsp;the&nbsp;</span> `)