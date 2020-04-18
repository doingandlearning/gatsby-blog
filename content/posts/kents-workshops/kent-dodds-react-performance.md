---
title: 'Kent C. Dodds - React Performance'
date: '2020-04-08T15:33:13+0000'
layout: post
draft: false
path: '/posts/react-performance/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'egghead workshop - React Performance'
---

This series of workshops has been a bit of a marathon. There has been so much
content and so much helpful input. Before I started, I think I would have reckoned
I was an intermediate React dev - now, I think I am an intermediate React dev.

My understanding of the whole React ecosystem has been picked up, restructured and
placed on new and stronger foundations. I have better clarity about the patterns,
questions and expectations I should have of React. I'm finding I'm able to
troubleshoot my code and am better equipped to know what to search for when I need
a solution to a problem. I have primarily been a backend dev, so this has been
really a helpful enhancement of my understanding and appreciation of React.

This is workshop 6 and is all about performance. How can we make our applications
more performant?

## Code splitting

The secret about performance:

> "Performance is all about less code - less lines
> and less cycles for your browser to loop over that code."

[Super Simple Start to ESModules](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser)

We are probably never going to be free of bundlers, we are going to use dynamic
module imports. These are available natively in the browser but for more than 100
modules we lose the efficiencies of this approach. Luckily, bundlers do understand
this.

To do this with React the syntax is:

```js
const SmileyFace = React.lazy(() => import('./smiley-face'))
```

We need to wrap the lazy component in `<React.Suspense>` boundary and give it a fall
back.

We can also prefetch either by using a `Magic Comment` which will instruct Webpack
to load the parcel as prefetched code.

The other way, is to use the useEffect() hook to load the component after the page
has rendered.

Cool to see the coverage tool in Chrome Devtools - it shows the proportion of JS
and CSS that have been downloaded and used on the page.

Frustratingly, when I tried to implement this on a NextJS project, I found that
`React.Suspense` is not yet supported by `ReactDOMServer`, so this can't be used
currently in an SSR context.

## useMemo for expensive calculations

When you have a calculation that is being run in the render cycle, this doesn't
need to run if the calculations inputs haven't changed.

We have useMemo, to make sure we don't recalculate when we don't need to. We pass
in dependencies, a lot like the useEffect hook.

```js
function Distance({ x, y }) {
  const distance = React.useMemo(() => calculateDistance(x, y), [x, y])
  return (
    <div>
      The distance between {x} and {y} is {distance}.
    </div>
  )
}
```

[Use Memo](http://kcd.im/usememo)

It was hard to see where the performance gains here were before we came back to
the full group. I understood the concept but couldn't prove it in the dev tools -
now I can see how it works. If there is a large calculation, implement useMemo.

This is only useful for synchronously calculated values.

## React.memo for reducing unnecessary re-renders

React exists in its current form (in large part) because updating the DOM is the
slowest part of this process. By separating us from the DOM, React can perform
the most surgically optimal updates to the DOM to speed things up for us
big-time.

A React Component can re-render for any of the following reasons:

1. Its props change
2. Its internal state changes
3. It is consuming context values which have changed
4. Its parent re-renders

## Window large lists with react-window

If you have a really long list, there is a cost of trying to calculate whether an
item needs to be rendered or not. Even if you're memoizing this is a potential
issue.

A well-accepted solution to this is called windowing - you only render what is in
view and maybe a bit beyond. Everything else is set with empty divs with the
correct height. This makes things **way** faster!

This was a cool library that works with long lists and grids of data - this stops
the creation of the DOM elements until they are in view or close to being in view.

react-window is a good library for this.

## Fix "perf death by a thousand cuts"

This was another demonstration on the importance of co-located state. If state
isn't required globally, then we should feel free to co-locate that state.

If not every component needs all of the data, we should separate the context in
to separate domains.

Another approach is to create slices of the state and memoizing that. Then,
passing the memoized component will stop a re-render when unrelated context is
updated.

https://kentcdodds.com/blog/optimize-react-re-renders

## Optimize context value

Context triggers a re-render every time the value object updates. The problem here
is that sometimes the value doesn't `change` but is a new instance of that value.

There are a few different ways to optimise this:

- memoize the value in the context.
- separate the setting and getting values into separate context that are provided
  and consumed independently.

## Production performance monitoring

Time, it was a-moving on - so this was a demo on the usefulness of the React
profiling component.

You can read up on the capabilities of the `<React.Profile />` component here:
https://reactjs.org/docs/profiler.html

Here's a basic usage example:

```jsx
<App>
  <Profiler id="Navigation" onRender={onRenderCallback}>
    <Navigation {...props} />
  </Profiler>
  <Main {...props} />
</App>
```

The callback is called with the following arguments

```javascript
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

**It's important to note** that unless you build your app using
`react-dom/profiling` and `scheduler/tracing-profiling` this component wont do
anything.

Kent has written about production performance monitoring here:
["React Production Performance Monitoring"](https://kentcdodds.com/blog/react-production-performance-monitoring)
