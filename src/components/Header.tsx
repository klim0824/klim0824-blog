import React from 'react'

import { Center, Heading, Link } from '@chakra-ui/react'

const Header = (title: string): JSX.Element => {
  return (
    <Center as="header">
      <Heading as="p" fontSize={28}>
        <Link href="/" d="block" py={2} pr={8} borderRadius="md" color="black">
          {title}
        </Link>
      </Heading>
    </Center>
  )
}

export default Header
