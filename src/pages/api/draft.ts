import { NextApiRequest, NextApiResponse } from 'next'

import { fetchDraft } from 'libs/fetchApi'

const draft = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.slug) {
    return res.status(404).send({ message: 'no slug' })
  }

  const id = req.query.id
  const draftKey = req.query.draftKey
  const article =
    typeof id === 'string' && typeof draftKey === 'string'
      ? await fetchDraft(id, draftKey)
      : null

  if (!article) {
    return res.status(404).send({ message: 'Cannot fewtch draft' })
  }

  res.setPreviewData({
    slug: article?.id,
    draftKey,
  })
  res.writeHead(307, { Location: `/draft` })
  res.end('Preview mode enabled')
}

export default draft
