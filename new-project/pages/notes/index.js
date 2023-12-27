import Layout from "@/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Notes() {
    const [notes, setNotes] = useState()
    const route = useRouter()
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

    const handleDelete = async (event) => {
        event.preventDefault()

        const id = event.target.value
        try {
            const response = await fetch(`/api/delete_notes?id=${id}`, {
              method: 'DELETE'
            })
      
            const responseData = await response.json();
            console.log('Notes deleted successfully:', responseData)
            if (responseData?.success) {
                route.reload()
            }
          } catch (error) {
            console.error('Error adding notes:', error.message)
          }
    }
    return (
    <Layout>
        <div className="flex flex-col items-center p-4">
            <div className="self-center">
                <button className="px-4 py-3 bg-yellow-800 text-white font-bold rounded"
                        onClick={() => {route.push('/notes/add')}}
                >Add Notes</button>
            </div>
            <div className="grid grid-cols-3 gap-4 py-12">
                {
                    notes?.map((data) => {
                        return (
                                <div className="p-3 border border-solid border-yellow-800 rounded-lg">
                                    <h3 className="font-bold">{data.title}</h3>
                                    <p>{data.description}</p>
                                    
                                    <div className="flex space-x-8 pt-10 items-center">
                                        <p className="text-stone-300 font-bold">{data.created_at.substring(0, 10)}</p>
                                        <div className="space-x-2">
                                            <button className="w-16 py-1 text-yellow-800 rounded font-bold" onClick={(e) => {e.preventDefault(); route.push(`/notes/edit/${data.id}`)}}>Edit</button>
                                            <button className="w-16 py-1 bg-red-800 rounded text-white font-bold" onClick={handleDelete} value={data.id}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    </Layout>
    );
}

// export async function getStaticProps() {
//     try{
//         const response = await fetch("https://simpeg-be.vercel.app/api/v2/notes")
//         const notes = await response.json()
//         return {props : {notes}, revalidate: 10}
//     }catch(err){
//         return {props : {notes: null}}
//     }
// }