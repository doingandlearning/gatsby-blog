import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default ({ directories, location }) => {
  const path = location.pathname.slice(6)
  return (
    <ul>
      {Object.entries(directories)
        .filter(page => page[0] === path)
        .map(page => {
          return page.map(item => {
            return (
              <div key={item[0].url}>
                <li>
                  <a href={item[0].url}>{item[0].url}</a>
                </li>
                {item[0].body && <MDXRenderer>{item[0].body}</MDXRenderer>}
              </div>
            )
          })
        })}
    </ul>
  )
}
