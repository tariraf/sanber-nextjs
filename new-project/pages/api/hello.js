// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await (await fetch("https://dummyjson.com/users")).json()
  res.status(200).json({...response})
  // res.status(200).json({ name: 'John Doe' })
}
