import React from 'react'

import TopicList from './TopicList'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import Helmet from 'react-helmet'
import Breadcrumbs from './Breadcrumbs'
import Layout from './Layout'
import _ from 'lodash'

export default ({ directories, location }) => {
  const isTopLevel = _.get(location, 'pathname', '/') === '/wiki'
  return (
    <Layout>
      <div>
        <Helmet>
          <title>Personal Wiki</title>
        </Helmet>
        <Sidebar location={location} />
        <div className="content">
          <h1>Wiki</h1>
          <Breadcrumbs location={location} />
          <TopicList directories={directories} location={location} />
          {!isTopLevel && (
            <NoteList directories={directories} location={location} />
          )}
        </div>
      </div>
    </Layout>
  )
}
