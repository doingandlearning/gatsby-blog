import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import SignUpForm from '../components/SignUpForm'
import { useStaticQuery, graphql, Link } from 'gatsby'

function IndexPage(props) {
  const { latestNote, latestPost, featuredPost, site } = useStaticQuery(
    graphql`
      {
        latestNote: allFile(
          limit: 2
          sort: { fields: modifiedTime, order: DESC }
          filter: { sourceInstanceName: { eq: "wiki" } }
        ) {
          edges {
            node {
              id
              parent {
                ... on File {
                  name
                  base
                  relativePath
                  sourceInstanceName
                }
              }
              name
              relativePath
            }
          }
        }
        latestPost: allMdx(
          limit: 1
          filter: {
            frontmatter: { layout: { eq: "post" }, draft: { ne: true } }
          }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              parent {
                ... on File {
                  name
                  base
                  relativePath
                  sourceInstanceName
                }
              }
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
        featuredPost: allMdx(
          filter: {
            frontmatter: {
              layout: { eq: "post" }
              draft: { ne: true }
              featured: { eq: true }
            }
          }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              parent {
                ... on File {
                  name
                  base
                  relativePath
                  sourceInstanceName
                }
              }
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
        site {
          siteMetadata {
            title
            subtitle
            copyright
            menu {
              label
              path
            }
            author {
              name
              email
              twitter
              github
            }
          }
        }
      }
    `
  )
  const { title, subtitle } = site.siteMetadata
  const latestPostNode = latestPost.edges[0].node
  const latestNoteNodes = latestNote.edges
  const featuredPostNode = featuredPost.edges[0].node
  return (
    <Layout>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
        </Helmet>
        <Sidebar {...props} />
        <div className="content">
          <div className="content__inner">
            <h1 className="text-5xl pt-10">Hi, I'm Kevin Cunningham. 👋🏻</h1>
            <p className="text-xl py-3">
              Welcome to my little corner of the internet.
            </p>
            <p className="text py-3">
              The idea of this space is to create a "digital garden", a place
              for my ideas and thinking to have space to grow and develop in the
              wild.
            </p>
            <p className="text py-3">
              When I'm not tending my garden by reading or writing, I'm normally
              hanging out with my wife and family or building prototypes and
              products. Find out more <a href="https://spin-up.io">here</a>.
            </p>
            <p className="text py-3">
              I also feed my love of learning, teaching and helping others
              working alongside the awesome people at
              <a href="https://egghead.io"> egghead</a>.
            </p>
            <p className="text py-3">
              You can normally find me hanging around on Twitter as{' '}
              <a href="https://twitter.com/dolearning">@dolearning </a>
              or over on Github as{' '}
              <a href="https://github.com/doingandlearning/">
                doingandlearning
              </a>
              .
            </p>
            <p className="text py-3">
              I love making new friends and chatting with interesting people -
              online or in person. Feel free to reach out if you'd like to
              connect.
            </p>
            <hr />
            {latestPost && (
              <details className="py-4">
                <summary className="text-xl">Latest blog post</summary>
                <div className="text-xl px-8">
                  <Link to={latestPostNode.fields.slug}>
                    {latestPostNode.frontmatter.title}
                  </Link>
                  <p>{latestPostNode.frontmatter.description}</p>
                </div>
              </details>
            )}
            {latestNote && (
              <details className="py-4">
                <summary className="text-xl">Latest Notes</summary>
                {latestNoteNodes.map(({ node }) => {
                  return (
                    <div className="text-xl px-8">
                      <Link to={`/wiki/${node.relativePath}`}>{node.name}</Link>
                    </div>
                  )
                })}
              </details>
            )}
            {featuredPost && (
              <details className="py-4">
                <summary className="text-xl">Featured blog post</summary>
                <div className="text-xl px-8">
                  <Link to={featuredPostNode.fields.slug}>
                    {featuredPostNode.frontmatter.title}
                  </Link>
                  <p>{featuredPostNode.frontmatter.description}</p>
                </div>
              </details>
            )}
            <hr />
            <SignUpForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
