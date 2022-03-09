import fs from 'fs'

import { Feed } from 'feed'

import { Meta, Article } from 'types/api'
import { date } from 'utils/date'
import summary from 'utils/summary'

const generatedRssFeed = (meta: Meta, articles: Article[]): void => {
  const year = new Date()
  const thisYear = year.getFullYear()

  const feed = new Feed({
    title: meta.title || '',
    description: meta.description?.replace(/\r?\n/g, ''),
    id: meta.url || '',
    link: meta.url,
    language: 'ja',
    image: `${meta.url}icon-192.png`,
    favicon: `${meta.url}icon-192.png`,
    copyright: `${thisYear} ${meta['author-id']}`,
    feedLinks: {
      rss2: `${meta.url}feed.xml`,
    },
    author: {
      name: meta['author-id'],
      link: meta.url,
    },
  })

  articles.forEach((article) => {
    const articleUrl =
      meta.url + date(article.publishedAt, 'YYYYMMDD') + '/' + article.id

    feed.addItem({
      title: article.title || '',
      id: article.id,
      guid: articleUrl,
      link: articleUrl,
      description: article.description || summary(article.content),
      content: article.content,
      date: new Date(article.publishedAt || ''),
      published: new Date(article.publishedAt || ''),
      image: article.mainvisual?.url,
      category: [
        {
          name: article.category?.name,
        },
      ],
      author: [
        {
          name: meta['author-id'],
          email: meta.author,
          link: meta.url,
        },
      ],
    })
  })
  fs.writeFileSync('./public/feed.xml', feed.rss2())
}

export default generatedRssFeed
