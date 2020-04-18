import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

export default function Wiki(props) {
  return (
    <Layout>
    <div>
      <Helmet>
        <title>Wiki</title>
        <meta name="description" content="Wiki Garden" />
      </Helmet>
      <Sidebar {...props} />
      <div className="content">
        <div className="content__inner">Wiki</div>
      </div>
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
  query WikiQuery {
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
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "wiki" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`