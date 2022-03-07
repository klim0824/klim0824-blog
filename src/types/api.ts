type ListContents<T> = {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

type Common<T> = {
  id?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
} & T

type image = {
  url: string
  height: number
  width: number
}

export type ArticlesList = ListContents<Article>

type Article = Common<{
  title?: string
  description?: string
  content?: string
  category?: Category
  tags?: Tag[]
  mainvisual?: image
}>

export type TagsList = ListContents<Tag>

type Tag = Common<{
  tag?: string
  icon?: image
}>

export type CategoriesList = ListContents<Category>

type Category = Common<{
  name?: string
}>

export type AccountsList = ListContents<Account>

type Account = Common<{
  name?: string
  url?: string
  image?: image
  color?: string
}>

export type Meta = Common<{
  title?: string
  url?: string
  description?: string
  author?: string
  'author-id'?: string
  'author-image'?: image
}>
