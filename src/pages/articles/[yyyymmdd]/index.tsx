import React from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
// import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { SimpleGrid, Heading } from '@chakra-ui/react'

import {
  fetchArticles,
  fetchArticlesFilteredByPublishDate,
  fetchAccounts,
  fetchMeta,
} from 'libs/fetchApi'
import Layout from 'components/Layout'
import Card from 'components/Card'
import { date } from 'utils/date'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const DateIndex: NextPage<PageProps> = (props) => {
  const { articles, accounts, meta, publishedAt } = props
  const title =
    typeof publishedAt === 'string'
      ? date(publishedAt, 'YYYY年MM月DD日の記事一覧')
      : '記事一覧'

  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={title + ' | ' + meta.title}
        description={meta.description}
        canonical={meta.url}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: meta.url,
          title: title + ' | ' + meta.title,
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
          {title}
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
          {articles.contents.map((article) => (
            <Card article={article} key={article.id}></Card>
          ))}
        </SimpleGrid>
      </Layout>
    </>
  )
}

export const getStaticPaths = async (): Promise<{
  paths: { params: { yyyymmdd: string } }[]
  fallback: false
}> => {
  const articles = await fetchArticles()
  const paths = articles.contents.map((content) => ({
    params: { yyyymmdd: date(content.publishedAt, 'YYYYMMDD') ?? '' },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const publishedAt = context.params?.yyyymmdd
  const articles =
    typeof publishedAt === 'string'
      ? await fetchArticlesFilteredByPublishDate(publishedAt)
      : await fetchArticles()
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  return {
    props: {
      articles,
      accounts,
      meta,
      publishedAt,
    },
  }
}

export default DateIndex
