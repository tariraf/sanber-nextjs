import Layout from "@/layout";
import Link from "next/link";

export default function Notes(props) {
 const {notes} = props
 console.log(notes)
 return (
  <Layout>
    <div className="flex gap-2 py-10 flex-col px-20">
        {
            notes.data != null && notes.data.map((data) => {
                return (
                    <Link href={`/notes/${data.id}`}>
                        <div className="p-3 border border-solid border-yellow-600 rounded">
                            <h3 className="font-bold">{data.title}</h3>
                            <p>{data.description}</p>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  </Layout>
 );
}

export async function getStaticProps() {
    try{
        const response = await fetch("https://simpeg-be.vercel.app/api/v2/notes")
        const notes = await response.json()
        return {props : {notes}, revalidate: 10}
    }catch(err){
        return {props : {notes: null}}
    }
}