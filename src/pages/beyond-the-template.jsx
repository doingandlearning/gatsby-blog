import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import SignUpForm from '../components/GenericSignUpForm'
import { useStaticQuery, graphql, Link } from 'gatsby'

function IndexPage(props) {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `
  )
  const { title, subtitle } = site.siteMetadata
  return (
    <Layout>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
          <meta charset="utf-8" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@dolearning" />
          <meta name="twitter:creator" content="@dolearning" />
          <meta name="twitter:title" content="Beyond the Template" />
          <meta
            name="twitter:description"
            content="WordPress and Gatsby - headless CMS"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/kc-cloud/image/upload/v1598027270/beyond-the-template_h15l1y.png"
          />
        </Helmet>
        <div className="content">
          <div className="content__inner">
            <img src="https://res.cloudinary.com/kc-cloud/image/upload/v1598027270/beyond-the-template_h15l1y.png" />
            <p className="text-xl py-3">
              I'm writing an ebook on how to build a headless CMS using
              WordPress and Gatsby.
            </p>
            <p className="text-xl py-3">
              Sign up below if that sounds interesting to you.
            </p>

            <SignUpForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
