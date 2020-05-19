import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SignUp from '../SignUpForm'
import WebMentions from '../WebMentions'
import _ from 'lodash'

const PostTemplateDetails = (props) => {
  const { subtitle, author } = props.data.site.siteMetadata
  const post = props.data.mdx
  const webMentions = _.get(props, 'data.allWebMentionEntry', [])
  const tags = post.fields.tagSlugs

  const homeBlock = (
    <button>
      <Link className="post-single__home-button" to="/blog">
        All Posts
      </Link>
    </button>
  )

  const tagsBlock = (
    <ul className="flex">
      {tags &&
        tags.map((tag, i) => (
          <li className="post-single__tags-list-item" key={tag}>
            <button>
              <Link to={tag} className="post-single__tags-list-item-link">
                {post.frontmatter.tags[i]}
              </Link>
            </button>
          </li>
        ))}
    </ul>
  )

  return (
    <div>
      {homeBlock}
      <div className="post-single h-card">
        <div className="post-single__inner">
          <h1 className="post-single__title p-name">
            {post.frontmatter.title}
          </h1>
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
          <WebMentions {...webMentions} />
          <hr className="my-2" />
          <SignUp />
          <p className="post-single__footer-text text-center">
            {subtitle}
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-name u-url"
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
