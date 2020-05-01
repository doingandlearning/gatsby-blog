import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './Layout'
import { Link } from 'gatsby'

const NotePage = props => {
  console.log(props)
  const homeBlock = (
    <Link
      href={props.location.pathname
        .split('/')
        .slice(0, -1)
        .join('/')}
    >
      <button className="post-single__home-button">Back</button>
    </Link>
  )
  return (
    <Layout>
      {homeBlock}
      <MDXRenderer className="py-2">{props.data.note.body}</MDXRenderer>
    </Layout>
  )
}

export default NotePage
