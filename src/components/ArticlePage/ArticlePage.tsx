import React from 'react'

// import Link from 'next/link'
// import Image from 'next/image'
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  // LinkOverlay,
  Spacer,
  Text,
  Tooltip,
  VisuallyHidden,
  // VStack,
} from '@chakra-ui/react'

import { Meta, Article } from 'types/api'
import { date } from 'utils/date'

import styles from './ArticlePage.module.scss'
import Twitter from '../../../public/icons/accounts/twitter.svg'
import Facebook from '../../../public/icons/accounts/facebook.svg'
import Hatenabookmark from '../../../public/icons/accounts/hatenabookmark.svg'
import Pocket from '../../../public/icons/accounts/pocket.svg'

const ArticlePage = ({ meta, article }: { meta: Meta; article: Article }) => {
  const articleLink = date(article.publishedAt, 'YYYYMMDD') + '/' + article.id
  return (
    <Box
      as="article"
      maxW="4xl"
      m="auto"
      p={4}
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      boxShadow="sm"
      bg="white"
    >
      <header>
        <Box>
          {article.mainvisual?.url && (
            <AspectRatio ratio={1200 / 630} width="100%" maxW="md" m="auto">
              <Image
                src={article.mainvisual.url}
                alt=""
                // layout={'fill'}
                objectFit={'contain'}
              ></Image>
            </AspectRatio>
          )}
          <Flex>
            <Box>
              <Flex as="dl" pt={3} lineHeight="3">
                <Box as="dt" pr="2">
                  <VisuallyHidden>公開日</VisuallyHidden>
                  <Image
                    src="/icons/created-at.svg"
                    alt=""
                    width="4"
                    height="4"
                  ></Image>
                </Box>
                <Box as="dd" pt="2px">
                  <Text fontSize="sm">
                    <time dateTime={date(article.publishedAt, 'YYYY-MM-DD')}>
                      {date(article.publishedAt, 'YYYY年M月D日')}
                    </time>
                  </Text>
                </Box>
              </Flex>
              <Flex as="dl" pt="3" lineHeight="3">
                <Box as="dt" pr="2">
                  <VisuallyHidden>編集日</VisuallyHidden>
                  <Image
                    src="/icons/revised-at.svg"
                    alt=""
                    width="4"
                    height="4"
                  ></Image>
                </Box>
                <Box as="dd" pt="1">
                  <Text fontSize="sm">
                    <time dateTime={date(article.revisedAt, 'YYYY-MM-DD')}>
                      {date(article.revisedAt, 'YYYY年M月D日')}
                    </time>
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <Box>
              <Box>
                <Flex as="dl" pt={3} lineHeight="3">
                  <Box as="dt" pr="2">
                    <VisuallyHidden>カテゴリー</VisuallyHidden>
                    <Image
                      src="/icons/category.svg"
                      alt=""
                      width="4"
                      height="4"
                    ></Image>
                  </Box>
                  <Box as="dd" pt="2px">
                    <Link href={'/categories/' + article.category?.id}>
                      <a>
                        <Text fontSize="sm">{article.category?.name}</Text>
                      </a>
                    </Link>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <Flex as="dl" pt="2" lineHeight="3">
                  <Box as="dt" pr="2" pt="1">
                    <VisuallyHidden>タグ</VisuallyHidden>
                    <Image
                      src="/icons/tag.svg"
                      alt=""
                      width="4"
                      height="4"
                    ></Image>
                  </Box>
                  <Box as="dd">
                    <HStack>
                      {article.tags?.map((article) => (
                        <Box key={article.id}>
                          <Tooltip
                            label={article.tag}
                            hasArrow
                            placement="left"
                          >
                            <Image
                              src={article.icon?.url}
                              width={5}
                              height={5}
                              alt={article.tag}
                            ></Image>
                          </Tooltip>
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Heading as="h1" py={4}>
          <Link href={'/' + articleLink} d={'block'}>
            <a>{article.title}</a>
          </Link>
        </Heading>
      </header>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
      ></div>

      <Box py="6">
        <hr />
      </Box>

      <HStack as="footer" justify="flex-end">
        <Text>Share on</Text>
        <Box>
          <Link
            href={`https://b.hatena.ne.jp/entry/${meta.url}${articleLink}`}
            isExternal
          >
            <VisuallyHidden>はてなブックマーク</VisuallyHidden>
            <Box
              width={{
                base: '10',
                sm: '5',
              }}
              height={{
                base: '10',
                sm: '5',
              }}
              p={{
                base: '1',
                sm: '0',
              }}
              mt={0}
              transition="top .1s ease-out"
              sx={{
                'svg:hover': { fill: '#00A4DE' },
                'svg:active': { fill: '#00A4DE' },
              }}
            >
              <Hatenabookmark />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link
            href={`https://twitter.com/share?url=${meta.url}${articleLink}&text=${article.title}%20%7C%20${meta.title}`}
            isExternal
          >
            <VisuallyHidden>Twitter</VisuallyHidden>
            <Box
              width={{
                base: '10',
                sm: '5',
              }}
              height={{
                base: '10',
                sm: '5',
              }}
              p={{
                base: '1',
                sm: '0',
              }}
              mt={0}
              transition="top .1s ease-out"
              sx={{
                'svg:hover': { fill: '#1DA1F2' },
                'svg:active': { fill: '#1DA1F2' },
              }}
            >
              <Twitter />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link
            href={`https://www.facebook.com/share.php?u=${meta.url}${articleLink}`}
            isExternal
          >
            <VisuallyHidden>Facebook</VisuallyHidden>
            <Box
              width={{
                base: '10',
                sm: '5',
              }}
              height={{
                base: '10',
                sm: '5',
              }}
              p={{
                base: '1',
                sm: '0',
              }}
              mt={0}
              transition="top .1s ease-out"
              sx={{
                'svg:hover': { fill: '#1877F2' },
                'svg:active': { fill: '#1877F2' },
              }}
            >
              <Facebook />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link
            href={`http://getpocket.com/save?url=${meta.url}${articleLink}&title=${article.title}%20%7C%20${meta.title}`}
            isExternal
          >
            <VisuallyHidden>Facebook</VisuallyHidden>
            <Box
              width={{
                base: '10',
                sm: '5',
              }}
              height={{
                base: '10',
                sm: '5',
              }}
              p={{
                base: '1',
                sm: '0',
              }}
              mt={0}
              transition="top .1s ease-out"
              sx={{
                'svg:hover': { fill: '#EF3F56' },
                'svg:active': { fill: '#EF3F56' },
              }}
            >
              <Pocket />
            </Box>
          </Link>
        </Box>
      </HStack>
    </Box>
  )
}

export default ArticlePage
