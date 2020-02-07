---
title: 'Migrating from Create-React-App to Gatsby Stream'
date: '2020-02-02T18:59:45+0000'
layout: post
draft: false
path: '/posts/migrating-gatsby-stream/'
category: 'Gatsby'
tags:
  - 'Gatsby'
  - 'CRA'
  - 'React'
  - 'egghead.io'
description: 'Migrating an existing CRA app to Gatsby'
---

I attended a live stream on Friday put on by egghead and delivered by [Khaled Garbaya](https://khaledgarbaya.net/).

> Over 90 minutes, follow Khaled as he walks through a process for migrating an existing application from Create-React-App to Gatsby.

The event was billed as a way to migrate existing apps from create-react-app to Gatsby which sounded really interesting. In the end, it was more how to use Gatsby to get up and running instead of CRA.

This wasn't what I thought I was attending but it was interesting and useful none-the-less. This stream was closer to Khaled's most recent blogpost on [Gatsby as an alternative to CRA](https://khaledgarbaya.net/articles/gatsby-as-a-replacement-for-create-react-app).

I'm not sure who the intended target audience were but there were some interesting things I picked up and was reminded of.

### Gatsby and CRA are both great starting points for React development.

I've personally been using NextJS as the starting point for my React projects over the past while. File-based routing out of the box with Next is great. I didn't realise the Gatsby did this without additional config as well. NextJS does really great file based dynamic routing for pages and api routes which I think is better here but great to see Gatsby has this as well.

### Gatsby from `npm install gatsby react react-dom`

When I've built Gatsby sites before, I've either used `now` or the `gatsby new` command which give a basic level of structure before you get going. It was really interesting to see what you get out of the box and some of the basic first principles of onCreatePage and createPages API as Khaled treated them.

### The unified GraphQL layer

I use GraphQL for this blog and I have some experience with other side-projects using it. Mostly though, I'm still querying and parsing Rest APIs (and on one recent project SOAP API - vomit!). I find GraphQL quite compelling and I think I want to look more into querying an API on build-time vs. dynamically on access.

### Authentication

Khaled looked a bit at private routing and authentication and his approach here was interesting. He was using Netlify's built in authentication tools. I've been using a lot of Auth0 in recent projects which has been good but not perfect. I'd be interested to dig a bit more into Netlify's protocols here and see if it would be useful for future projects.

### Final thoughts

Khaled was a knowledgeable and skilled communicator. I'm really enjoying working with `now.sh` (rather than Netlify) and `NextJS` but I see Gatsby as a great project too and want to learn more about it. I'm hoping the final course will look more like the migration that I thought this stream promised. I think there would be lots to learn there and I'm looking forward to finding out more.

### Notes

I'm trying to explore different ways of taking notes during learning (videos, courses, steams). I've recently being using Roam and my notes from this course are [here](https://roamresearch.com/#/app/starting-db/page/BTFt2M_Wb). I found code input frustrating with Roam for this and jumped over to VSCode for the code snippets of Khaled's input. I think I might just try using VSCode and Bear for the next event I take part in.
