import React from 'react'

import { InferGetStaticPropsType, NextPage } from 'next'
import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import Layout from 'components/Layout'
import { fetchAccounts, fetchMeta } from 'libs/fetchApi'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NotFound: NextPage<PageProps> = (props) => {
  const { accounts, meta } = props

  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={'404 Page Not Found | ' + meta.title}
      />
      <Layout accounts={accounts} meta={meta}>
        <Box
          maxW="4xl"
          m="auto"
          p={4}
          border="1px"
          borderColor="gray.100"
          borderRadius="md"
          boxShadow="sm"
          bg="white"
        >
          <Heading as="h1" pb="4" textAlign="center" fontSize="2xl">
            404 Page Not Found.
          </Heading>
          <Text textAlign="center">
            <Link href="/">Go to Homepage</Link>
          </Text>
        </Box>
      </Layout>
    </>
  )
}
export const getStaticProps = async () => {
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  return {
    props: {
      accounts,
      meta,
    },
  }
}

export default NotFound
