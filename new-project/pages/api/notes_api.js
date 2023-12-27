// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await (await fetch("https://simpeg-be.vercel.app/api/v2/notes")).json()
  res.status(200).json({...response})
  // res.status(200).json({ name: 'John Doe' })
}
