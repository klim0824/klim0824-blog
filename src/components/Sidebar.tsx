import React from 'react'

// import Link from 'next/link'
import {
  Box,
  Center,
  Flex,
  Image,
  Link,
  // Text,
  VisuallyHidden,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { Account, AccountsList, Meta } from 'types/api'

// import Categories from './Categories'
import Official from '../../public/icons/accounts/official.svg'
import Rss from '../../public/icons/accounts/rss.svg'
import Mail from '../../public/icons/accounts/mail.svg'
import Github from '../../public/icons/accounts/github.svg'
import Hatenabookmark from '../../public/icons/accounts/hatenabookmark.svg'
import Twitter from '../../public/icons/accounts/twitter.svg'
import Facebook from '../../public/icons/accounts/facebook.svg'
import Instagram from '../../public/icons/accounts/instagram.svg'
import Tumblr from '../../public/icons/accounts/tumblr.svg'

const Sidebar = ({
  accounts,
  meta,
}: {
  accounts: AccountsList
  meta: Meta
}) => {
  const icons = (id: string | undefined) => {
    switch (id) {
      case 'official':
        return <Official />
      case 'rss':
        return <Rss />
      case 'mail':
        return <Mail />
      case 'github':
        return <Github />
      case 'hatenabookmark':
        return <Hatenabookmark />
      case 'twitter':
        return <Twitter />
      case 'facebook':
        return <Facebook />
      case 'instagram':
        return <Instagram />
      case 'tumblr':
        return <Tumblr />
      default:
        return <Official />
    }
  }

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      boxShadow="sm"
      bg="whiteAlpha.600"
    >
      <Flex
        as="aside"
        flexDir={{
          base: 'column',
          sm: 'row',
          md: 'column',
        }}
        alignItems={{
          base: 'center',
          sm: 'stretch',
          md: 'center',
        }}
        justifyContent="center"
      >
        <VisuallyHidden as="h2">著者情報</VisuallyHidden>
        <Box as="figure">
          <Center>
            <Image
              src={meta['author-image']?.url}
              width="32"
              height="32"
              borderRadius="full"
              alt="著者アイコン"
            ></Image>
          </Center>
          <Center as="figcaption" pt="2" lineHeight="base">
            {meta.author}
          </Center>
        </Box>
        <Flex
          flexDir="column"
          px={{
            base: 0,
            sm: '4',
            md: 0,
          }}
          pb={1}
        >
          <Center
            as="p"
            h="100%"
            py={{
              base: '0',
              md: '4',
            }}
            fontSize="sm"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: meta.description?.replace(/\n/g, '<br>') || '',
              }}
            ></span>
          </Center>
          <VisuallyHidden as="h2">著者SNS</VisuallyHidden>
          <Center>
            <Wrap
              maxW={{
                base: '48',
                sm: '56',
              }}
            >
              {accounts.contents.map((account: Account) => (
                <WrapItem
                  key={account.id}
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
                >
                  <Link href={account.url} isExternal width="100%">
                    <VisuallyHidden>{account.name}</VisuallyHidden>
                    <Box
                      mt={0}
                      transition="top .1s ease-out"
                      _hover={{
                        mt: '-2px',
                      }}
                      sx={{
                        'svg:hover': { fill: account.color },
                        'svg:active': { fill: account.color },
                      }}
                    >
                      {icons(account.id)}
                    </Box>
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </Center>
        </Flex>
      </Flex>
      {/* <Flex
        flexDir={{
          base: 'column',
          sm: 'row',
          md: 'column',
        }}
        alignItems={{
          base: 'center',
          sm: 'flex-end',
          md: 'center',
        }}
        justifyContent="center"
        width="100%"
        py="4"
      >
        <Box>
          <Box as="h2">カテゴリー一覧</Box>
          <Categories articles={articles} />
        </Box>
      </Flex> */}
    </Box>
  )
}

export default Sidebar
