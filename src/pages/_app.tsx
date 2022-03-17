import React from 'react'

import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import theme from 'libs/styles'

import SEO from '../../next-seo.config'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
