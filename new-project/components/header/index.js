import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Link from "next/link"
import { useQueries } from "@/hooks/useQueries"
import Cookies from "js-cookie"
import { useMutation } from "@/hooks/useMutation"
import { useRouter } from "next/router"
export default function Header() {
    const {data} = useQueries({
        prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
        headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`
        }
    })
    const {mutate} = useMutation()
    const route = useRouter()
    const handleLogout = async (event) => {
        event.preventDefault()

        const response = await mutate({
            url: 'https://paace-f178cafcae7b.nevacloud.io/api/logout', 
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("user_token")}`
            },
        })

        if (!response?.success) {
            console.log("Gagal Logout")
        } else {
            Cookies.remove("user_token")
            route.push('/login')
        }
    }

    return (
        <div className="bg-orange-300 text-white">
            <ul className="flex gap-2 py-3 pl-3">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/notes">Notes</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {data?.data?.name}
                        </MenuButton>
                        <MenuList>
                            <MenuItem color='black' onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu></li>
            </ul>
        </div>
    )
}