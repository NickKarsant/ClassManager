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
  if (req.method === 'GET'){
    res.status(200).json(classes)
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(450).json({message: `Method: ${req.method} is not allowed`})
  }
}
