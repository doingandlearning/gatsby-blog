# Table of Contents

1.  [@tomcritchlow](#org122592c)
2.  [User stories:](#org52cd3da)
    1.  [As a user I want to be able to &#x2026;.](#org7183756)
3.  [Technical challenges:](#org1d20465)
    1.  [Storage](#org13bf7e6)
    2.  [Realtime editing](#orgd3b7624)
    3.  [Bi-directional linking](#org0c4d8b6)
    4.  [Permissions/sharing](#org27371f5)
    5.  [Exporting notes in their entirety](#orgc49d487)
    6.  [Posting directly to a wiki/garden/blog](#org5737714)
    7.  [Hosting costs](#org9e37c20)
    8.  [Uptime](#org8e6cce0)
    9.  [Importing from other platforms](#org9c2a2a4)

- **tags:** Tom Critchlow, [Digital Gardens](digital_gardens.md), Multiplayer

  <span class="timestamp-wrapper"><span class="timestamp">&lt;2020-05-30 Sat&gt;</span></span>
  Tom posted a tweet and I replied - looks really interesting.

<a id="org122592c"></a>

# @tomcritchlow

If I had time and node skills I&rsquo;d build a platform that had:

- private notes and knowledge management as first party object
- publish to public wiki/garden
- publish to blog
- all multi-author and real time editable
- store all files as markdown behind the scenes for archive

<a id="org52cd3da"></a>

# User stories:

<a id="org7183756"></a>

## As a user I want to be able to &#x2026;.

- Have a fast and speedy way to take notes
- Use markdown or similar that I&rsquo;m familiar with
- Link notes bi-directionally
- Have confidence in how my data is stored - encrypted at rest?
- Easily share specific notes to my public wiki/garden
- Share editing privileges for specific notes
- Have real-time editing experience
- Easily export my data in markdown

<a id="org1d20465"></a>

# Technical challenges:

<a id="org13bf7e6"></a>

## Storage

- How do we store?
  - Database blobs of markdown?
    Having the data at rest in a db will allow for speedier retrieval, searching, linking, etc than having them in markdown from the get-go.
  - Some kind of serialized object
  - Does everyone have their own db like in Roam? Is that an actual distinct db?

<a id="orgd3b7624"></a>

## Realtime editing

Imagine this is going to be websockets based. Pretty well supported in browsers and can be secure.

<a id="org0c4d8b6"></a>

## Bi-directional linking

- Could use a Roam like [[]] syntax and generate nodes automatically.
- Is there a better UX experience out there yet? Is there one to be created here?

<a id="org27371f5"></a>

## Permissions/sharing

- How is sharing managed across databases? Do users have to be authenticated on the system to be able to edit? Do we use a 3rd party OAuth provider for this or is FAANG to be avoided?

<a id="orgc49d487"></a>

## Exporting notes in their entirety

Shouldn&rsquo;t be a big deal - a multi-level job.

<a id="org5737714"></a>

## Posting directly to a wiki/garden/blog

Assuming this is a custom platform owned by the user then there would need to be a growing community of plugins - gatsby/wordpress/jekyll/contentful/ghost/tiddlywiki - would need to explore each of those formats and develop separate approaches.

<a id="org9e37c20"></a>

## Hosting costs

Zonks! All the data. I guess it&rsquo;s plain text for the most part with links to images? We&rsquo;d not necessarily store those but embed them for viewing.

<a id="org8e6cce0"></a>

## Uptime

We&rsquo;d need to be confident that people could use this service reliably and constantly.

<a id="org9c2a2a4"></a>

## Importing from other platforms

People will want to bring their Roam database and give it a go.
