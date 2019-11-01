import App from './App.svelte';

const target = document.createElement("div")
target.id = "rdbl-svelte-app"
target.style.position = "absolute"
// Most of the time we're invisible, but when we _aren't_
// we'd better damn well 👇 be on top, or what's the point?!
target.style.zIndex = "10000"
document.body.prepend(target)

const app = new App({
	target: target,
	props: {
		name: 'world'
	}
});

export default app;