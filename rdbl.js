
var haystackText = "";

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

findMyText("the", "🤘")