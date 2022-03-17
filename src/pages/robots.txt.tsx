import React from 'react'

import { NextPageContext } from 'next'
const getRobots = () => {
  if (process.env.NEXT_PUBLIC_ROBOT_ALLOW === 'allow') {
    return `user-agent: *
allow: /`
  } else {
    return `user-agent: googlebot
disallow: /`
  }
}

class Robots extends React.Component {
  static async getInitialProps({ res }: NextPageContext): Promise<void> {
    if (res) {
      res.setHeader('Content-Type', 'text/plain')
      res.write(getRobots())
      res.end()
    }
  }
}

export default Robots
