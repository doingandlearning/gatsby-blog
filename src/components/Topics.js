import React from 'react'

import TopicList from './TopicList'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import Helmet from 'react-helmet'
import Breadcrumbs from './breadcrumbs'
import Layout from './Layout'
import _ from 'lodash'

export default ({ directories, files, breadcrumbs = [], location }) => {
  const breadcrumbsPath =
    breadcrumbs.length > 0
      ? ` | ${breadcrumbs.map(i => i.name).join(' | ')}`
      : ''
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
          {breadcrumbs.length ? <Breadcrumbs links={breadcrumbs} /> : null}
          <TopicList directories={directories} location={location} />
          {!isTopLevel && <NoteList files={files} />}
        </div>
      </div>
    </Layout>
  )
}
