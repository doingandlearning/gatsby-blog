import React from 'react'
import isPresent from 'is-present'
import { Link } from 'gatsby'
import { Folder } from 'react-feather'

export default ({ directories }) =>
  isPresent(directories) ? (
    <>
      <div>
        {Object.entries(directories).map(([key, value]) => (
          <a href={value[0].pagePath}>
            <div key={key}>
              <Folder style={{ marginRight: '10px' }} />
              <span>{key}</span>
            </div>
          </a>
        ))}
      </div>
      <hr />
    </>
  ) : null
