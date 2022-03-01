---
title: 'Why'
---

Admittedly, [the Intersection Observer API ('IO' from here on)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is not difficult to use — but it is verbose and I have to look it up every time. This is [a Svelte action](https://svelte.dev/docs#template-syntax-element-directives-use-action) that I've been copying from project to project & thought it's time to slab a few tests on it & publish as a package.

I think the <abbr title="Intersection Observer API">IO API</abbr> is a lot easier to handle as events on elements vs. the callback API:

```html
<script>
    import { createObserver } from 'svelte-use-io'
    const { observer } = createObserver()
    let intersecting = false
</script>

<div
    use:observer
    on:intersecting={() => (intersecting = true)}
    on:unintersecting={() => (intersecting = false)}
>
  <!-- ... -->
</div>
```

I'm also tempted to create a `<Observer>` component that may look something like this:

```jsx
// ⚠️ This component doesn't exists
<Observer bind:intersecting>
	<div>{/*...*/}</div>
</Observer>
```

...but then it'd need an extra html element. Should it be a `div` or a `section`? Is it ok to just spread `...$$props` into it? Alternatively, I can do something like [slot forwarding](https://www.youtube.com/watch?v=R64MFbYpezU), but now that's just a different kind of boilerplate.

Feedback, thoughts, PRs are all welcomed.
