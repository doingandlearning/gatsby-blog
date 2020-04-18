---
title: 'Kent C. Dodds - Advanced Hooks'
date: '2020-04-01T15:35:37+0000'
layout: post
draft: false
path: '/posts/advanced-hooks/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'egghead workshop - Advanced Hooks'
---

Here we go again! Round 4! This time we're diving into Advanced Hooks.

As the whole world seems to have moved onto Zoom my connection seems to be getting
worse and worse. So, I struggled with a lot of lag today. I don't know if that was
because everyone in my area was online or just the way it happened to fall.

These workshops are coming thick and fast. I know I'll revisit these posts as I revisit
the learning over the coming months. So, see this as a work in progress of my learning
and thinking on these topics.

# useReducer: simple Counter

This is a deliberately simple example to allow us to focus on the API.

Why not just use `useState` with an object when you want to deal with multiple
states?

The reducer hook has a more intuitive way to deal with more complex state - it basically has
a better API.

Here's an example of using `useReducer` to manage the value of a name in an
input.

```javascript
function nameReducer(previousName, action) {
  return action
}

const initialNameValue = 'Joe'

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer, initialNameValue)
  const handleChange = event => setName(event.target.value)
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  )
}
```

It was good to get into the workings of this API and see the things built up from a
`useState` basic state.

State needs to be treated immutable.

As always, Kent has blog posts to answer most questions that come his way.

[How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

[Implementing a simple state machine in JS](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)

[Immer - to deal with immutable state](https://immerjs.github.io/immer/docs/introduction)

## useCallback: custom hooks

The first exercise here was to create a custom hook to generalize some async
behaviour.

For this to work, there was an issue that passing in the dependency array can't
be linted or type checked. We use useCallback to memoize a callback function so that
we can depend on the same function being called for the same values. This stops
infinite rerendering when we pass the function itself as a dependency.

[useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

## useContext: simple Counter

Sharing state without having to prop drill - this is noisy and creates some issues
with maintainance.

You mightn't need to use context as soon as you expect. Michael Jackson suggests
composition is a [useful pattern](https://twitter.com/mjackson/status/1195495535483817984).

Interesting to create a CountProvider component rather than having the state managed
in the app. Then the state can be handled away from the component logic.

[How to use context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

[How to optimize your context value](https://kentcdodds.com/blog/how-to-optimize-your-context-value)

Kent continues the blogpost provision :)

[Application State Management](https://kentcdodds.com/blog/application-state-management-with-react)

[State Co-location](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

Having separate providers allows us to modularise our state and not have unexpected
breaks. It makes it easier to reason about and makes things more performant.

https://kcd.im/colocation
[react-table library](https://github.com/tannerlinsley/react-table)

# useLayoutEffect: auto-growing textarea

There are two ways to tell React to run side-effects after it renders:

1. `useEffect`
2. `useLayoutEffect`

The difference about these is subtle (they have the exact same API), but
significant. 99% of the time `useEffect` is what you want, but sometimes
`useLayoutEffect` can improve your user experience.

To learn about the difference, read
[useEffect vs useLayoutEffect](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)

Basically, for visual effects we use `useLayoutEffect`. Most effects are not visibly
observable.

[React hooks pitfalls](https://kentcdodds.com/blog/react-hooks-pitfalls)

[and in talk form](https://www.youtube.com/watch?v=VIRcX2X7EUk)

## useImperativeHandle: scroll to top/bottom

I hadn't seen this hook before and it seems pretty interesting. This allows us to
pass back imperative handlers if the user passes a ref to the component. This was
achieved in class components with creating a reference inside the instance of the
component, but this isn't possible in functional components.

Now, we create a ref and forward it to the component. The component then uses that
ref to pass back handler function that can be used to imperatively direct the
component.

## useDebugValue: useMedia

We can add debug messages to our hooks to be able to see what is being referenced.
There is a `formatCountDebugValue` that can be used to give a better output.
