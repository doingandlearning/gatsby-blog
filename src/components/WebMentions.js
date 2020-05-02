import React from 'react'

export default function WebMentions({ edges }) {
  const likes = edges.filter(({ node }) => node.wmProperty === 'like-of')
  const likeAuthors = likes.map(
    ({ node }) => node.author && { wmId: node.wmId, ...node.author }
  )
  const reposts = edges.filter(({ node }) => node.wmProperty === 'repost-of')
  const repostAuthors = reposts.map(
    ({ node }) => node.author && { wmId: node.wmId, ...node.author }
  )

  const replies = edges.filter(
    ({ node }) =>
      node.wmProperty === 'in-reply-to' || node.wmProperty === 'mention-of'
  )

  const AuthorCard = ({ author }) => {
    return (
      <a href={author.url} key={author.url}>
        <img
          alt={author.name}
          src={author.photo}
          key={author.wmId}
          className="rounded-full w-12 h-12"
        />
      </a>
    )
  }
  return (
    <div className="pt-4">
      <h3>Webmentions</h3>
      <h4>
        {likes.length === 0 ? (
          <p>No likes or reposts yet.</p>
        ) : (
          <p>{`${likes.length + reposts.length} likes and reposts`}</p>
        )}
      </h4>
      <div className="flex flex-wrap">
        {likeAuthors.map(author => (
          <div className="px-2">
            <AuthorCard author={author} />
          </div>
        ))}
        {repostAuthors.map(author => (
          <div className="px-2">
            <AuthorCard author={author} />
          </div>
        ))}
      </div>
      <hr className="my-2" />
      <div>
        <h3>The conversation continues ...</h3>
        {replies.length > 0 ? (
          <>
            {replies.map(({ node }) => {
              return (
                <div className="grid grid-cols-12 m-3" key={node.wmId}>
                  <AuthorCard author={node.author} className="col-span-3" />
                  <a
                    className="col-span-9 text-black cursor-pointer"
                    href={node.wmSource}
                  >
                    {node.content.text}
                  </a>
                </div>
              )
            })}
          </>
        ) : (
          <p>No conversation yet.</p>
        )}
      </div>
    </div>
  )
}
