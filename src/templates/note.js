import { graphql } from 'gatsby'

import Note from '../components/note'

export default Note

export const pageQuery = graphql`
  query($id: String!) {
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

    note: mdx(id: { eq: $id }) {
      id
      body
      fileAbsolutePath
    }
  }
`
