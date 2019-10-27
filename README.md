# Codename RdBl (pronounced "readable")

## What is it?

Glad you asked. It's basically flash cards, but inlined into every piece of textual content you see in your browser. Except maybe PDFs. Doesn't matter.

## How does it work?

It combines [this script](http://www.randomsnippets.com/2008/03/07/how-to-find-and-replace-text-dynamically-via-javascript)…

```
var haystackText = "";
function findMyText(needle, replacement) {
     if (haystackText.length == 0) {
          haystackText = document.getElementById("haystack").innerHTML;
     }
     var match = new RegExp(needle, "ig");
     var replaced = "";
     if (replacement.length > 0) {
          replaced = haystackText.replace(match, replacement);
     }
     else {
          var boldText = "<div style=\"background-color: yellow; display: inline; font-weight: bold;\">" + needle + "</div>";
          replaced = haystackText.replace(match, boldText);
     }
     document.getElementById("haystack").innerHTML = replaced;
}

```

…with a UI for modifying a simple dictionary of terms and "inlinable" definitions. So, for example, if I'm trying to learn about the [effects of stress exposure on prefrontal cortex](https://www.sciencedirect.com/science/article/pii/S2352289514000101), I might have only a hazy idea of what the seconds sentence of the abstract means:

> Basic research has found that high levels of catecholamine release during stress rapidly impair the top-down cognitive functions of the prefrontal cortex (PFC)

Actually, that's not even the whole seconds sentence, but it'll do. Now, re-reading this, I see that the only phrase I don't understand reasonably well is "catecholamine release". I could look up [catecholamine](https://en.wikipedia.org/wiki/Catecholamine) and hope to remember what I learned by the time I encounter the term again down in section 2.

ORRRrrrrrrr, I could tell RdBl to replace every instance of the term with an inline replacement, styled with (eventually) some bits of further interactivity such as modifying the definition, or adding togglable "mnemonics"…which is basically just a free-form notes field.

## What will it look like?

Something like this:

> Basic research has found that high levels of catecholamine release during stress rapidly impair the top-down cognitive functions of the prefrontal cortex (PFC)

- Select `catecholamine`

> Basic research has found that high levels of <span style="background:#fafa0084;">&nbsp;catecholamine release&nbsp;</span> during stress rapidly impair the top-down cognitive functions of the prefrontal cortex (PFC)

- Trigger RdBl. The word disappears, replaced by an editing field. Type your replacement and hit return.

> Basic research has found that high levels of <span style="border: dotted 1px lightgray">&nbsp;adrenal gland secretion&nbsp;</span> during stress rapidly impair the top-down cognitive functions of the prefrontal cortex (PFC)

- Pressing `/` toggles the display back to the original text.
- Pressing `d` edits the *d*efintion
- Pressing `m` edits the *m*nemonics text field, which is always in edit mode. (Autosaves. `esc` to close)

Alright. I think that's a spec! Now, for the architecture.

# Architecture

- Keypress or Mousetrap for the keyboard interactions.
- The above-mentioned [script](http://www.randomsnippets.com/2008/03/07/how-to-find-and-replace-text-dynamically-via-javascript) for text replacement
- Custom code to generate html snippets and wrap the term and/or definition accordingly
- LocalStorage for persistence…at first. Maybe Firebase once it's time to offer multi-session support?
- [ ] Read [this](https://thoughtbot.com/blog/how-to-make-a-chrome-extension) and/or the official docs. Make their project, then make mine.

## Progress

- [x] Get minimal example running.
- [ ]
