---
title: 'Kent C. Dodds - Building React Apps Part 1'
date: '2020-03-31T15:35:37+0000'
layout: post
draft: false
path: '/posts/building-react-apps/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'workshop - Building React Apps'
---

This is the 3rd of 8 workshops and is a new one for Kent. He kicked off and was
aware the timings might be a bit off because this is the first time through. This
is going to be a big one and there is probably enough in the exercises that he
didn't think we'd get to those in the extra credit.

Timing was an issue and unfortunately the service worker he had developed for the
course was playing up in his local environment. That didn't get in the way of some
excellent instruction and helpful learnings until right near the end.

## Bootstrap the App

We are diving right in from a bare CRA. The task was simple enough - render a heading
and some button to the screen.

We added a Dialog, using `@reach/dialog` which was small and fun. Kent reckons that
code base is a good one to learn from. https://github.com/reach/reach-ui

It might be interesting to have a look at the code base and think about why it is
effective and what patterns I could use. One of the upcoming workshops is on React
patterns, so that will probably useful in this context.

## Styling

Kent presents an opinionated approach to React. He is sharing what he thinks is the
best approach based on his experience in production and teaching. He suggests using
`emotion` and `CSS-in-JS`. He likes Tailwind and almost taught with that but decided
at the last moment to stick with this as it was potentially too much to learn.

I'm a Tailwind fan too but this was my first exposure to `emotion`.

There are two ways to use emotion. You can create a styled component:

```jsx
import styled from '@emotion/styled'

const Button = styled.button`
  color: turquoise;
`
```

You can use object notation

```javascript
const Button = styled.button({
  color: 'turquoise',
})
```

Or you could even pass a function that will return the styles:

```javascript
const Button = styled.button(props => {
  return {
    color: props.primary ? 'hotpink' : 'turquoise',
  }
})

// or with the string form - as long as what you return is valid css

const Button = styled.button`
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`
```

This library allows us to use hover states and pseudo selectors which is one drawback
of Tailwind.

The second way to use it is with the CSS prop - which means you can avoid single
use components (`Wrapper`, `Container`, etc). This is similar to the inline styles
prop but you can use the pseudo-selector.

You have to override the `JSX` parser and then use the css prop either with the
object or css syntax.

This at the top of every relevant file:

```javascript
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core'
import React from 'react'
```

and then you can do this:

```jsx
function SomeComponent() {
  return (
    <div
      css={{
        backgroundColor: 'hotpink',
        '&:hover': {
          color: 'lightgreen',
        },
      }}
    >
      This has a hotpink background.
    </div>
  )
}

// or with string syntax:

function SomeOtherComponent() {
  const color = 'darkgreen'

  return (
    <div
      css={css`
        background-color: hotpink;
        &:hover {
          color: ${color};
        }
      `}
    >
      This has a hotpink background.
    </div>
  )
}
```

This was a longer exercise and I didn't get a chance to finish it up before Kent
called us back from our breakout rooms.

In the styled component, you can pass in as many CSS objects as you like. It will
use something like Object.assign and so the latter the object the more priority
it will have.

With emotion, we can opt back into the CSS cascade and pass on some styles to
children of a similar type.

```js
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
      onSubmit={handleSubmit}
    >
```

Importable Babel plugins are something that Kent helped develop and allow for
customisation of the parsing, building and printing processes. Emotion provides a
plugin for their version of JSX (which basically just adds support for the CSS prop).
The emotion `styled/macro` variant attaches the name of the
component to the classname allowing you to trace where the styling is coming from.
This is really helpful for debugging.

Media-queries and variables are all available. So stop hankering for SASS! :)

## Data fetching

We are behind time and we're going super fast now. Kent introduces the concept of
having a API client handler. This means that you don't have to deserialize the data
every time and can abstract some of those details away.

Having a hook that encapsulates some of the logic makes things more managable and
useful.

What was helpful for me here was thinking about tidying up my components by extracting
this data logic to a single point. No longer changing `res => res.json()` on every
call. Now it's been pointed out it feels really obvious but that's true with most
insightful insights :)

## Authentication

There are lots of different ways to authenticate - basically you need to be able to
deal with your backend.

There was a lot in this section - I need to review this again. I'm thinking a lot
about applications I'm writing at the moment and there are lots of things here that
would be useful to implement immediately.

Full page refresh:

```jsx
window.location.assign(window.location)
```

## Routing

This is using React Router 6 which is in beta at the moment but is likely to be
released very soon.

The router doesn't have to be top level - we can keep it at the least common parent
and, in this case, just wrap the AuthenticatedApp.

The BrowserRouter provides the Context.Provider that is needed to pass the props
between the various components of react-router.

href -> to

Redirect component needs a `from` prop.

## Cache Management

Kent points out that cache management can be grouped into two buckets:

1. UI state
2. Server cache

When these are conflated, we can introduce unnecessary complexity. Given that
caching is one of the hardest problems in software development, that's not a good
thing :)

Kent suggests [`react-query`](https://github.com/tannerlinsley/react-query) as a
good solution for managing the server cache. It provides hooks to query, cache and
mutate data in a way that is flexible enough for most use cases.

Time was running out for this exercise and Kent ran a poll - most wanted Kent's
explanations and talk-through. This is where the service worker was really playing
up and so it was more challenging to follow.

I took an hour to do this exercise myself after the workshop.

The components had to be swapped out in a lot of places, so this exercise hit a lot
of files. But, the main crux of the change was in creating a listItems client.

I really liked how this was set up.

Firstly, there was a listItemsClient - this had the specific CRUD operations for this data type.

Then, a list-items file was used to gather the hooks that made use of those client operations. They aren't
handled explicitly but instead are carried out by the `useMutation` hook from
`react-query`.

These hooks are then brought into the components and the `update`/`create`/`delete`
are destructured from the array returned from the `useMutation`.

So, in the component we see the things we want (`update`, `create`, `delete`). In
the client, we see the explicit CRUD operations and the hooks file holds it all
together.

This was an awesome section but probably could have been a workshop on it's own! :)
