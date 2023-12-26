import Link from "next/link"
export default function Header() {
    return (
        <div className="bg-orange-300 text-white">
            <ul className="flex gap-2 py-3 pl-3">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/notes">Notes</Link></li>
                <li><Link href="/products">Products</Link></li>
            </ul>
        </div>
    )
}