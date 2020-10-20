import React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SignUp from '../SignUpForm'
import WebMentions from '../WebMentions'
import _ from 'lodash'
import {format} from "date-fns"

const PostTemplateDetails = (props) => {
  const { subtitle, author } = props.data.site.siteMetadata
  const post = props.data.mdx
  const webMentions = _.get(props, 'data.allWebMentionEntry', [])
  const tags = post.fields.tagSlugs
  console.log(props)
  const homeBlock = (
    <button>
      <Link className="post-single__home-button" to="/blog">
        All Posts
      </Link>
    </button>
  )

  const tagsBlock = (
    <ul className="flex justify-center my-4">
      {tags &&
        tags.map((tag, i) => (
          <li className="list-none " key={tag}>
            <button>
              <Link to={tag} className="post-single__tags-list-item-link">
                {post.frontmatter.tags[i]}
              </Link>
            </button>
          </li>
        ))}
    </ul>
  )

const dateString = format( new Date(post.frontmatter.date), "EEEE do MMMM, y")

  return (
    <div>
      {homeBlock}
      <div className="post-single h-card">
        <div className="post-single__inner">
          <h1 className="text-4xl pb-4 p-name font-bold">{post.frontmatter.title}</h1>
         
<p className="border-t border-b my-auto py-2 text-gray-700">Published on {format( new Date(post.frontmatter.date), "EEEE do MMMM, y")}.</p>
          
          <div className="post-single__body my-4">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
          <div className="text-center my-5">
            <em>
              Published {format( new Date(post.frontmatter.date), "EEEE do MMMM, y")}
            </em>
          </div>
        </div>
        <div className="post-single__footer">
          <SignUp />
          {tagsBlock}
          <WebMentions {...webMentions} />
          <hr className="my-2" />
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
