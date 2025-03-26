import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

export default function NavBar() {
    const pages = [
        "About",
        "Projects",
        "Articles",
        "CV",
        // "Talks",
        // "Podcasts",
        // "Investing",
        "Uses",
        // "Reminder",
    ]

    const [hovered, setHovered] = useState<string>("")
    const location = useLocation()

    return (
        <header style={Header} className="mt-1">
            {/*<Link href="/" passHref>
          <ButtonLogo as="a">z</ButtonLogo>
        </Link>*/}

            <nav style={Nav}>
                <ul style={List}>
                    {pages.map((page) => {
                        const path = `/${page.toLowerCase()}`
                        const isHovered = hovered === page

                        return (
                            <li key={page}>
                                <Link
                                    to={path}
                                    style={Anchor}
                                    // className="hover:opacity-100 focus:opacity-100"
                                    className="navbar-link"
                                >
                                    <motion.span
                                        // style={NavContainer}
                                        className={clsx(
                                            location.pathname == path &&
                                                "text-primary after:opacity-100",
                                            "nav-container text-neutral hover:text-primary"
                                        )}
                                        onHoverStart={() => setHovered(page)}
                                        onHoverEnd={() => setHovered("")}
                                    >
                                        {isHovered && (
                                            <motion.span
                                                style={NavHovered}
                                                className="bg-neutral"
                                                layoutId="nav"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.25 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                        {page}
                                    </motion.span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

const Header: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    color: "white",
    fontSize: "12px",
    minHeight: "59px",
    width: "100%",
    flexWrap: "wrap",
    position: "absolute",
    top: "0",
    // zIndex: 3,
    // marginTop: "13px",
    // "@bp2": { marginTop: "0" },
}

const List: React.CSSProperties = {
    margin: "0",
    padding: "0",
    listStyle: "none",
    display: "inline-flex",
    position: "relative",
    top: "5px",
    // "@bp1": { justifyContent: "space-around" },
}

const Icon: React.CSSProperties = {
    fontSize: "24px",
    lineHeight: "32px",
}

// const ButtonLogo = {
//     fontWeight: 700,
//     fontSize: "32px",
//     textDecoration: "none",
//     marginLeft: "12px",
//     fontFamily: "$heading",
// }

const Nav: React.CSSProperties = {
    textAlign: "center",
    flex: 1,
    order: 2,
    flexBasis: "100%",
    // "@bp2": { order: 0, flexBasis: "initial" },
    // "@bp3": { overflowX: "scroll", overflowY: "hidden" },
}

const Anchor: React.CSSProperties = {
    border: 0,
    position: "relative",
    // "&:hover, &:focus": { opacity: 1 },
}

const NavHovered: React.CSSProperties = {
    position: "absolute",
    top: "-15px",
    left: "0",
    right: "0",
    // background: "#212024",
    padding: 20,
    borderRadius: "8px",
    zIndex: -1,
}
