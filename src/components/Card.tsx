import React from 'react'

// import Image from 'next/image'
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'

import { Article } from 'types/api'
import { date } from 'utils/date'
import summary from 'utils/summary'

const Card = ({ article }: { article: Article }) => {
  return (
    <LinkBox
      as="article"
      position="relative"
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      boxShadow="sm"
      bg="white"
      transition=".3s ease-out"
      _before={{
        content: `""`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        bgGradient: 'radial(white,blue.50)',
        zIndex: -1,
      }}
      _hover={{
        bg: 'transparent',
      }}
    >
      <VStack>
        {article.mainvisual?.url ? (
          <AspectRatio width="100%" ratio={1200 / 630}>
            <Box
              borderTopRadius="md"
              borderBottom="1px"
              borderBottomColor="gray.100"
            >
              <Image
                src={article.mainvisual.url}
                alt=""
                // layout={'fill'}
                objectFit={'contain'}
              ></Image>
            </Box>
          </AspectRatio>
        ) : (
          <AspectRatio width="100%" ratio={1200 / 630}>
            <Box
              backgroundImage="url('/icon-512.png')"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              bgColor="#000"
              borderTopRadius="md"
            ></Box>
          </AspectRatio>
        )}
        <Box w="100%" pt="2" px="4" pb="4">
          <Heading
            as="h2"
            size="sm"
            noOfLines={2}
            minH={10}
            lineHeight="var(--chakra-lineHeights-5)"
          >
            <LinkOverlay
              href={
                '/articles/' +
                date(article.publishedAt, 'YYYYMMDD') +
                '/' +
                article.id
              }
            >
              {article.title}
            </LinkOverlay>
          </Heading>
          {
            // meta descriptionが入力されていればそちらを出力し、無ければ本文の先頭140文字を出力
            article.description ? (
              <Text
                minH={20}
                pt={2}
                noOfLines={3}
                lineHeight="var(--chakra-lineHeights-6)"
              >
                {article.description}
              </Text>
            ) : (
              <Text
                minH={20}
                pt={2}
                noOfLines={3}
                lineHeight="var(--chakra-lineHeights-6)"
                dangerouslySetInnerHTML={{
                  __html: summary(article.content),
                }}
              ></Text>
            )
          }
          <Flex as="dl" pt={3} lineHeight="var(--chakra-lineHeights-3)">
            <Box as="dt" pr="2">
              <VisuallyHidden>公開日</VisuallyHidden>
              <Image
                src="/icons/createdat.svg"
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
            <Spacer />
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
              <Text fontSize="sm">{article?.category?.name}</Text>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </LinkBox>
  )
}

export default Card
