import React from 'react'
import { Link } from 'gatsby'

export default ({ files }) => (
  <ul>
    {files.map(url => (
      <li key={url}>
        <a href={url}>{url}</a>
      </li>
    ))}
  </ul>
)
