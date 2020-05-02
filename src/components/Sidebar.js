import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Menu from './Menu'
import Links from './Links'
import profilePic from '../pages/photo.jpg'
import './_Sidebar/style.scss'

import { useStaticQuery, graphql } from 'gatsby'

const Sidebar = ({ location }) => {
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
  const isHomePage = get(location, 'pathname', '/') === '/'

  /* eslint-disable jsx-a11y/img-redundant-alt */
  const authorBlock = (
    <div>
      <Link to="/">
        <div className="author-card rounded-full" alt="Profile picture" />
      </Link>
      {isHomePage ? (
        <h1 className="sidebar__author-title">
          <Link className="sidebar__author-title-link" to="/">
            {author.name}
          </Link>
        </h1>
      ) : (
        <h2 className="sidebar__author-title">
          <Link className="sidebar__author-title-link" to="/">
            {author.name}
          </Link>
        </h2>
      )}
      <p className="sidebar__author-subtitle">{subtitle}</p>
    </div>
  )
  /* eslint-enable jsx-a11y/img-redundant-alt */

  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__author">{authorBlock}</div>
        <div>
          <Menu data={menu} />
          <Links data={author} />
          <p className="sidebar__copyright">{copyright}</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
