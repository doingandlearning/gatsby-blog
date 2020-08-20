import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import SignUpForm from '../components/SignUpForm'
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
        </Helmet>
        <div className="content">
          <div className="content__inner">
            <h1 className="sm:text-4xl text-3xl pt-10">
              Hi, I'm Kevin Cunningham. 👋🏻
            </h1>
            <p className="text-xl py-3">
              Welcome to my little corner of the internet.
            </p>
            <p className="text-xl py-3">
              I send out a weekly email, normally about the web, coding,
              learning and education.
            </p>
            <p className="text-xl py-3">
              I'd love for you to sign-up and do learning with us :)
            </p>

            <SignUpForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
