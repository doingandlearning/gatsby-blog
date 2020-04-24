---
title: 'Kent C. Dodds - React Suspense'
date: '2020-04-20T15:22:38+0000'
layout: post
draft: false
path: '/posts/kcd-react-suspense/'
category: 'React'
tags:
  - 'React'
  - 'workshop'
  - 'Kent C. Dodds'
  - 'egghead'
description: 'Workshop 7/8 - looking at experimental React suspense.'
---

So, this has been a wild ride through React. We've gone deep into the library and touched on so many different aspects of workflow, technical points and general community exposure.

This has all been happening while lockdown has ramped up. That has made it look pretty strange - I've been doing these for several evenings while Kath has done bedtime in lockdown as a React widow. I think it's been useful professionally and is having an impact on my code already.

Kent was really clear that this whole workshop is based on experimental features - what we do today is likely not to be how we will do it when these features are launched for real.

In fact, 3 days ago there was an update to the latest alpha which has an impact on the last exercise.

# 💪 Simple Data-fetching

So, the whole root of the app needs to be either concurrent or sync (what we have now). When we have a component, at a high level we throw a promise when we don't have any data. When it is resolved we will have the data. So, rather than throwing errors we are throwing promises.

It's weird to need to throw promises but it makes sense. We are letting React know that we will have the data at some point and that rendering shouldn't happen until that has happened.

> Why do you throw the promise instead of returning it?

Often, we won't be throwing the promise ourselves in the future and we'll call to a function and get back the data that we want. This stops having to use a lot of if statements in our code.

We need to make sure that we wrap any suspending components with a `<React.Suspense>` so that when the Promise it thrown the component knows what to fall back to.

ErrorBoundary is something we can use already. Kent recommends `react-error-boundary`. This has to be a class component.

Interesting to see `createResource` function - I wonder if it's a bit like `react-query`.

> Do you expect SWR and react-query to support suspense?

react-query already has the toggle.

# 💪 Render as you fetch

This isn't something that you necessarily need Suspense for but Suspense makes it easier.

<blockquote className="twitter-tweet"> <a href="https://twitter.com/kentcdodds/status/1191922859762843649">Nov 6, 2019</a></blockquote>

Render as you fetch means you get the things you need straight away. So, we squeeze everything over to the left in our waterfall diagram.

In the exercise, we used the `createResource()` function which was cool. The nice thing about this from the developer experience is we don't care if the component is ready - the resource will throw a promise and that will keep the component from rendering until the information is available.

> What if there are two sources of data we need to fetch? I'd use a Promise.all but wondering how that would work with more than one.

These fetch requests are triggered when the resource is created, so by the time we get to the component the data is likely to be almost there and have started being fetched. This means they are going ahead simultaneously even though they are called in sequence.

Looked a bit at error boundaries and Kent suggested using the key on the ErrorBoundary to force a rerender of the component.

https://www.youtube.com/watch?v=ZCuYPiUIONs

# 💪 useTransition for improved loading states

Lots of research to suggest that is a better experience for users to see no loading experience - even with a delay between interaction and response. Users will always judge the first as slower, even if it is faster.

This is built into the Suspense API. So, we'll need to use the `useTransition` hook to more finally tune how long React waits before it goes to the fallback. More knobs we can turn.

There are lots of settings in the SUSPENSE_CONFIG that can be tweaked to allow for a more bespoke experience. We can seek to try to avoid the flash of loading content. Sometimes it is better to allow every user to see at least a few hundred ms of the loading spinner to stop a flash. You can get a loading state that appears for at least, say, 300ms but only if it takes more than 200ms to resolve in the first place.

# 💪 Cache resources

This was about setting up our own custom cache, was pretty cool though in this implementation it wouldn't be possible to invalidate. Just use react-query - it's awesome!

```js
const getPokemonResource = name => {
  if (pokemonResource.name) {
    return pokemonResource.name
  } else {
    pokemonResource.name = createPokemonResource(name)
  }
  return pokemonResource.name
}
```

# 💪 Suspense Image

This was really cool - this was creating a cache of pre-fetched images so that when they are called we have them or pre-fetch them. Really nice.

I can't think why it wouldn't be possible without Suspense. Is there an equivalent approach that maybe doesn't rely on throwing promises? Would there even be any issue with throwing promises here? The image will be in the cache and it'll be all good.

Nope - but you'd need to handle all of the loading states yourself. Interesting to think about how to implement that.

```js
const imgSrcCache = {}

function preloadImage(src) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => resolve(src)
  })
}

function Img({ src, ...props }) {
  let source = imgSrcCache[src]

  if (!source) {
    source = createResource(() => preloadImage(src))
    imgSrcCache[src] = source
  }

  return <img src={source.read()} {...props} />
}
```

# 💪 Suspense with a custom hook

This was a useful exercise in extracting a custom hook in suspense. It feels like another way to create a cache and I guess that's the point of this - we are being more sophisticated in how we ensure a better user experience around data fetching.

In this instance, part of the logic was inside of an event handler but this could be restructured to be a useEffect with the changing event as a dependency.

# 💪 Coordinate Suspending components with SuspenseList

This is the section which is even more up in the air and likely to change when it comes to the final version to be quite different. `SuspenseList` is likely to be the way to coordinate the loading experience for the user.

This is from the React docs

```jsx
<SuspenseList revealOrder="forwards">
  <Suspense fallback={'Loading...'}>
    <ProfilePicture id={1} />
  </Suspense>
  <Suspense fallback={'Loading...'}>
    <ProfilePicture id={2} />
  </Suspense>
  <Suspense fallback={'Loading...'}>
    <ProfilePicture id={3} />
  </Suspense>
</SuspenseList>
```

At the moment, the props look like this:

The `SuspenseList` component has the following props:

- `revealOrder`: the order in which the suspending components are to render
  - `{undefined}`: the default behavior: everything pops in when it's loaded (as
    if you didn't wrap everything in a `SuspenseList`).
  - `"forwards"`: Only show the component when all components before it have
    finished suspending.
  - `"backwards"`: Only show the component when all the components after it have
    finished suspending.
  - `"together"`: Don't show any of the components until they've all finished
    loading
- `tail`: determines how to show the fallbacks for the suspending components
  - `{undefined}`: the default behavior: show all fallbacks
  - `"collapsed"`: Only show the fallback for the component that should be
    rendered next (this will differ based on the `revealOrder` specified).
  - `"hidden"`: Opposite of the default behavior: show none of the fallbacks
- `children`: other react elements which render `<React.Suspense />` components.
  Note: `<React.Suspense />` components do not have to be direct children as in
  the example above. You can wrap them in `<div />`s or other components if you
  need.

Interesting page in the docs [comparing traditional approaches to suspense](https://reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense)
