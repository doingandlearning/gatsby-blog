import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields

    return (
      <div className="my-4 h-card">
        <div className="">
          <time
            className="font-bold mr-4"
            dateTime={moment(date).format('MMMM D, YYYY')}
          >
            {moment(date).format('MMMM YYYY')}
          </time>
         
          <span className="uppercase" key={categorySlug}>
            <Link to={categorySlug} className="">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="text-2xl ">
          <Link className="p-name text-black hover:text-orange" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="p-summary e-content">{description}</p>
     
        <a
          className="u-url p-name hidden"
          href="https://www.twitter.com/dolearning"
        >
          Kevin Cunningham
        </a>
      </div>
    )
  }
}

export default Post
