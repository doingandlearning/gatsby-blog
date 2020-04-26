import { graphql, useStaticQuery } from 'gatsby'

export default () => {
  const data = graphql`
    {
      site {
        siteMetadata {
          title
          subtitle
          copyright
          author {
            name
            twitter
          }
          disqusShortname
          url
        }
      }
    }
  `

  return data
}
