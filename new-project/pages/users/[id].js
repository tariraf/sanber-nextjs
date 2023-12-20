import Layout from "@/layout";
import { useRouter } from "next/router";

const UserDetails = () => {
    const router = useRouter()
    const {id} = router?.query
    return (
        <Layout>
            <h1 className="py-10 text-center text-xl font-extrabold">User Details By Id = {id}</h1>
        </Layout>
    )
}

export default UserDetails