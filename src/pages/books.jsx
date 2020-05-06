import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import Book from '../components/Book'

function BookPage(props) {
  const items = []
  const books = props.data.allMdx.edges
  books.forEach(book => {
    items.push(<Book data={book} key={book.id} />)
  })
  return (
    <Layout>
      <Helmet>
        <title>Books</title>
        <meta name="description" content="Some book reviews" />
      </Helmet>
      <Sidebar {...props} />
      <div className="content w-1/2">
        <div className="content__inner">{items}</div>
      </div>
    </Layout>
  )
}

export default BookPage

export const pageQuery = graphql`
  query BooksQuery {
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
    allMdx(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "book" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            title
            author
            rating
            publication_date
            genre
            category
            date
            tags
          }
        }
      }
    }
  }
`
