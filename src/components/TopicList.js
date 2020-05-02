import React from 'react'
import isPresent from 'is-present'
import _ from 'lodash'

export default ({ directories, location }) => {
  const pathArray = _.get(location, 'pathname')
    .split('/')
    .splice(2)
  return isPresent(directories) ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
        {Object.entries(directories)
          .filter(item => _.isEqual(item[0].split('/').slice(0, -1), pathArray))
          .sort()
          .map(([key, value]) => {
            const keyArray = key.split('/')
            const folderNumber =
              Object.entries(directories).filter(item =>
                item[0].startsWith(key)
              ).length - 1
            return (
              <div className="w-100 col-1">
                <div>
                  <a
                    className="text-orange hover:text-black"
                    href={value[0].pagePath}
                    key={value[0].pagePath}
                  >
                    {keyArray[keyArray.length - 1]}
                  </a>
                </div>

                {Array(folderNumber)
                  .fill('📂')
                  .map((item, idx) => (
                    <a className="no-underline" key={`folder-${idx}`}>
                      {item}
                    </a>
                  ))}
                {value.map(item => (
                  <a
                    href={item.url}
                    className="no-underline hover:bg-orange hover:color-orange cursor-pointer"
                    key={item.url}
                  >
                    '🗒'
                  </a>
                ))}
              </div>
            )
          })}
      </div>
    </>
  ) : null
}
