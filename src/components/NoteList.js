import React from 'react'
import { Link } from 'gatsby'

export default ({ files }) => {
  console.log(files)
  return (
    <ul>
      {files.map(url => (
        <div key={url}>
          <li>
            <a href={url}>{url}</a>
          </li>
          <div>SOMEHOW RENDER THE NOTE CONTENT</div>
        </div>
      ))}
    </ul>
  )
}
