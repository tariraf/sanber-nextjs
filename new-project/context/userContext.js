import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { createContext } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children, ...props}){
    const {data} = useQueries({
        prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
        headers: {
            'Authorization': `Bearer ${Cookies.get("user_token")}`
        }
    })

    const userData = data?.data

    const state = { userData }

    return (
        <UserContext.Provider value={state} {...props}>
            {children}
        </UserContext.Provider>
    )
}