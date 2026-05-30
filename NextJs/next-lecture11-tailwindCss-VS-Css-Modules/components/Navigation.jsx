import Link from "next/link";

export default function Navigation(){
    return(
        <header>
            <div className="">thapa</div>
            <nav>
                <ul>
                    <li>
                        {/* use link keyword without page is not refresh after going to next page */}
                        <Link href="/">Home</Link>
                    </li>
                    {/* <li>
                        <a href="/about">About</a>
                    </li> */}
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/service">Service</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}