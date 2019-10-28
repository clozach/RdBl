
var haystackText = "";

app.addStyles(app.styles)

let on = false;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      if (on) {
        const rdbls = document.getElementsByClassName("rdbl")
        while (rdbls.length) rdbls[0].classList.remove('rdbl');
        // https://stackoverflow.com/questions/22108173/classlist-remove-is-removing-elements-from-a-htmlcollection
      } else {
        app.findMyText("the", ` <span class="rdbl">&nbsp;the&nbsp;</span> `)
      }
      on = !on;
    }
  }
);
