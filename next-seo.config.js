/**
 * @type {import('next-seo/lib/types').NextSeoProps}
 **/
const config = {
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#333',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.webmanifest',
    },
  ],
}

export default config
