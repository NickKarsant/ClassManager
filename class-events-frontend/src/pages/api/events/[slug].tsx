// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { classes } = require('./data.json')

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const singleClass = classes.filter((cl: object) => cl.slug === req.query.slug)

  if (req.method === 'GET'){
    res.status(200).json(singleClass)
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(450).json({message: `Method: ${req.method} is not allowed`})
  }
}
