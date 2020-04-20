import React from 'react'
import isPresent from 'is-present'
import _ from 'lodash'

export default ({ directories, location }) => {
  const pathArray = _.get(location, 'pathname')
    .split('/')
    .splice(2)
  console.log(directories, pathArray)
  return isPresent(directories) ? (
    <>
      <div className="flex justify-between flex-wrap">
        {Object.entries(directories)
          .filter(item => _.isEqual(item[0].split('/').slice(0, -1), pathArray))
          .sort()
          .map(([key, value]) => {
            const keyArray = key.split('/')
            console.log(key, value)
            return (
              <a
                className="text-white relative hover:text-black m-4 bg-gray-500 w-1/3 text-white hover:bg-gray-200 text-center uppercase p-6"
                href={value[0].pagePath}
                key={value[0].pagePath}
              >
                <div className="" key={key}>
                  {keyArray[keyArray.length - 1]}
                </div>
                <p className="text-left pt-4 color-gray-500 absolute left-0 bottom-0">
                  {value.map(item => (
                    <a
                      href={item.url}
                      className="no-underline hover:bg-red-200 hover:color-red-200"
                    >
                      '🗒'
                    </a>
                  ))}
                </p>
              </a>
            )
          })}
      </div>
      <hr />
    </>
  ) : null
}
