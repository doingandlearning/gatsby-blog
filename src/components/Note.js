import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import path from 'path'

import Layout from './Layout'

const WikiPage = props => {
  // const filename = path.basename(fileAbsolutePath).split('.')[0]
  return (
    <Layout>
      <MDXRenderer>{props.data.note.body}</MDXRenderer>
    </Layout>
  )
}

export default WikiPage
