import React, { useEffect } from 'react'

import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module'

import theme from 'libs/styles'

import SEO from '../../next-seo.config'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const gtmId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''

  useEffect(() => {
    TagManager.initialize({ gtmId })
  }, [gtmId])

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
