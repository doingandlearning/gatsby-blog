import React from 'react'
import isPresent from 'is-present'
import { Link } from 'gatsby'
import { Folder } from 'react-feather'

export default ({ directories }) =>
  isPresent(directories) ? (
    <>
      <div className="flex justify-between flex-wrap">
        {Object.entries(directories).map(([key, value]) => (
          <a
            className="text-white hover:text-black m-4 bg-gray-500 w-1/3 text-white hover:bg-gray-200 text-center uppercase p-6"
            href={value[0].pagePath}
          >
            <div className="" key={key}>
              {key}
            </div>
          </a>
        ))}
      </div>
      <hr />
    </>
  ) : null
