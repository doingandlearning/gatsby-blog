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
      node.wmProperty === 'in-reply-to' ||
      (node.wmProperty === 'mention-of' && node.author.name !== '')
  )

  const mentions = edges.filter(
    ({ node }) => node.wmProperty === 'mention-of' && node.author.name === ''
  )

  // const AuthorCard = ({ author, className }) => {
  //   return (
  //     <a href={author.url} key={author.url} className={className}>
  //       <img
  //         alt={author.name}
  //         src={author.photo}
  //         className="rounded-full w-12 h-12"
  //       />
  //     </a>
  //   )
  // }
  const AuthorCard = ({ author, className, size }) => {
    return (
      <a href={author.url}>
        <div
          className={`bg-cover bg-center w-${size} h-${size} rounded-full border-4 border-white -mr-3 ${className}`}
          style={{ backgroundImage: `url(${author.photo})` }}
        ></div>
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
      <div className="flex justify-between items-center mt-3">
        <div className="flex flex-row-reverse justify-end">
          {likeAuthors.map(author => (
            <div className="">
              <AuthorCard author={author} size="12" />
            </div>
          ))}
          {repostAuthors.map(author => (
            <div className="">
              <AuthorCard author={author} size="12" />
            </div>
          ))}
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <h3>The conversation continues ...</h3>
        {replies.length > 0 || mentions.length > 0 ? (
          <>
            {replies.map(({ node }) => {
              return (
                <div className="grid grid-cols-12 m-3" key={node.wmId}>
                  <div className="col-span-2 text-center inline-block">
                    <AuthorCard author={node.author} size="16" />
                  </div>
                  <a
                    className="col-span-7 text-black cursor-pointer"
                    href={node.wmSource}
                  >
                    {node.content ? node.content.text : 'No text.'}
                  </a>
                </div>
              )
            })}
            {mentions.map(({ node }) => {
              const author = {
                name: '',
                url: node.wmSource,
                photo: 'https://via.placeholder.com/200',
              }
              return (
                <div className="grid grid-cols-12 m-3" key={node.wmId}>
                  <div className="col-span-2 text-center inline-block">
                    <AuthorCard author={author} size="14" />
                  </div>
                  <div className="col-span-7 text-black cursor-pointer">
                    <a className="" href={node.wmSource}>
                      Mentioned on {node.wmSource}
                    </a>
                  </div>
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
