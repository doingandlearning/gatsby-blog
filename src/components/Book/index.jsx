import React from 'react'
import moment from 'moment'
import { MDXRenderer } from 'gatsby-plugin-mdx'

function Book({ data }) {
  const {
    title,
    author,
    rating,
    publication_date,
    genre,
    category,
    coverImage,
    date,
    tags,
  } = data.node.frontmatter

  const tagsBlock = (
    <div className="">
      <ul className="list-none flex justify-center flex-wrap">
        {tags &&
          tags.map((tag, i) => (
            <li className="p-2 bg-orange text-white rounded mx-2" key={tag}>
              <div className="tag">{data.node.frontmatter.tags[i]}</div>
            </li>
          ))}
      </ul>
    </div>
  )

  const Star = ({ selected = false }) => (
    <div className={selected ? 'star selected' : 'star'} />
  )

  const StarRating = ({ totalStars, select }) => (
    <div className="flex">
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < select} />
      ))}
    </div>
  )
  console.log(coverImage)

  return (
    <div className="border rounded my-2 p-3">
      <div className="">
        <h2 className="title">
          {title} - <em>{author}</em> ({publication_date})
        </h2>
        {/* <Img fluid={coverImage.childImageSharp.fluid} /> */}
      </div>
      <div className="details">
        <div className="details pt-4">
          <MDXRenderer>{data.node.body}</MDXRenderer>
        </div>
        <div className="tags">{tagsBlock}</div>
        <div className="finished">
          <small>Finished on {moment(date).format('D MMM YYYY')}</small>
        </div>
      </div>
    </div>
  )
}

export default Book
