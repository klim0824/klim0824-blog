import React from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, SimpleGrid } from '@chakra-ui/react'

import { fetchAccounts, fetchArticles, fetchMeta } from 'libs/fetchApi'
import Layout from 'components/Layout'
import Card from 'components/Card'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<PageProps> = (props) => {
  const { articles, accounts, meta, categoryId } = props

  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={categoryId + ' 記事一覧 | ' + meta.title}
        description={meta.description?.replace(/\n/g, '') ?? ''}
        canonical={meta.url}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: meta.url,
          title: categoryId + ' 記事一覧 | ' + meta.title,
          description: meta.description?.replace(/\n/g, '') ?? '',
          site_name: meta.title,
        }}
        twitter={{
          handle: '@' + meta['author-id'],
          site: meta.title,
          cardType: 'summary_large_image',
        }}
      />
      <Layout accounts={accounts} meta={meta}>
        <Heading as="h1" pb="6" textAlign="center" fontSize="2xl">
          {categoryId} 記事一覧
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
          {articles.contents.map(
            (article) =>
              article.category?.id === categoryId && (
                <Card article={article} key={article.id}></Card>
              )
          )}
        </SimpleGrid>
      </Layout>
    </>
  )
}

export const getStaticPaths = async (): Promise<{
  paths: { params: { 'category-id': string } }[]
  fallback: false
}> => {
  const articles = await fetchArticles()
  const paths = articles.contents.map((content) => ({
    params: { 'category-id': content.category?.id ?? '' },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const articles = await fetchArticles()
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()
  const categoryId = context.params ? context.params['category-id'] : null

  return {
    props: {
      meta,
      accounts: accounts,
      articles: articles,
      categoryId: categoryId ?? {},
    },
  }
}

export default CategoryPage
