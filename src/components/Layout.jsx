import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet />
        <Header />
        {children}
        <a
          rel="webmention"
          href="https://webmention.io/www.kevincunningham.co.uk/webmention"
          className="hidden"
        />
        <a
          rel="pingback"
          href="https://webmention.io/www.kevincunningham.co.uk/xmlrpc"
          className="hidden"
        />
      </div>
    )
  }
}

export default Layout
