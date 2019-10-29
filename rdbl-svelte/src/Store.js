import { writable } from "svelte/store";

let model = {}

export const dictionary = writable(model);
export const editingTerm = writable("");

export const setDefinition = (term, def) => {
  model[term] = def;
  dictionary.set(model) // Trigger for subscribers
}