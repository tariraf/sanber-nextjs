import Layout from "@/layout";

export default function Products({products}){
    return (
        <Layout>
            <div className="grid grid-cols-3 gap-4 p-4">
                {
                    products?.products?.map((data) => {
                        return (
                            <div className="p-2 border border-solid border-yellow-800 rounded">
                                <h3 className="font-bold">{data.title}</h3>
                                <p>{data.description}</p>
                                <p className="pt-2">Rating : {data.rating}</p>
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const response = await fetch("https://dummyjson.com/products")
    const products = await response.json()
    return {props : {products}}
}