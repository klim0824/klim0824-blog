import React from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import * as cheerio from 'cheerio'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night-blue.css'

import {
  fetchAccounts,
  fetchArticles,
  fetchArticle,
  fetchMeta,
} from 'libs/fetchApi'
import Layout from 'components/Layout'
import ArticlePage from 'components/ArticlePage'
import { date } from 'utils/date'
import summary from 'utils/summary'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<PageProps> = (props) => {
  const { article, accounts, meta } = props
  const doesAlowRoboot =
    process.env.NEXT_PUBLIC_ROBOT_ALLOW === 'allow' ? true : false
  const description =
    article?.description || summary(article?.content).replace(/\n/g, '')
  const articleUrl =
    meta.url +
    'articles/' +
    date(article?.publishedAt, 'YYYYMMDD') +
    '/' +
    article?.id

  const tags = article?.tags?.map((tag) => tag.tag ?? '').filter(Boolean)
  const authors = typeof meta.author === 'string' ? [meta.author] : []

  return (
    <>
      <NextSeo
        noindex={!doesAlowRoboot}
        nofollow={!doesAlowRoboot}
        title={article?.title}
        titleTemplate={'%s' + ' | ' + meta.title}
        description={description}
        canonical={articleUrl}
        openGraph={{
          type: 'article',
          locale: 'ja_JP',
          url: articleUrl,
          title: article?.title,
          description: description,
          site_name: meta.title,
          article: {
            publishedTime: article?.publishedAt,
            modifiedTime: article?.revisedAt,
            section: article?.category?.name,
            authors: authors,
            tags: tags,
          },
        }}
        twitter={{
          handle: '@' + meta['author-id'],
          site: meta.title,
          cardType: 'summary_large_image',
        }}
      />
      <ArticleJsonLd
        keyOverride="blog"
        url={articleUrl}
        title={article?.title ?? ''}
        images={[article?.mainvisual?.url ?? meta['author-image']?.url ?? '']}
        datePublished={article?.publishedAt ?? ''}
        dateModified={article?.revisedAt ?? ''}
        authorName={authors}
        publisherName={meta.author ?? ''}
        publisherLogo={meta['author-image']?.url ?? ''}
        description={description}
      />
      <Layout accounts={accounts} meta={meta}>
        {article && <ArticlePage article={article} meta={meta}></ArticlePage>}
      </Layout>
    </>
  )
}

export const getStaticPaths = async (): Promise<{
  paths: { params: { yyyymmdd: string; id: string } }[]
  fallback: false
}> => {
  const articles = await fetchArticles()
  const paths = articles.contents.map((content) => ({
    params: {
      yyyymmdd: date(content.publishedAt, 'YYYYMMDD') ?? '',
      id: content.id ?? '',
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id
  const accounts = await fetchAccounts()
  const meta = await fetchMeta()

  const article = typeof id === 'string' ? await fetchArticle(id) : null
  const $ = cheerio.load(article?.content ?? '')
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
  article!.content = $.html()

  return {
    props: {
      article,
      accounts,
      meta,
    },
  }
}

export default CategoryPage
