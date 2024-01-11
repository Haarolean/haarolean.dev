import { siGithub } from "simple-icons"
import { siInstagram } from "simple-icons"
import { siTwitter } from "simple-icons"
import { siDiscord } from "simple-icons"
import { siLinkedin } from "simple-icons"

export default function Footer() {
    const linkStyle =
        "flex items-center " +
        "text-xs lg:text-lg " +
        "m-1 lg:m-3 " +
        "p-1 lg:p-2 " +
        "lowercase text-neutral " +
        "hover:cursor-pointer hover:text-primary hover:link " +
        "group block"

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
                    <span className="hidden lg:block">github</span>
                </a>
                <a
                    className={linkStyle}
                    href="https://twitter.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siTwitter.path} />
                    <span className="hidden lg:block">twitter</span>
                </a>
                <a
                    className={linkStyle}
                    href="https://linkedin.com/in/haarolean/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siLinkedin.path} />
                    <span className="hidden lg:block">linkedin</span>
                </a>
                <a
                    className={linkStyle}
                    href="https://instagram.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siInstagram.path} />
                    <span className="hidden lg:block">instagram</span>
                </a>
                <a className={linkStyle} onClick={discord}>
                    <Icon path={siDiscord.path} />
                    <span className="hidden lg:block">discord</span>
                </a>
            </footer>
        </>
    )
}

function Icon(props: { path: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="inline-block 
            h-6 w-6 
            fill-current text-neutral hover:text-primary
            lg:mr-2 lg:h-3 lg:w-3 lg:text-transparent lg:group-hover:text-primary"
        >
            <path d={props.path} />
        </svg>
    )
}
