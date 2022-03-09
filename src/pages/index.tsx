import React from 'react'

import { InferGetStaticPropsType, NextPage } from 'next'
import { SimpleGrid, VisuallyHidden } from '@chakra-ui/react'

import Layout from 'components/Layout'
import {
  fetchArticles,
  fetchTags,
  fetchCategories,
  fetchAccounts,
  fetchMeta,
} from 'libs/fetchApi'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<PageProps> = (props) => {
  const { articles, tags, categories, accounts, meta } = props

  return (
    <Layout accounts={accounts} meta={meta}>
      <VisuallyHidden>
        <h1>記事一覧</h1>
      </VisuallyHidden>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
        {articles.contents.map(
          (article) => article.title
          // <Card article={article} key={article.id}></Card>
        )}
      </SimpleGrid>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const articles = await fetchArticles()
  const tags = await fetchTags()
  const categories = await fetchCategories()
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  return {
    props: {
      articles,
      tags,
      categories,
      accounts,
      meta,
    },
  }
}

export default Home
