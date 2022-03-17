import React from 'react'

import { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import { fetchArticles, fetchAccounts, fetchMeta } from 'libs/fetchApi'
import Layout from 'components/Layout'
import { Article, Category } from 'types/api'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CategoriesIndex: NextPage<PageProps> = (props) => {
  const { articles, accounts, meta } = props
  const categories = articles.contents.reduce(
    (accumulator: Category[], currentValue: Article) => {
      if (
        !accumulator.some(
          (element: Category) => element.id === currentValue.category?.id
        )
      ) {
        accumulator.push({
          id: currentValue.category?.id,
          name: currentValue.category?.name,
        })
      }
      return accumulator
    },
    []
  )

  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={'カテゴリー一覧 | ' + meta.title}
        description={meta.description}
        canonical={meta.url}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: meta.url,
          title: 'カテゴリー一覧 | ' + meta.title,
          description: meta.description,
          site_name: meta.title,
        }}
        twitter={{
          handle: '@' + meta['author-id'],
          site: meta.title,
          cardType: 'summary_large_image',
        }}
      />
      <Layout accounts={accounts} meta={meta}>
        <Heading as="h1" pb="4" textAlign="center" fontSize="2xl">
          カテゴリー一覧
        </Heading>
        <Box
          maxW="4xl"
          m="auto"
          px={8}
          py={4}
          border="1px"
          borderColor="gray.100"
          borderRadius="md"
          boxShadow="sm"
          bg="white"
        >
          <ul>
            {categories.map((category: Category) => (
              <li key={category.id}>
                <Link href={'/categories/' + category.id}>
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await fetchArticles()
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  return {
    props: {
      articles,
      accounts,
      meta,
    },
  }
}

export default CategoriesIndex
