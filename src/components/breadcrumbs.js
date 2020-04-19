import React from 'react'
import { Link } from 'gatsby'

export default ({ links }) => {
  const notesPath = '/wiki'

  return (
    <nav>
      <a href={'/'}>~</a>
      <span children="/" />
      <a href={notesPath}>{notesPath.replace(/^\//, '')}</a>
      {links.map(link => (
        <>
          <span children="/" />
          <a href={link.url} key={link.url}>
            {link.name}
          </a>
        </>
      ))}
    </nav>
  )
}
