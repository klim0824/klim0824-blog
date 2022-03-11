import React from 'react'

import { Center, Heading, Link } from '@chakra-ui/react'

const Header = ({ title }: { title: string | undefined }) => {
  return (
    <Center as="header">
      <Heading as="p" fontSize="3xl">
        <Link href="/" d="block" p="1" borderRadius="md" color="black">
          {title}
        </Link>
      </Heading>
    </Center>
  )
}

export default Header
