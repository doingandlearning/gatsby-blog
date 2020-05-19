import React from 'react'
import { Github, Twitter } from 'react-social-icons'

function Links({ author }) {
  const links = {
    twitter: author.twitter,
    github: author.github,
    email: author.email,
  }

  return (
    <ul className="flex align-items-center justify-center">
      <li className="align-self-center m-1">
        <a
          href={`https://www.twitter.com/${links.twitter}`}
          target="_blank"
          rel="noopener noreferrer me"
        >
          <svg
            role="img"
            data-name="Logo — FIXED"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            className="h-8 w-8"
          >
            <title>Twitter_Logo_Blue</title>

            <path
              fill="#00A2FA"
              class="cls-2"
              d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
            />
          </svg>
        </a>
      </li>
      <li className="align-self-center m-2">
        <a
          href={`https://www.github.com/${links.github}`}
          target="_blank"
          rel="noopener noreferrer me"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub icon</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </li>

      <li className="align-self-center m-2">
        <a href={`mailto:${links.email}`} rel="me">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-6 w-6"
          >
            <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
          </svg>
        </a>
      </li>
    </ul>
  )
}

export default Links
