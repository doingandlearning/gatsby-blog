import React from 'react'

export default ({ location }) => {
  const pathArray = location.pathname.split('/').slice(1)
  const links = pathArray.map((item, idx) => {
    return {
      name: item,
      url: `/${pathArray.slice(0, idx + 1).join('/')}`,
    }
  })

  return (
    <nav className="text-black font-bold my-2" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {links.map((link, idx) => {
          return idx !== links.length - 1 ? (
            <li className="flex items-center">
              <a href={link.url} key={link.url}>
                {link.name}
              </a>
              <svg
                className="fill-current w-3 h-3 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
          ) : (
            <li className="flex items-center">
              <a href={link.url} key={link.url} className="text-gray-500">
                {link.name}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
