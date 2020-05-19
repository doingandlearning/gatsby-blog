import React, { PureComponent } from 'react'

export default class Intro extends PureComponent {
  render() {
    return (
      <>
        <h1 className="text-5xl pt-10">Hi, I'm Kevin Cunningham. 👋🏻</h1>
        <p className="text-xl py-3">
          Welcome to my little corner of the internet.
        </p>
        <p className="text py-3">
          The idea of this space is to create a "digital garden", a place for my
          ideas and thinking to have space to grow and develop in the wild.
        </p>
        <p className="text py-3">
          When I'm not tending my garden by reading or writing, I'm normally
          hanging out with my wife and family or building prototypes and
          products. Find out more <a href="https://spin-up.io">here</a>.
        </p>
        <p className="text py-3">
          I also feed my love of learning, teaching and helping others working
          alongside the awesome people at
          <a href="https://egghead.io"> egghead</a>.
        </p>
        <p className="text py-3">
          You can normally find me hanging around on Twitter as{' '}
          <a href="https://twitter.com/dolearning">@dolearning </a>
          or over on Github as{' '}
          <a href="https://github.com/doingandlearning/">doingandlearning</a>.
        </p>
        <p className="text py-3">
          I love making new friends and chatting with interesting people -
          online or in person. Feel free to reach out if you'd like to connect.
        </p>
      </>
    )
  }
}
