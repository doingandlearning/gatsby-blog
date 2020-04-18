import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import '../../assets/styles.css'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet />
        {children}
      </div>
    )
  }
}

export default Layout
