import React from 'react'
import { Link } from 'gatsby'
import { format } from "date-fns"


class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields
    const thumbnail = `https://hungry-brattain-538c0b.netlify.app/opengraph?title=${title.replace(
      /\?/g,
      ''
    )}`

    return (
      <div className="my-4 h-card">
        <div className="grid grid-cols-4 gap-2 grid-rows-1 lg:grid-rows-2">
          <div className="lg:row-span-1 col-span-1 lg:col-span-4">
            <Link
              to={slug}
            >
              <img src={thumbnail} />{' '}
            </Link>
          </div>

          <div className="col-span-3 lg:row-span-1">
            <div className="flex flex-row lg:flex-col">
              <time
                className="font-bold mr-4"
                dateTime={format(new Date(date), "EEEE do MMMM, y")}
              >
                {format(new Date(date), "EEEE do MMMM, y")}
              </time>

              <span className="uppercase" key={categorySlug}>
                <Link to={categorySlug} className="">
                  {category}
                </Link>
              </span>
            </div>
            <h2 className="text-2xl ">
              <Link
                className="p-name text-black hover:text-orange mb-12"
                to={slug}
              >
                {title}
              </Link>
            </h2>
            {/* <p className="p-summary e-content">{description}</p> */}
            <a
              className="u-url p-name hidden"
              href="https://www.twitter.com/dolearning"
            >
              Kevin Cunningham
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
