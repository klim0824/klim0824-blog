import React from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Heading } from '@chakra-ui/react'

import { fetchAccounts, fetchDraft, fetchMeta } from 'libs/fetchApi'
import ArticlePage from 'components/ArticlePage'
import Layout from 'components/Layout'

// https://zenn.dev/thiragi/scraps/cb502de7f6866d
const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

const hasSlug = (item: any): item is { slug: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<PageProps> = (props) => {
  const { article, accounts, meta } = props
  const title = '[Preview]' + article?.title + ' | ' + meta.title

  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={title}
        description={meta.description?.replace(/\n/g, '') ?? ''}
        canonical={meta.url}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: meta.url,
          title: title,
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
          プレビュー
        </Heading>
        {article && <ArticlePage article={article} meta={meta}></ArticlePage>}
      </Layout>
    </>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { previewData } = context
  const id = hasSlug(previewData) ? previewData.slug : ''
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const draft =
    typeof id === 'string' && typeof draftKey === 'string'
      ? await fetchDraft(id, draftKey)
      : null

  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  return {
    props: {
      meta,
      accounts: accounts,
      article: draft,
    },
  }
}

export default CategoryPage
