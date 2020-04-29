---
title: 'Streamed and Released a npm package!'
date: '2020-04-29T14:54:04+0000'
layout: post
draft: false
path: '/posts/releasing-gatsby-theme-pkm-garden/'
category: 'Gatsby'
tags:
  - 'Streaming'
  - 'npm'
  - 'Themes'
  - 'egghead.io'
description: ''
---

I mentioned on here earlier in the week that I was going to be doing a live
stream on Monday. That happened and it was awesome. We even managed to publish
what we'd done to npm within our 2 hour time window!

There were 5 of us on the stream and about 15-20 people in the chat. It felt calm
and intimate (I actually forgot I wasn't on my own for chunks of the time and
was humming and singing to myself).

We took the wiki in my blog and broke it out to it's own package.

I'd done a little bit of work beforehand setting up this blog as a yarn workspace
so we could import the local module while working on it. I showed how I'd done that
and gave props to [Jason](https://egghead.io/courses/gatsby-theme-authoring) and
[Chris](https://egghead.io/courses/composable-gatsby-themes) for their courses
(Chris was in the chat for a while and gave some helpful insights at various points).

We then went through the functionality of the wiki part of the blog.

> Fun fact: It's not actually a wiki, we discovered. Wikis are colloborative in
> nature but this is more personal. During the stream we started referring to it
> as a PKM (Personal Knowledge Management for those in the know) Garden.

There are a few things going on:

- There is the file system. This is where you create, edit and curate your notes.
  - The folders are the topics which contain the notes.
- We then have the `gatsby-config.js` which uses the `gatsby-source-filesystem`
  resolver to get all the files in our PKM (wiki) directory and label them as wiki
  content.
- After that, we have the `gatsby-node.js` which creates a page for each note,
  groups the notes together into topics and then creates pages for those topics and
  finally created a top-level page.
- Finally, we have the components and templates that are used to generate the pages
  for each of those pieces.

The finished information architecture looks something like this:

```js
<Breadcrumbs />

<Topics>
  <TopicList>
    <Topics>
  </TopicList>

  <NotesList>
    <Notes>
      <Note />
    <Notes>
  </NotesList>
</Topics>
```

You can have infinitely nested topics and sub-topics and sub-sub-sub-sub ... well,
you get the idea.

We finished by writing some documentation and getting the theme up on npm. It's
available [here](https://www.npmjs.com/package/gatsby-theme-pkm-garden) if you want
to install it and the development repo is [here](https://github.com/doingandlearning/gatsby-theme-pkm-garden).

The stream was a lot of fun and will be available on egghead soon.

I'm trying to work out how to make the theme more flexible now. How do I make it
easier for people to restyle and break what I've done to make it their own thing?

All of the components above can be shadowed by end users so they can add their own
flavour. I don't know if there is more I could do to make it easier.

I have some next steps planned and Maggie was on the stream thinking about some
of their next things. For me, I want to look at images, bi-directional links,
preview snippets and
(the thing that really excited my from Maggie's thinking) having different styles
for different types of notes - like from a book, movie, podcast, course, etc. That
sounds awesome and cool.

Other than that, I'm looking around for other ideas, actually tending my garden
and generally loving thinking and learning.
