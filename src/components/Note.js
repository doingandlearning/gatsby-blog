import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './Layout'
import { Link } from 'gatsby'

const NotePage = (props) => {
  const homeBlock = React.useMemo(
    () => (
      <Link to={props.location.pathname.split('/').slice(0, -1).join('/')}>
        <button className="post-single__home-button">Back</button>
      </Link>
    ),
    [props]
  )
  return (
    <Layout>
      {homeBlock}
      <div className="post-single">
        <div className="post-single__inner">
          <div className="post-single__body">
            <MDXRenderer>{props.data.note.body}</MDXRenderer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotePage
