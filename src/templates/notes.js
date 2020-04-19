import React from 'react'

import Topics from '../components/Topics'

export default ({
  pageContext: { groupedNotes, urls, breadcrumbs },
  location,
  data,
}) => {
  return (
    <Topics
      directories={groupedNotes}
      files={urls}
      breadcrumbs={breadcrumbs}
      location={location}
      data={data}
    />
  )
}
