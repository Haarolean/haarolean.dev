import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

const pages = [
    { name: "Projects", href: "/projects" },
    { name: "CV", href: "https://cv.haarolean.dev" },
]

export default function NavBar() {
    const [hovered, setHovered] = useState("")
    const location = useLocation()

    return (
        <header className="absolute top-0 mt-1 flex min-h-[59px] w-full flex-wrap items-center text-xs text-white">
            <Link
                to="/"
                className="absolute left-6 top-1/2 mt-[5px] -translate-y-1/2 text-2xl font-bold text-neutral transition-colors duration-200 ease-in-out hover:text-primary"
            >
                h
            </Link>
            <nav className="order-2 flex-1 basis-full overflow-x-auto text-center">
                <ul className="relative top-[5px] inline-flex">
                    {pages.map(({ name, href }) => {
                        const external = href.startsWith("http")
                        const label = (
                            <motion.span
                                className={clsx(
                                    location.pathname == href &&
                                        "text-primary after:opacity-100",
                                    "nav-container text-neutral hover:text-primary"
                                )}
                                onHoverStart={() => setHovered(name)}
                                onHoverEnd={() => setHovered("")}
                            >
                                {hovered === name && (
                                    <motion.span
                                        className="absolute -top-[15px] left-0 right-0 -z-[1] rounded-lg bg-neutral/25 p-5"
                                        layoutId="nav"
                                    />
                                )}
                                {name}
                            </motion.span>
                        )

                        return (
                            <li key={name}>
                                {external ? (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="navbar-link relative"
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <Link
                                        to={href}
                                        className="navbar-link relative"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}
