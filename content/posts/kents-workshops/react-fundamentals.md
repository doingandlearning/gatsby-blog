---
title: 'Kent C. Dodds - React Fundamentals Workshop'
date: '2020-03-24T15:20:51+0000'
layout: post
draft: false
path: '/posts/react-fundamentals/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'workshop - React fundamentals'
---

Lots of tutorials and guides tend to miss the React fundamentals and dive straight into actually building components and apps. Often they throw in Redux and other technologies at the get-go which can make truly grasping the underlying concepts more challenging.

This workshop dives in and looks at those parts that are sometimes overlooked.

One of the great things about React is that it is mostly leveraging Javascript. No need to learn a special templating syntax but instead having a deep grasp of Array and Object methods makes your code cleaner and more effective.

The first chunk of this workshop didn't need any tooling at all - it was all HTML files that were edited and played with allowing the right concepts to be the focus of exploration.

Kent's teaching philosophy is explicit and well communicated. I loved how aligned I felt with it. As a former school leader who was in charge of teaching development for a number of years, I can attest to his knowledge of the science behind learning. Spaced repetition, forgetting curve, embodied learning, retrieval practice, quick feedback and experimentation are all present in his teaching and delivery. Alongside his empathy and humour, it makes me remember the good times in the classroom while learning a ton.

If you haven't been to a Kent workshop before expect to learn a lot, to work in small groups, to write code and to think about things before he delivers deeper instruction. Kent's primary strategy is one I've recommended to Maths teachers for years - create the need for the knowledge before you share it. So, you'll work through exercises in small groups and then Kent will work through his solution with explanation and elaboration. This primes you for the knowledge because you've recognised you don't know it as well as you'd like. Thoughtful and well-delivered.

I took notes on some of the things I learnt during the workshop which I share for me as well as anyone else who might find them useful. There may still be tickets left for some of the future workshops and there is a bunch of awesome Kent content available on egghead and Frontend Masters. I can't recommend this guy enough!

## Basic JavaScript-rendered Hello World

This was a helpful reminder that with vanilla JS you can create elements and build up the DOM.

- document.createElement()
- appendChild() appends nodes
- append() can append nodes but it can also append text

## Intro to raw React APIs

First learning was UNPKG which was pretty cool. This allows you to be able to access single files from any NPM package and import with script tags.

It was interesting to see the comparison between the basic JS `createElement` and the React `createElement`.

React's version creates an object rather than a DOM node and there was a focus on the children props.

`Children` can be a string, an array, other React elements, numbers and Booleans but not functions.

You can either set the children as a property in the props object or, you can pass in as many arguments after the props object which will be scooped up to be children.

```js
React.createElement('div', { children: ['Hello', ' ', 'World'] })

// or

React.createElement('div', {}, 'Hello', ' ', 'World')
```

## Using JSX

JSX is not JS! Shock! :) It is compiled, normally using Babel or Typescript. We can do this in the browser, call it directly and compile in the browser. If the script has type `text/babel` the browser will ignore it but Babel will come back and compile it.

```js
const element = React.createElement('div', {
  className: 'container',
  children: 'Hello World',
})
```

these two are equivalent

```jsx
const element = <div className="container">Hello World</div>
```

Interesting that in vanilla JS, you interpolate with `${}` like in string literals. In JSX, it is just {}.
You can spread the attributes like this.

```js
const children = 'Hello World'
const className = 'container'
const props = {
  children,
  className,
}
const element = <div {...props} />
```

Interesting, that if you have other props as well as the spread operator then Babel uses an \_extend() helper method. If there is a conflict, the last declaration of that property wins.

