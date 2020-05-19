import React from 'react'
import { Helmet } from 'react-helmet'
import '../../assets/scss/init.scss'
import '../../assets/styles.css'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet>
          <script
            async
            defer
            data-domain="kevincunningham.co.uk"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Helmet>
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
