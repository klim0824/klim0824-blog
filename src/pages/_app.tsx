import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from 'libs/styles'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
