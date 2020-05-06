const lost = require('lost')
const pxtorem = require('postcss-pxtorem')
require('dotenv').config()

const url = 'https://www.kevincunningham.co.uk'
module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: 'Kevin Cunningham. Doing and Learning.',
    subtitle:
      'Freelance web-developer, building interesting things on the web. Based in Brighton.',
    copyright: '© All rights reserved.',
    disqusShortname: '',
    description: 'Do. Learn.',
    menu: [
      {
        label: 'Blog',
        path: '/blog',
      },
      {
        label: 'Books',
        path: '/books/',
      },
      {
        label: 'Week notes',
        path: '/weeknotes/',
      },
      {
        label: 'Garden',
        path: '/wiki',
      },
      // {
      //   label: 'Contact me',
      //   path: '/contact/',
      // },
    ],
    author: {
      name: 'Kevin Cunningham',
      email: 'blog@kevincunningham.co.uk',
      twitter: 'dolearning',
      github: 'doingandlearning',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/books`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/wiki`,
        name: 'wiki',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/week-notes`,
        name: 'weeknotes',
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://doingandlearning.us15.list-manage.com/subscribe/post?u=72c68ddfdcc887b8f2f127f3f&amp;id=5aab8a7f77', // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], // Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            },
          },

          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem;' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-plugin-og-image',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              ),
            query: `
            {
              allMdx(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: { date: {ne: null}}}) {
                edges {
                  node {
                    excerpt
                    body
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
            
            `,
            output: '/rss.xml',
            title: "Kevin Cunningham's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-twitter`,
    '@aengusm/gatsby-theme-brain',
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: 'www.kevincunningham.co.uk', // webmention.io username
        identity: {
          github: 'doingandlearning',
          twitter: 'dolearning', // no @
        },
        mentions: true,
        pingbacks: true,
        domain: 'www.kevincunningham.co.uk',
        token: process.env.WEBMENTION_API,
      },
    },
  ],
}
