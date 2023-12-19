import Layout from "@/layout";

export default function Home() {
 return (
  <Layout metaTitle="Home" metaDescription="This is Home page">
    <div className="h-full">
      <h1 className="py-10 text-center text-xl font-extrabold">This is Home!</h1>
    </div>
  </Layout>
 );
}