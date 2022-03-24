import { NextApiRequest, NextApiResponse } from 'next'

import { fetchDraft } from 'libs/fetchApi'

const draft = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.slug
  if (!id) {
    return res.status(404).send({ message: 'no slug' })
  }
  const draftKey = req.query.draftKey
  const draft =
    typeof id === 'string' && typeof draftKey === 'string'
      ? await fetchDraft(id, draftKey)
      : null

  if (!draft) {
    return res.status(404).send({ message: 'Cannot fetch draft' })
  }

  res.setPreviewData({
    slug: draft?.id,
    draftKey: draftKey,
  })
  res.writeHead(307, { Location: `/draft` })
  res.end('Preview mode enabled')
}

export default draft
