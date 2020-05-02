# Table of Contents

1.  [Helpful links:](#org090d8c5)
2.  [Things that we need to do to implement this:](#org1af7a1c)
    1.  [Microformats2 - how to mark the html to extract the json correctly](#org11ffb79)
    2.  [Adding the webmention plugin](#org0f16234)
    3.  [Getting page level webmentions](#orgb2ff9b3)
    4.  [Linking Twitter to the blog](#org620ea04)
    5.  [Implementing the front end](#orga8f5bcb)
    6.  [Triggering a new build on a new mention](#orgd82014b)

<a id="org090d8c5"></a>

# Helpful links:

[Getting started with Webmentions in Gatsby | Knut Melvær](https://www.knutmelvaer.no/blog/2019/06/getting-started-with-webmentions-in-gatsby/)

[GitHub - ChristopherBiscardi/gatsby-plugin-webmention: https://webmention.io/&#x2026;](https://github.com/ChristopherBiscardi/gatsby-plugin-webmention)
<https://indieweb.org/gatsby>

[Chris Biscardi&#x27;s Digital Garden](https://www.christopherbiscardi.com/post/building-gatsby-plugin-webmentions)
<https://brid.gy>

[Webmention.io](https://webmention.io/)

<a id="org1af7a1c"></a>

# Things that we need to do to implement this:

- What are Webmentions?

<a id="org11ffb79"></a>

## Microformats2 - how to mark the html to extract the json correctly

- microformats2 -[h-card · Microformats Wiki](http://microformats.org/wiki/h-card)
  - To validate markup:

<https://indiewebify.me/>

[PHP Microformats Parser](https://pin13.net/mf2/)

```html
<article class="h-card">
  <header>
    <img class="u-photo" src="http://..." />
    <h1 class="p-name">The Title</h1>
  </header>
  <p class="p-summary e-content">The summary</p>
  <footer>
    <a class="u-url p-name" href="http://...">The author</a>
  </footer>
</article>
```

extracts data of this form:

```json
{
  "items": [
    {
      "type": ["h-card"],
      "properties": {
        "name": ["The Title", "The author"],
        "summary": ["The summary"],
        "photo": ["http://..."],
        "url": ["http://..."],
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
```

<a id="org0f16234"></a>

## Adding the webmention plugin

- Installing Chris' `gatsby-plugin-webmention`

  - gatsby-config.js

```js
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
```

    - Webmentions token is found here:
        [Webmention.io](https://webmention.io/settings)
      - need to make sure this is added as an environment variable

<a id="orgb2ff9b3"></a>

## Getting page level webmentions

- Generate and put the post’s URL into context from gatsby-node.js
- Filter the allWebMentionEntry with the URL aka 'the permalink'

- This is taken from Knut's walk-through:

```js
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
        permalink: `https://www.knutmelvaer.no${path}`,
      },
    })

    createPageDependency({ path, nodeId: id })
  })
```

and the GraphQL query:

```graphql
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
```

<a id="org620ea04"></a>

## Linking Twitter to the blog

- Simplest way to get webmentions is with brid.gy

<a id="orga8f5bcb"></a>

## Implementing the front end

<a id="orgd82014b"></a>

## Triggering a new build on a new mention
