import React from 'react'

import { InferGetStaticPropsType, NextPage } from 'next'
import { SimpleGrid, VisuallyHidden } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import Layout from 'components/Layout'
import Card from 'components/Card'
import generatedRssFeed from 'libs/generatedRssFeed'
import { fetchArticles, fetchAccounts, fetchMeta } from 'libs/fetchApi'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<PageProps> = (props) => {
  const { articles, accounts, meta } = props
  const doesAlowRoboot =
    process.env.NEXT_PUBLIC_ROBOT_ALLOW === 'allow' ? true : false

  return (
    <>
      <NextSeo
        noindex={!doesAlowRoboot}
        nofollow={!doesAlowRoboot}
        title={meta.title}
        description={meta.description?.replace(/\n/g, '') ?? ''}
        canonical={meta.url}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: meta.url,
          title: meta.title,
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
        <VisuallyHidden>
          <h1>記事一覧</h1>
        </VisuallyHidden>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
          {articles.contents.map((article) => (
            <Card article={article} key={article.id}></Card>
          ))}
        </SimpleGrid>
      </Layout>
    </>
  )
}
export const getStaticProps = async () => {
  const articles = await fetchArticles()
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  generatedRssFeed(meta, articles.contents)

  return {
    props: {
      articles,
      accounts,
      meta,
    },
  }
}

export default Home
