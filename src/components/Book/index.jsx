import React from 'react'
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
    tags,
  } = data.node.frontmatter

  
  const tagsBlock = (
    <div className="post-single__tags">
      <ul className="post-single__tags-list">
        {tags &&
          tags.map((tag, i) => (
            <li className="post-single__tags-list-item" key={tag}>
              <div className="tag">
              {data.node.frontmatter.tags[i]}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
  
  const Star = ({ selected = false }) => (
    <div className={selected ? "star selected" : "star"} />
  );
  
  const StarRating = ({ totalStars, select }) => (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => (
                  <Star
                  key={i}
                  selected={i < select}
                />
        ))}
      </div>
    );


  return (
    <div className="book">
      <div className="cover">
        <h2 class="title">{title} - <em>{author}</em></h2>
        {/* <Img fluid={coverImage.childImageSharp.fluid} /> */}
      
      </div>
      <div className="details">
        
        <div className="rating"><StarRating totalStars={5} select={rating} /></div>
        <div className="details" dangerouslySetInnerHTML={{ __html: data.node.html }}></div>
        <div className="tags">{tagsBlock}</div>
        <div className="finished"><small>Finished on {moment(date).format('D MMM YYYY')}</small></div>
        
      </div>
    </div>
  )
}

export default Book
