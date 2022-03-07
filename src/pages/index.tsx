import React from 'react'

import { InferGetStaticPropsType, NextPage } from 'next'

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
    <div className="">
      <div className="">{meta.title}</div>
    </div>
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
