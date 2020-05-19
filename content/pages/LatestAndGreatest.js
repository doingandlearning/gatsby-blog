/** @jsx jsx */
import React from 'react'
import { jsx, Link as TLink } from 'theme-ui'
import { Link, useStaticQuery } from 'gatsby'
import { Box } from '@theme-ui/components'

export default function LatestAndGreatest() {
  const { latestNote, latestPost, featuredPost } = useStaticQuery(
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
      }
    `
  )
  const latestPostNode = latestPost.edges[0].node
  const latestNoteNodes = latestNote.edges
  const featuredPostNode = featuredPost.edges[0].node
  return (
    <Box mb={4}>
      {latestPost && (
        <details>
          <summary
            sx={{
              color: `secondary`,
              mt: 1,
              a: { color: `secondary` },
              fontSize: [2, 1, 2],
            }}
          >
            Latest blog post
          </summary>
          <div>
            <TLink
              as={Link}
              to={latestPostNode.fields.slug}
              sx={{ fontSize: [1, 2, 3], color: `text` }}
            >
              {latestPostNode.frontmatter.title}
            </TLink>
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
                <Link to={`/wiki/${node.relativePath.split('.')[0]}`}>
                  {node.name}
                </Link>
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
    </Box>
  )
}
