import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import './style.scss'
import SignUp from '../SignUpForm'

const PostTemplateDetails = props => {
  const { subtitle, author } = props.data.site.siteMetadata
  const post = props.data.mdx
  const tags = post.fields.tagSlugs

  const homeBlock = (
    <div>
      <Link className="post-single__home-button" to="/blog">
        All Posts
      </Link>
    </div>
  )

  const tagsBlock = (
    <div className="post-single__tags">
      <ul className="post-single__tags-list">
        {tags &&
          tags.map((tag, i) => (
            <li className="post-single__tags-list-item" key={tag}>
              <Link to={tag} className="post-single__tags-list-item-link">
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )

  return (
    <div>
      {homeBlock}
      <div className="post-single">
        <div className="post-single__inner">
          <h1 className="post-single__title">{post.frontmatter.title}</h1>
          <div className="post-single__body">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
          <div className="post-single__date">
            <em>
              Published {moment(post.frontmatter.date).format('D MMM YYYY')}
            </em>
          </div>
        </div>
        <div className="post-single__footer">
          {tagsBlock}
          <hr />
          <SignUp />
          <p className="post-single__footer-text text-center">
            {subtitle}
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <br /> <strong>{author.name}</strong> on Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostTemplateDetails
