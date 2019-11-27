import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

function Book({data}) {
  const {
    title,
    author,
    rating,
    publication_date,
    genre,
    category,
    date,
    tags
  } = data.node.frontmatter

  const tagsBlock = (
    <div className="post-single__tags">
      <ul className="post-single__tags-list">
        {tags &&
          tags.map((tag, i) => (
            <li className="post-single__tags-list-item" key={tag}>
              <div className="post-single__tags-list-item-link">
                {data.node.frontmatter.tags[i]}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
  console.log(data);
  return (
    <div className="book">
      <div className="cover"><img src="https://www.fillmurray.com/200/200" /></div>
      <div className="details">
        <h2 class="title">{title} by {author}</h2>
        <div className="rating">{rating}</div>
        <div className="details" dangerouslySetInnerHTML={{ __html: data.node.html }}></div>
        <div className="tags">{tagsBlock}</div>
      </div>
    </div>
  )
}

export default Book
