import React from 'react'

import { Box, Text } from '@chakra-ui/react'

const Footer = ({ name }: { name: string | undefined }) => {
  const year = new Date()
  const thisYear = year.getFullYear()
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? ''

  return (
    <Box as="footer">
      {GA_TRACKING_ID && (
        <Text textAlign="center" fontSize="sm">
          このサイトはGoogle Analyticsを使用しています。
        </Text>
      )}
      <Text textAlign="center">
        <small>
          &copy;{thisYear} {name}
        </small>
      </Text>
    </Box>
  )
}

export default Footer
