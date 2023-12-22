import Layout from "@/layout";
import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";


export default function Home() {
  const LayoutDynamic = dynamic(() => import("@/layout"))
  // useEffect(()=> {
  //   fetch("/api/hello")
  //   .then(res => res.json())
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // })

 return (
  <LayoutDynamic metaTitle="Home" metaDescription="This is Home page">
    <div className="h-full">
      <h1 className="py-10 text-center text-xl font-extrabold">This is Home!</h1>

      <div className="flex gap-5 justify-center my-5">
        <div className="text-center">
          <h3 className="w-60 py-3">Using HTML TAG</h3>
          <img src="/peach.png" alt="peach image" style={{width: 250}} />
        </div>

        <div div className="text-center">
          <h3 className="w-60 py-3">Using Next Image</h3>
          <Image src="/peach.png" alt="peach image" width={250} height={350} />
        </div>

        <div div className="text-center">
          <h3 className="w-60">Using Next Image & URL to get the image</h3>
          <Image src="https://clipartcraft.com/images/peach-clipart-kawaii.png" alt="peach image" width={250} height={350}/>
        </div>
      </div>

    </div>
  </LayoutDynamic>
 );
}