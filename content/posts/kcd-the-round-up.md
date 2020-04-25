---
title: 'Reflecting on the KCD React Marathon'
date: '2020-04-24T14:56:12+0000'
layout: post
draft: false
path: '/posts/kcd-kent-marathon/'
category: 'React'
tags:
  - 'Kent C. Dodds'
  - 'egghead.io'
  - 'Workshops'
  - 'React'
description: 'What I learnt by attending 8x5hr workshops with Kent C. Dodds'
---

I studied Maths and Theoretical Physics at Uni, trained as a Maths teacher and spent over a decade teaching Maths to 11-18 year olds. I helped train teachers, led training and had good results over the years. When I left the classroom to transition to developing full-time I expected I'd encountered the best teaching had to offer. Over the past month, Kent C. Dodds has challenged that expectation - challenged and destroyed.

I entered this React Marathon - or `Epic React Masterclass` - spending a good chunk of my time coding React having transitioned from primarily back-end development. I knew how to get things working and could mostly Google-Fu my way through a problem.

I left this course knowledgeable about the inner workings of React and having been indoctrinated by Kent's opinionated and informed strategies for developing React apps.

The best news is Kent is creating an awesome resource, [Epic React](https://www.epicreact.dev), where he is going to make this content available over and over again. I can't recommend strongly enough that you should sign up for this when it is released if you write React professionally.

Here are five of the things that have changed in my code since this finished.

## Colocate State

State is a pretty challenging problem in React. Before I was using context and state in a slightly more haphazard way. I was hoisting state to the least common parent of components that needed it. This isn't _bad_ but I'm definitely more conscious of keeping state where it is needed. It makes things more straightforward and also helps to make components more shareable and generalizable.

## react-query

Kent and Tanner (the author of react-query) sing from the same hymn sheet around separating state. The argument is that server cache is not the same as state and trying to keep local state in sync with remote state can be a losing battle. React Query uses a stale-while-revalidating (SWR) approach, your data stays in sync, you can invalidate and it is super fast. This makes the sharing of state much less complicated and the local state is what it should be - UI and locally scoped.

## Custom Hooks

I didn't really understand custom hooks before this. My components probably had more logic in them than they should have done. I now am much more confident at abstracting and pulling out hook based logic, making the code shareable and the components tiny and clean.

## useMemo

I now understand why and where I'd memoize values - where it is worth thinking about and where it isn't worth it. I'm clearer about the dependency arrays.

## Performance

I've a clearer idea of what to watch for, what to check for and how to be confident I can find performance issues and improve upon them.

---

I learnt so much and I have 8 other blog posts covering the details of each workshop. As I continue to digest the information, return the material and encounter new applications in my daily work I'll continue to post about that here.

Kent is an _outstanding_ teacher - and I used to have to grade teachers with that exact term. He gives an amazing minute to usefulness ratio - not a second of his videos and lessons is filler. It got a bit boring for me to give feedback because it was feeling sycophantic. He's a funny, humble guy who has a lot to teach. Have I mentioned [Epic React](https://epicreact.dev)? Don't miss it when it releases!
