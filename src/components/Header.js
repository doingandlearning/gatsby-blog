import { graphql, useStaticQuery, Link } from 'gatsby'
import React, { useState } from 'react'
import Menu from './Menu'
import Links from './Links'
import profilePic from '../pages/photo.jpg'

function Header() {
  const [isExpanded, toggleExpansion] = useState(false)

  const { site } = useStaticQuery(
    graphql`
      {
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
  const { author, subtitle, copyright, menu } = site.siteMetadata
  return (
    <header className="bg-teal-700">
      <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:p-8">
        <Link to="/">
          <h1 className="flex items-center text-white no-underline">
            <img
              className="inline-block w-16 h-16 rounded-full mx-2"
              src={profilePic}
            />
            <span className="text-xl font-bold tracking-tight">
              {site.siteMetadata.title}
            </span>
          </h1>
        </Link>

        <button
          className="flex items-center block px-3 py-2 text-white border border-white rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          <div className="flex flex-col justify-center">
            <Menu data={menu} />
            <Links author={author} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
