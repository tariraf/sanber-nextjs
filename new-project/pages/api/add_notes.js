// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await (await fetch("https://simpeg-be.vercel.app/api/v2/notes", {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify(req.body)
  })).json()
  res.status(201).json({...response})
  // res.status(200).json({ name: 'John Doe' })
}
