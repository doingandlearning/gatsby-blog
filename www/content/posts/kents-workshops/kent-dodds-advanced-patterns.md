---
title: 'Kent C. Dodds - Advanced Patterns'
date: '2020-04-06T15:29:47+0000'
layout: post
draft: false
path: '/posts/kcd-advanced-patterns/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'workshop - Advanced Patterns'
---

I'm over halfway through this masterclass on React with Kent. This has been a pretty
deep dive and I'm finding my day-to-day development massively enriched by what I've
learnt so far.

This time we're looking at patterns in React. I'm used to patterns from PHP and Python
but I don't necessarily have a big awareness of them in React.

Some of these have names which are just used as reference and shouldn't be seen as
the `name` of the pattern. Naming things helps people to talk about them but also
can be used as weird gatekeeping mechanisms - "Oh, you've never heard of the
blah-ba-blah pattern - such a newb!".

## Context Controller

When we export a derivative dispatch function from our context controllers, we end
up causing ourselves extra work. You might create your own `increment` and `decrement`
functions which call `dispatch`. It becomes a major annoyance when you have a sequence
of `dispatch` functions that need to be called.

We might create helper functions and share them in the value object. Then we have
to useCallback to wrap the functions so we can use the dependencies array properly.

```javascript
const increment = React.useCallback(() => dispatch({ type: 'increment' }), [
  dispatch,
])
const decrement = React.useCallback(() => dispatch({ type: 'decrement' }), [
  dispatch,
])
```

An alternate approach is to export module level functions that are imported at
that level rather than the context level. These take the dispatch as an argument
which is passed from the context.

```js
const increment = dispatch => dispatch({ type: 'increment' })
const decrement = dispatch => dispatch({ type: 'decrement' })

export { CounterProvider, useCounter, increment, decrement }
```

Then to use them, we get the dispatch like we normally do and then pass it to our
module level functions.

```javascript
// src/screens/counter.js
import { useCounter, increment, decrement } from 'context/counter'

function Counter() {
  const [state, dispatch] = useCounter()
  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatch)}>+</button>
    </div>
  )
}
```

This way if we don't have to memoize the function and can pass any arguments
into a dependency array.

## Compound Components

This is used a lot by the Reach UI library. If you have components that themselves have nested
components (think navbars and links, or forms and inputs) then you could initialise this
component with a large and (potentially) unwieldly configuration object.

A better way, is to have the parent component use `React.children.map()` to clone
each of the children with `React.cloneElement(child, { //additional props})`. For
the example Kent used, each of the nested components needed the `on` state and the
`toggle` function.

If you want to include DOM elements then you need to clone those without passing
on the new props. In this case, you can test the child.prop type. If it is a string
or not a function, clone without the extra props, otherwise add the props.

I've used this a bit in practice when adding a class to `selected` components in
a navigation.

## Flexible Compound Components

Using the cloneElement approach for these compound components means we can only
impact immediate children. If we want to be more flexible, we can use a context
provider for our component and pass through the required elements that way.

When would you use the default value for createContext?

It would be good to provide a more helpful error to our context helper function.

```js
function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      'Toggle compound components must be used within the Toggle component'
    )
  }
  return context
}
```

## Prop Collections and Getters

Rather than be specific about the exact elements you want to provide or making
bespoke custom elements that need to be used, instead you can use a prop collection
to be able to group together the relevant props.

This way, if the user wants to swap out the type of underlying components, they
are free to do this as long as they use the props that your provide.

If you use a getProps function, then you can spread any extra props that the user
wants to pass through as well.

```js
function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const getTogglerProps = ({ onClick, ...props }) => {
    return {
      'aria-pressed': on,
      onClick: () => {
        toggle()
        onClick?.()
      },
      ...props,
    }
  }
  return { on, toggle, getTogglerProps }
}
```

That way you can deal with extra props:

```js
<button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
```

This is used a lot in libraries like `react-table` and `downshift`.

## State Reducer

It may be that you want to allow the user to completely override the behaviours of
the component you are sharing. In this case, you can allow a custom reducer to be
passed into our component.

```js
function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {}
```

and when you call you can pass in your own reducer:

```js
const { on, getTogglerProps, getResetterProps } = useToggle({
  reducer: toggleReducer,
})
```

or your user could just overwrite the methods they want to:

```js
function toggleStateReducer(state, action) {
  if (action.type === useToggle.types.toggle && timesClicked >= 4) {
    return { on: state.on }
  }
  return useToggle.reducer(state, action)
}
```

Good to have the types to be in objects to reduce the chance of typos.

[Kent's latest thinking on this](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)

## Control Props

Sometimes, people want to be able to manage the internal state of our component from the outside. The state reducer allows them to manage what state changes are made when a state change happens, but sometimes people may want to make state changes themselves. We can allow them to do this with a feature called "Control Props."

This is pretty much the same as controlled input elements that you've probably done
a million times in React.
