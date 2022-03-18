import client from 'libs/client'
import { toDateWithDelimiter } from 'utils/date'
import {
  ArticlesList,
  Article,
  TagsList,
  CategoriesList,
  AccountsList,
  Meta,
} from 'types/api'

export const fetchArticles = async () => {
  const articles = await client.get<ArticlesList>({
    endpoint: 'articles',
    queries: {},
  })
  return articles
}

export const fetchArticle = async (id: string) => {
  const article = await client.get<Article>({
    endpoint: 'articles',
    contentId: id,
  })
  return article
}

/**
 * @param publishedAt - yyyymmdd
 * @returns Promise<ArticlesList>
 */
export const fetchArticlesFilteredByPublishDate = async (
  publishedAt: string
) => {
  const articles = await client.get<ArticlesList>({
    endpoint: 'articles',
    queries: {
      filters:
        'publishedAt[begins_with]' + toDateWithDelimiter(publishedAt, '-'),
    },
  })
  return articles
}

export const fetchTags = async () => {
  const tags = await client.get<TagsList>({
    endpoint: 'tags',
    queries: {},
  })
  return tags
}

export const fetchCategories = async () => {
  const categories = await client.get<CategoriesList>({
    endpoint: 'categories',
    queries: {},
  })
  return categories
}

export const fetchAccounts = async () => {
  const accounts = await client.get<AccountsList>({
    endpoint: 'accounts',
    queries: {},
  })
  return accounts
}

export const fetchMeta = async () => {
  const meta = await client.get<Meta>({
    endpoint: 'meta',
    queries: {},
  })
  return meta
}