There is an online REPL for Babel (here)[https://babeljs.io/repl#?browsers=&build=&builtIns=usage&spec=false&loose=false&code_lz=MYewdgzgLgBArgSxgXhgHgCYIG4D40QAOAhmLgBICmANtSGgPRGm7rNkDqIATtRo-3wMseAFBA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=true&targets=&version=7.9.0&externalPlugins=] which is very cool.

## Creating custom components

Woohoo! Now we can create reusable code. Components are functions which return something that can be rendered.

We can create components by using the React.createElement(`our_function`, {children: 'Hello}).

There are lots of ways we can name Components but there are some rules:

```js
ui = <Captialized /> // React.createElement(Captialized) ✅
ui = <property.access /> // React.createElement(property.access) ✅
ui = <Property.Access /> // React.createElement(Property.Access) ✅
ui = <Property['Access'] /> // SyntaxError ❌
ui = <lowercase /> // React.createElement('lowercase') ❌
ui = <kebab-case /> // React.createElement('kebab-case') ❌
ui = <Upper-Kebab-Case /> // React.createElement('Upper-Kebab-Case') ❌
ui = <Upper_Snake_Case /> // React.createElement(Upper_Snake_Case) ✅
ui = <lower_snake_case /> // React.createElement('lower_snake_case') ❌
```

## Styling

There are two primary ways to style react components

- Inline styles with the style prop
  - To break into interpolation, we use {}. Then we pass {} as a styled object.
  - All of the CSS properties are camelcase as keys on the objects
  - The values need to be strings or string literals
  - Inline styles don't handle pseudo-classes
- CSS with the className prop

The order of conflicting keys matters.

## Basic Forms

In React, there actually aren’t a ton of things you have to learn to interact with forms beyond what you can do with regular DOM APIs and JavaScript. Which I think is pretty awesome.

You can attach a submit handler to a form element with the onSubmit prop. This will be called with the submit event which has a target. That target is a reference to the `<form>` DOM node which has a reference to the elements of the form which can be used to get the values out of the form!

React uses SyntheticEvent when an event is triggered. This is for all intents and purposes just like a regular event but sometimes it might end up not behaving in the way you expect (async access of the event for example). You can access the native event with event.nativeEvent.

I hadn't used the `useRef` hook much before but it was a really effective way to access the current value of a referenced input field.

## Dynamic Forms

This is using the `useState` hook to set an error.

Appreciated the checking that all is lowercase function.

```js
const isValid = value === value.toLowerCase()
```

In our breakout room, we also did it with regular expressions:

```js
const isValid = !/[A-Z]/.test(value)
```

Interesting argument to use ternary rather than conditional rendering. It is an issue when the target is a number, such as users.length.

```js
{
  error ? null : 'There is an error'
}

{
  error && 'There is an error'
}

{
  Boolean(error) && 'There is an error'
}
```

## Controlled Forms

Sometimes you have form inputs which you want to programmatically control. Maybe you want to set their value explicitly when the user clicks a button, or maybe you want to change what the value is as the user is typing.

This is why React supports Controlled Form inputs. So far in our exercises, all of the forms inputs have been completely “uncontrolled” which means that the browser is maintaining the state of the input by itself and we can be notified of changes and “query” for the value from the DOM node.

If we want to explicitly update that value we could do this: inputNode.value = 'whatever' but that’s pretty imperative. Instead, React allows us to set a value prop on the input like so:

```jsx
<input value={myInputValue} />
```

Once we do that, React ensures that the value of that input can never change from the value of the myInputValue variable.

Typically you’ll want to provide an onChange handler as well so you can be made aware of “suggested changes” to the input’s value (where React is basically saying "if I were controlling this value, here’s what I would do, but you do whatever you want with this").

Typically you’ll want to store the input’s value in a state variable (via React.useState) and then the onChange handler will call the state updater to keep that value up-to-date.

## Rendering Arrays

One of the more tricky things with React is the requirement of a key prop when you attempt to render a list of elements.

Make sure that you add a unique key to make sure that things can be properly calculated between renders.

Using the array index sometimes falls over - it is better to use a proper key that stays consistent between render.
