import Layout from "@/layout";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=> {
    fetch("/api/hello")
    .then(res => res.json())
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  })
 return (
  <Layout metaTitle="Home" metaDescription="This is Home page">
    <div className="h-full">
      <h1 className="py-10 text-center text-xl font-extrabold">This is Home!</h1>
    </div>
  </Layout>
 );
}