import React from 'react'
import Post from '../Post'

class CategoryTemplateDetails extends React.Component {
  render() {
    const items = []
    const { category } = this.props.pageContext
    const posts = this.props.data.allMdx.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
          <div className="page">
            <h1 className="text-3xl my-3">{category}</h1>
            <div className="page__body">{items}</div>
          </div>
    )
  }
}

export default CategoryTemplateDetails
