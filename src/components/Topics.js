import React from 'react'

import TopicList from './TopicList'
import NoteList from './NoteList'
import Sidebar from './Sidebar'
import { Helmet } from 'react-helmet'
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
        <div className="content px-6 sm:px-4">
          <h1 className="text-center  text-3xl py-6">Personal Wiki</h1>
          <Breadcrumbs location={location} />
          {isTopLevel && (
            <div className="py-4">
              <p className="py-2">
                This is my attempt to plant and grow a `digital garden`. I'll
                attempt to gather things I'm learning and groups of topics where
                my thinking is growing. The hope is this will be useful for me
                and for you.
              </p>
              <p className="pt-4">Here are my next tasks:</p>
              <ol className="list-disc ml-4 py-4">
                <li>Deal with images in directories</li>
              </ol>
            </div>
          )}
          <TopicList directories={directories} location={location} />
          {!isTopLevel && (
            <NoteList directories={directories} location={location} />
          )}
        </div>
      </div>
    </Layout>
  )
}
