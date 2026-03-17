import { siGithub } from "simple-icons"
import { siInstagram } from "simple-icons"
import { siTwitter } from "simple-icons"
import { siLinkedin } from "simple-icons"
import { Aperture } from "lucide-react"

const iconStyle =
    "inline-block " +
    "h-6 w-6 " +
    "fill-current text-neutral hover:text-primary " +
    "lg:mr-2 lg:h-3 lg:w-3 lg:text-transparent lg:group-hover:text-primary"

export default function Footer() {
    const linkStyle =
        "flex items-center " +
        "text-xs lg:text-sm " +
        "m-1 lg:m-3 " +
        "p-1 lg:p-2 " +
        "lowercase text-neutral " +
        "hover:cursor-pointer hover:text-primary hover:link " +
        "group block"

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
                    href="https://instagram.com/haarolean"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon path={siInstagram.path} />
                    <span className="hidden lg:block">instagram</span>
                </a>
                <a
                    className={linkStyle}
                    href="https://t.me/places_sometimes"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Aperture
                        className={`${iconStyle} !fill-none !stroke-current`}
                    />
                    <span className="hidden lg:block">photos</span>
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
            </footer>
        </>
    )
}

function Icon(props: { path: string }) {
    return (
        <svg viewBox="0 0 24 24" className={iconStyle}>
            <path d={props.path} />
        </svg>
    )
}
