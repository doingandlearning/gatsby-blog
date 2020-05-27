import React from 'react'
import { Link } from 'gatsby'

class Menu extends React.Component {
  render() {
    const menu = this.props.data

    const menuBlock = (
      <ul className="flex flex-row justify-center list-none">
        {menu.map((item) => (
          <li className="mx-2" key={item.path}>
            <Link
              to={item.path}
              className="text-black hover:text-orange"
              activeClassName=" text-orange"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    )

    return <nav className="menu">{menuBlock}</nav>
  }
}

export default Menu
