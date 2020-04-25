---
title: 'Kent C. Dodds - Building React Apps Part 2'
date: '2020-04-22T16:45:44+0000'
layout: post
draft: false
path: '/posts/kcd-building-react-apps-2/'
category: 'React'
tags:
  - 'Workshop'
  - 'React'
  - 'Kent C. Dodds'
  - 'egghead.io'
description: 'egghead workshop - Building React Apps (the Sequel)'
---

There was a lot of setup today. Kent had done a lot of amazing work to be able to make the workshops work more smoothly and has a great CLI tool for switching between lessons and branches.

## Context

After all I've looked at over the past month, this was a great opportunity to put the use of context into practice. The first bit, was totally natural - using the context to pass down values that are consumed that way instead of being passed down as props. Kent has a post :)

[Prop Drilling](https://kentcdodds.com/blog/prop-drilling)

We then did more and moved all of the Auth logic out of the main app and moved to a useAuth() hook.

Here's a relevant and helpful talk from Michael Jackson.
`youtube:https://www.youtube.com/watch?v=3XaXKiXtNjw&feature=emb_title`

Interesting to see the source baseUrl which is slightly different for Next. There is an answer [here](https://stackoverflow.com/questions/59474480/using-baseurl-in-jsconfig-json-not-working-with-nextjs) which looks good.

Also, setting up a custom error from the `useAuth` hook was pretty helpful. We then looked co-locating global context providers to help with source management. This really tidied up the code and made it feel much cleaner.

## Flexible Component

When you have components are similar, we can often try to extract the code. The problem with that is we often end up passing down a lot of props to alter it. We can create more flexible components though.

Kent has a talk to watch for more on this concept called `Simply React`:
`youtube:https://www.youtube.com/watch?v=AiJ8tRRH0f`

In our exercise, this ended up with a component that had more code. But it was clearer and more explicit. We used context, providers and `React.cloneElement` - what we got was composable and useful in a range of contexts.

It's a great exercise to think about how much the abstractions we are making are useful - just because we are being DRY doesn't mean we are being more effective.

## Performance

This is a good follow-up and application of the performance workshop from earlier in the course. We looked at a few things:

- Lazy loading of components (this doesn't work with SSR because `React.Suspense` doesn't work with ReactDOMServer)
- Memoizing context values
- Code splitting
- Profiling

We covered each of these in some way in the React Performance workshop but this was a great opportunity to increase those skills and put them to the test.
