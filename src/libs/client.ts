import { createClient } from 'microcms-js-sdk'

const serviceDomain: string = process.env.SERVICE_DOMAIN || ''
const apiKey: string = process.env.API_KEY || ''

const client = createClient({
  serviceDomain,
  apiKey,
})
export default client
