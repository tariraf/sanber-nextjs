import Layout from "@/layout";
import { useEffect, useState } from "react";

export default function NotesDetails() {
 const [notes, setNotes] = useState()
 useEffect(()=> {
    fetch("/api/notes_api")
    .then(res => res.json())
    .then((res) => {
      setNotes(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
 return (
  <Layout>
    <div className="flex gap-2 py-10 flex-col px-20">
        <div className="p-3 border border-solid border-yellow-600 rounded">
            <h3 className="font-bold">{data.title}</h3>
            <p>{data.description}</p>
        </div>
    </div>
  </Layout>
 );
}

export async function getStaticPaths() {
    try{
        const response = await fetch("https://simpeg-be.vercel.app/api/v2/notes")
        const notes = await response.json()
        const paths = notes?.data?.map((data) => ({
            params: {
                id: data.id,
            },
        }))
        return {
            paths,
            fallback: false,
        }
    }catch(err){
        return {paths : []}
    }
}

export async function getStaticProps(context) {
    const {id} = context.params
    try{
        const response = await fetch(`https://simpeg-be.vercel.app/api/v2/notes/${id}`)
        const notes = await response.json()
        return {props : {notes}, revalidate: 10}
    }catch(err){
        return {props : {notes: null}}
    }
}