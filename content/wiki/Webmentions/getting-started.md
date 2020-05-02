# Table of Contents

1.  [Helpful links:](#org91c942b)
2.  [Things that we need to do to implement this:](#org295a8e9)
    1.  [How to get validated/authenticated on webmention.io](#org1499d2d)
        1.  [You can use any social link on your profile (Twitter/Github/Email)](#orgf5e0aac)
        2.  [Add the property rel with the value me to the link, on my blog this looked like](#org25f2db1)
        3.  [Return to webmention.io, enter your url and it will redirect you to one of the auth providers. Authenticate on that provider and webmention will check if the url on that account matches the url you sent it to.](#org8aadea2)
    2.  [Microformats2 - how to mark the html to extract the json correctly](#orgd2a5a8f)
        1.  [I had an issue that all of my Twitter and site generally use https://kevincunningham.co.uk whereas webmention.io was expecting it to be https://www.kevincunningham.co.uk - the following code is suggested:](#orgfe18b22)
    3.  [Adding the webmention plugin](#org15c6da2)
    4.  [Getting page level webmentions](#orgdc8aa8e)
    5.  [Linking Twitter to the blog](#org7bcf8d6)
    6.  [Implementing the front end](#org92c0e43)
    7.  [Triggering a new build on a new mention](#orgc9b42d0)

<a id="org91c942b"></a>

# Helpful links:

[Getting started with Webmentions in Gatsby | Knut Melvær](https://www.knutmelvaer.no/blog/2019/06/getting-started-with-webmentions-in-gatsby/)

[GitHub - ChristopherBiscardi/gatsby-plugin-webmention: https://webmention.io/&#x2026;](https://github.com/ChristopherBiscardi/gatsby-plugin-webmention)

<https://indieweb.org/gatsby>

[Chris Biscardi&#x27;s Digital Garden](https://www.christopherbiscardi.com/post/building-gatsby-plugin-webmentions)

<https://brid.gy>

[Webmention.io](https://webmention.io/)

[Clientside Webmentions: Joining the IndieWeb with Svelte](https://www.swyx.io/writing/clientside-webmentions/)

<a id="org295a8e9"></a>

# Things that we need to do to implement this:

- What are Webmentions?

<a id="org1499d2d"></a>

## How to get validated/authenticated on webmention.io

<a id="orgf5e0aac"></a>

### You can use any social link on your profile (Twitter/Github/Email)

<a id="org25f2db1"></a>

### Add the property rel with the value me to the link, on my blog this looked like

    <a
                  href={`https://www.twitter.com/${links.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  <i className="icon-twitter" />
                </a>

<a id="org8aadea2"></a>

### Return to webmention.io, enter your url and it will redirect you to one of the auth providers. Authenticate on that provider and webmention will check if the url on that account matches the url you sent it to.

<a id="orgd2a5a8f"></a>

## Microformats2 - how to mark the html to extract the json correctly

- microformats2 -[h-card · Microformats Wiki](http://microformats.org/wiki/h-card)
  - To validate markup:

<https://indiewebify.me/>
[PHP Microformats Parser](https://pin13.net/mf2/)

    <article class="h-card">
      <header>
        <img class="u-photo" src="http://...">
        <h1 class="p-name">The Title</h1>
      </header>
      <p class="p-summary e-content">The summary</p>
      <footer>
        <a class="u-url p-name" href="http://...">The author</a>
      </footer>
    </article>

extracts data of this form:

    {
      "items": [
        {
          "type": [
            "h-card"
          ],
          "properties": {
            "name": [
              "The Title",
              "The author"
            ],
            "summary": [
              "The summary"
            ],
            "photo": [
              "http://..."
            ],
            "url": [
              "http://..."
            ],
            "content": [
                {
                  "html": "The summary",
                  "value": "The summary"
                }
            ]
          }
        }
      ],
      "rels": {},
      "rel-urls": {}
    }

<a id="orgfe18b22"></a>

### I had an issue that all of my Twitter and site generally use <https://kevincunningham.co.uk> whereas webmention.io was expecting it to be <https://www.kevincunningham.co.uk> - the following code is suggested:

    <link rel="webmention" href="https://webmention.io/www.kevincunningham.co.uk/webmention" />
    <link rel="pingback" href="https://webmention.io/www.kevincunningham.co.uk/xmlrpc" />

However, Gatsby doesn&rsquo;t allow the link element, instead I used an a tag and applied `display:none`

<a id="org15c6da2"></a>

## Adding the webmention plugin

- Installing Chris&rsquo; `gatsby-plugin-webmention`

  - gatsby-config.js

        {
          resolve: `gatsby-plugin-webmention`,
          options: {
            username: 'www.knutmelvaer.no', // webmention.io username
            identity: {
              github: 'kmelve',
              twitter: 'kmelve' // no @
            },
            mentions: true,
            pingbacks: true,
            domain: 'www.knutmelvaer.no',
            token: process.env.WEBMENTIONS_TOKEN
          }
        }

    - Webmentions token is found here:[Webmention.io](https://webmention.io/settings)
      - need to make sure this is added as an environment variable

<a id="orgdc8aa8e"></a>

## Getting page level webmentions

- Generate and put the post’s URL into context from gatsby-node.js
- Filter the allWebMentionEntry with the URL aka &ldquo;the permalink&rdquo;
  - I just used the URL and added it to the createPages I already had.
- This is taken from Knut&rsquo;s walk-through:

      postEdges
        .filter(edge => !isFuture(edge.node.publishedAt))
        .forEach((edge, index) => {
          const { id, slug = {}, publishedAt } = edge.node
          const dateSegment = format(publishedAt, 'YYYY/MM')
          const path = `/blog/${dateSegment}/${slug.current}/`

          createPage({
            path,
            component: require.resolve('./src/templates/blog-post.js'),
            context: {
              id,
              permalink: `https://www.knutmelvaer.no${path}`
            }
          })

          createPageDependency({ path, nodeId: id })
        })

  and the GraphQL query:

      allWebMentionEntry(filter: {wmTarget: {eq: $permalink}}) {
        edges {
          node {
            wmTarget
            wmSource
            wmProperty
            wmId
            type
            url
            likeOf
            author {
              url
              type
              photo
              name
            }
            content {
              text
            }
          }
        }
      }

<a id="org7bcf8d6"></a>

## Linking Twitter to the blog

- Simplest way to get webmentions is with brid.gy

<a id="org92c0e43"></a>

## Implementing the front end

This is my frontend implementation adapted from Knut&rsquo;s tutorial:

    import React from 'react'

    export default function WebMentions({ edges }) {
      const likes = edges.filter(({ node }) => node.wmProperty === 'like-of')
      const likeAuthors = likes.map(
        ({ node }) => node.author && { wmId: node.wmId, ...node.author }
      )
      const reposts = edges.filter(({ node }) => node.wmProperty === 'repost-of')
      const repostAuthors = reposts.map(
        ({ node }) => node.author && { wmId: node.wmId, ...node.author }
      )

      const replies = edges.filter(
        ({ node }) =>
          node.wmProperty === 'in-reply-to' || node.wmProperty === 'mention-of'
      )

      const AuthorCard = ({ author }) => {
        return (
          <a href={author.url} key={author.url}>
            <img
              alt={author.name}
              src={author.photo}
              key={author.wmId}
              className="rounded-full w-12 h-12"
            />
          </a>
        )
      }
      return (
        <div className="pt-4">
          <h3>Webmentions</h3>
          <h4>
            {likes.length === 0 ? (
              <p>No likes or reposts yet.</p>
            ) : (
              <p>{`${likes.length + reposts.length} likes and reposts`}</p>
            )}
          </h4>
          <div className="flex flex-wrap">
            {likeAuthors.map(author => (
              <div className="px-2">
                <AuthorCard author={author} />
              </div>
            ))}
            {repostAuthors.map(author => (
              <div className="px-2">
                <AuthorCard author={author} />
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <div>
            <h3>The conversation continues ...</h3>
            {replies.length > 0 ? (
              <>
                {replies.map(({ node }) => {
                  return (
                    <div className="grid grid-cols-12 m-3" key={node.wmId}>
                      <AuthorCard author={node.author} className="col-span-3" />
                      <a
                        className="col-span-9 text-black cursor-pointer"
                        href={node.wmSource}
                      >
                        {node.content.text}
                      </a>
                    </div>
                  )
                })}
              </>
            ) : (
              <p>No conversation yet.</p>
            )}
          </div>
        </div>
      )
    }

<a id="orgc9b42d0"></a>

## Triggering a new build on a new mention

- I&rsquo;m with Vercel and I had to set this up through a Git hook - got the hook from the Vercel dashboard and passed it to Webmention.io.
