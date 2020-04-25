---
title: 'Kent C. Dodds - React Hooks'
date: '2020-03-25T15:21:27'
layout: post
draft: false
path: '/posts/react-hooks/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'workshop - React Hooks'
---

Today was my second workshop with Kent - there are 8 over the next number of weeks and I'm going to blog briefly about each of them.

I aim to return to these posts and flesh them out more over time - potentially making individual posts with the sections that get longer. For now, these are my notes during the workshop and immediately following it.

These workshops are starting in the late afternoon for me and ending at 8.30pm. By the end, I was tired so revisiting those sections is going to be important.

This workshop was about the most common React hooks that are used in app development - `useState`, `useEffect` and `useRef`.

After Kent's initial sharing of the expectations, we jumped into our breakout rooms and got started.

## useState: greeting

The actual exercise was pretty straight-forward. I write React most days at the moment and so these are the tools you'd expect to reach for.

Good to remember that if we use a prop to initialise the component, which is then modified in state, that component won't be re-rendered if the initial variable is changed.

```jsx
function Greeting({ initialName = '' }) {
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" autoComplete="off" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting key="" initialName="" />
}
```

You can use the key prop on a component to trigger a re-initialisation. If you change the key, React will re-render.

There was an interesting discussion about whether `useState` should be for a single value or an object of values. There is an argument that you should probably more to `useReducer` at that point. Kent referenced a blogpost (here)[https://kentcdodds.com/blog/should-i-usestate-or-usereducer] about that and assures us we'll explore more of it later.

## useEffect: persistent state

Interesting explanation for why this is important. React components should be idempotent - no matter how many times the operation is run the final effect should be the same. If we want to have any side effects, we need this hook.

I enjoyed the exercise and the extra credit - I haven't done a lot with localStorage so this was good.

```
Use-effect is to get the state of the world to be in-sync with the state of our application.
```

```
React is a way to render UI, manage state and update UI based on that state.
```

- You can pass the setValue part of the hook a function with the current value and the returned value.

```
setCount(c=>c+1)
```

- The dependency array should be exhaustive to make sure that the synchronization of the world is valid.

A custom hook is just a regular function that calls and uses other hooks.

An interesting hook-flow example and diagram.

## Lifting state

A really common issue is needing to share state between sibling components. We can move the state up to the parent in order to share it between them.

If things change though and we find that we have a single component that needs the state, we should colocate that state within the relevant component. Kent has a blog post for it [here](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

We can categorize our state into different types.

## useState: tic tac toe

Blogpost on managed and derived state [here](https://kentcdodds.com/blog/dont-sync-state-derive-it)

If you have an async callback on set state, it is typically better to do something like this:

```js
setSquares(currentSquares => {
  const squaresCopy = [...currentSquares]
  squaresCopy[square] = calculateNextValue(currentSquares)
  return squareCopy
})
```

If you are using the previous state to update the state (particularly async) always use this function form.

## `useRef` and useEffect: DOM interaction

`useRef` - you can change a value without triggering a re-render. A ref is an object with a current property which can mutated freely.

We can use the ref to target a dom node which is useful for implementing JS libraries that act directly on the DOM.

You have something that changes over time but you don't want to trigger a re-render.

Another use is [here](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) on Dan Abarmov's blog.

## useEffect: HTTP requests

HTTP requests are side effects - we are bringing our app and the outside world into sync.

https://kentcdodds.com/blog/stop-using-isloading-booleans
