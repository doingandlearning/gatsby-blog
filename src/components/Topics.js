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
          <h1 className="text-center text-3xl">Personal Wiki</h1>
          <Breadcrumbs location={location} />
          {isTopLevel && (
            <div className="py-4">
              <p className="py-2">
                This is my attempt to plant and grow a `digital garden`. I'll
                attempt to gather things I'm learning and groups of topics where
                my thinking is growing. The hope is this will be useful for me
                and for you.
              </p>
              <p className="py-2">
                This is an experiment at the moment but hopefully can grow into
                something useful. There are some placeholder topics to show how
                it will work with more content.
              </p>
              <p className="pt-4">Here are my next tasks:</p>
              <ol className="list-disc ml-4 py-4">
                <li>
                  Have something similar to{' '}
                  <a href="https://busterbenson.com/piles/">piles</a> on each
                  topic card.{' '}
                </li>
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
