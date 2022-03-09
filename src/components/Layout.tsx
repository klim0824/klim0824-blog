import React, { ReactNode } from 'react'

// import Image from 'next/image'
// import Link from 'next/link'
import { Container, Grid, GridItem } from '@chakra-ui/react'

import {
  AccountsList,
  //Article,
  Meta,
} from 'types/api'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import Footer from 'components/Footer'

const Layout = ({
  accounts,
  // articles,
  meta,
  children,
}: {
  accounts: AccountsList
  // articles: Article[]
  meta: Meta
  children: ReactNode
}) => {
  return (
    <Grid
      minH="100vh"
      templateRows={{
        base: 'var(--chakra-space-16) 1fr var(--chakra-space-16)',
      }}
      gap={8}
      pt={8}
      pl={2}
      bg="blue.alpha"
      position="relative"
      _before={{
        content: `""`,
        position: 'absolute',
        left: '0',
        width: '8px',
        height: '100%',
        bgGradient: 'linear(8deg, blue.deep, blue.light)',
      }}
    >
      <Header title={meta.title} />

      <Container maxW="container.xl" px={4}>
        <Grid
          templateAreas={{
            base: `
              "main"
              "sidebar"
            `,
            md: `"main main main sidebar"`,
            xl: `"main main main main sidebar"`,
          }}
          templateRows={{ base: '1fr auto' }}
          templateColumns={{
            base: '100%',
            md: 'repeat(3, 1fr) var(--chakra-space-64)',
            xl: 'repeat(4, 1fr) var(--chakra-space-64)',
          }}
          gap="4"
          w="100%"
          h="100%"
        >
          <GridItem gridArea="main" borderRadius="md">
            <main>{children}</main>
          </GridItem>

          {/* Sidebarコンポーネントにheight="100%"を当てるとgapの余白をぶち抜くためここにスタイルを適応(´；ω；｀) */}
          <GridItem
            gridArea="sidebar"
            h="100%"
            // border="1px"
            // borderColor="gray.100"
            // borderRadius="md"
            // boxShadow="sm"
          >
            <Sidebar accounts={accounts} meta={meta} />
          </GridItem>
        </Grid>
      </Container>

      <Footer name={meta['author-id']} />
    </Grid>
  )
}

export default Layout
