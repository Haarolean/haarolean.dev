import { siGithub } from "simple-icons"
import { siInstagram } from "simple-icons"
import { siTwitter } from "simple-icons"
import { siDiscord } from "simple-icons"
import { siLinkedin } from "simple-icons"

export default function Footer() {
    const linkStyle =
        "text-l m-3 p-2 lowercase text-neutral hover:cursor-pointer hover:text-primary hover:link group"

    const discord = () => {
        alert("It's 'Haarolean' just like anywhere else, duh")
    }

    return (
        <>
            <footer className="flex items-center justify-center">
                <a
                    className={linkStyle}
                    href="https://github.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siGithub.path} />
                    github
                </a>
                <a
                    className={linkStyle}
                    href="https://twitter.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siTwitter.path} />
                    twitter
                </a>
                <a
                    className={linkStyle}
                    href="https://linkedin.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siLinkedin.path} />
                    linkedin
                </a>
                <a
                    className={linkStyle}
                    href="https://instagram.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siInstagram.path} />
                    instagram
                </a>
                <a className={linkStyle} onClick={discord}>
                    <Icon path={siDiscord.path} />
                    discord
                </a>
            </footer>
        </>
    )
}

function Icon(props: { path: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="mr-2 inline-block h-3 w-3 fill-current text-transparent group-hover:text-primary"
        >
            <path d={props.path} />
        </svg>
    )
}
