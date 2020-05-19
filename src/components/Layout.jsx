import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import 'typeface-ibm-plex-sans'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet />
        <Header />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto font-sans">{children}</div>
        </div>
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
