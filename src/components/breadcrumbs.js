import React from 'react'
import { Link } from 'gatsby'

export default ({ location }) => {
  const pathArray = location.pathname.split('/').slice(1)
  const links = pathArray.map((item, idx) => {
    return {
      name: item,
      url: `/${pathArray.slice(0, idx + 1).join('/')}`,
    }
  })

  return (
    <nav>
      <a href={'/'}>~</a>
      {links.map(link => {
        return (
          <>
            <span className="text-blue-700" children="/" />
            <a href={link.url} key={link.url}>
              {link.name}
            </a>
          </>
        )
      })}
    </nav>
  )
}
