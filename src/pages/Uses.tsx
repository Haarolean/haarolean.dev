import { ReactNode } from "react"
import { TextPage } from "./TextPage.tsx"

type Item = { name: string; href?: string; note: ReactNode }

type Section = {
    title: string
    items: Item[]
    photo?: { src: string; alt: string }
}

const SECTIONS: Section[] = [
    {
        title: "Desk",
        items: [
            {
                name: "MacBook Pro (M1 Max, 2021)",
                note: "64 GB, 2 TB, classic silver. Best laptop I've owned. The software has its moments.",
            },
            {
                name: "Nothing else",
                note: "No accessories since I started nomading in 2022. I do miss the Magic Trackpad. And having a workstation, generally.",
            },
            {
                name: "NFC S4M",
                note: "Gaming PC in a 5 litre case. Fits in a backpack. Ryzen, 3060 Ti, and a GPU crisis price I prefer to forget.",
            },
        ],
        photo: { src: "/uses/sffpc.jpg", alt: "NFC S4M small form factor PC" },
    },
    {
        title: "Keyboard",
        items: [
            {
                name: "KBD75",
                href: "https://kbdfans.com",
                note: "Built it myself. Heavy aluminium case. Carried it across continents, because apparently that was essential luggage.",
            },
            {
                name: "Kailh Box Royal",
                note: "Clacky. Yes, people can hear it.",
            },
            {
                name: "Blank DSA PBT keycaps",
                note: "Black and blank, except the Mac modifiers. People ask how I type on it. Usually while I'm typing on it.",
            },
        ],
        photo: {
            src: "/uses/keyboard.jpg",
            alt: "KBD75 with blank black keycaps",
        },
    },
    {
        title: "Coding",
        items: [
            {
                name: "IntelliJ IDEA",
                href: "https://www.jetbrains.com/idea/",
                note: "Where most of the code ends up.",
            },
            {
                name: "VS Code",
                href: "https://code.visualstudio.com",
                note: "My notepad. Sorry, VS Code.",
            },
            {
                name: "Obsidian",
                href: "https://obsidian.md",
                note: "Long-term notes in plain markdown. The files can leave whenever they want.",
            },
            {
                name: "OrbStack",
                href: "https://orbstack.dev",
                note: "Docker Desktop, minus the laptop taking off.",
            },
            {
                name: "TablePlus",
                href: "https://tableplus.com",
                note: "Databases, without waiting for a JVM to wake up.",
            },
        ],
    },
    {
        title: "Terminal",
        items: [
            {
                name: "iTerm2",
                href: "https://iterm2.com",
                note: "Still better than the terminal that ships with macOS.",
            },
            {
                name: "Homebrew",
                href: "https://brew.sh",
                note: "Everything below, plus a few dozen packages I definitely installed for a reason.",
            },
            {
                name: "k9s",
                href: "https://k9scli.io",
                note: (
                    <>
                        Kubernetes without typing{" "}
                        <code className="font-code">kubectl get</code> forty
                        times.
                    </>
                ),
            },
            {
                name: "lf",
                href: "https://github.com/gokcehan/lf",
                note: "File manager in the terminal. Vim keys, naturally.",
            },
            {
                name: "gh",
                href: "https://cli.github.com",
                note: "GitHub without opening another browser tab.",
            },
            {
                name: "d2",
                href: "https://d2lang.com",
                note: "Diagrams that live in git. As they should.",
            },
        ],
    },
    {
        title: "Security",
        items: [
            {
                name: "YubiKey",
                href: "https://www.yubico.com",
                note: "Passkeys, GPG smartcard, SSH, TOTP, NFC. The little key has jobs.",
            },
            {
                name: "Bitwarden",
                href: "https://bitwarden.com",
                note: "Passwords, because my head has enough tabs open.",
            },
            {
                name: "Little Snitch",
                href: "https://obdev.at/products/littlesnitch/",
                note: "Shows me which apps phone home. Some are very chatty.",
            },
            {
                name: "OverSight",
                href: "https://objective-see.org/products/oversight.html",
                note: "Tells me when something reaches for the mic or camera. Love that for us.",
            },
        ],
    },
    {
        title: "Apps",
        items: [
            {
                name: "BetterTouchTool",
                href: "https://folivora.ai",
                note: "Middle-click shortcuts and window snapping. I have become dependent.",
            },
            {
                name: "Transmit",
                href: "https://panic.com/transmit/",
                note: "Files to servers and buckets. No browser upload form involved.",
            },
            {
                name: "Soulver",
                href: "https://soulver.app",
                note: "A notepad that does maths and units. Saves me from doing either.",
            },
            {
                name: "DaisyDisk",
                href: "https://daisydiskapp.com",
                note: "For finding whatever ate 200 GB this time. There is always something.",
            },
            {
                name: "Commander One",
                note: "Dual-pane file manager. Finder can watch.",
            },
            {
                name: "Tailscale",
                href: "https://tailscale.com",
                note: "All my machines on one network, wherever I left them.",
            },
        ],
    },
    {
        title: "Browsers",
        items: [
            {
                name: "Orion",
                href: "https://kagi.com/orion/",
                note: "WebKit with extensions and no ads. We've had our differences. I'm still rooting for it.",
            },
            {
                name: "Chrome",
                note: "For the sites that only remembered to test in Chrome.",
            },
        ],
    },
    {
        title: "Homelab",
        items: [
            {
                name: "Minisforum MS-01",
                href: "https://minisforum.com",
                note: "The entire lab: one small box in an 8\u2033 rack. The cupboard of loud servers can wait.",
            },
            {
                name: "Home Assistant",
                href: "https://www.home-assistant.io",
                note: "Runs the flat. Zigbee2MQTT, Mosquitto and Node-RED handle the conversations.",
            },
            {
                name: "Pi-hole",
                href: "https://pi-hole.net",
                note: "DNS with a very useful 'no'.",
            },
            {
                name: "Gitea",
                href: "https://about.gitea.com",
                note: "Mirrors and private repos. GitHub isn't the only place code can live.",
            },
            {
                name: "MinIO",
                href: "https://min.io",
                note: "S3-compatible storage. No monthly bill to admire.",
            },
            {
                name: "Jellyfin",
                href: "https://jellyfin.org",
                note: "Linux ISOs, and other media no streaming service seems to want.",
            },
            {
                name: "Minecraft",
                note: "Server for friends. Still up, somehow.",
            },
            {
                name: "nyancat",
                note: (
                    <>
                        Nyan cat over telnet:{" "}
                        <code className="font-code">
                            telnet mc.haarolean.dev 1337
                        </code>
                    </>
                ),
            },
        ],
        photo: {
            src: "/uses/rack.jpg",
            alt: "8-inch rack with patch panels and the MS-01",
        },
    },
    {
        title: "Services",
        items: [
            {
                name: "Porkbun",
                href: "https://porkbun.com",
                note: "Domains. Checkout without a whole sales pitch.",
            },
            {
                name: "GitHub Pages",
                href: "https://pages.github.com",
                note: "This site. Built by Actions, served by Pages, costs nothing. Good arrangement.",
            },
            {
                name: "nomads.com",
                href: "https://nomads.com",
                note: "Supplies the location on the front page. Saves me updating it by hand.",
            },
        ],
    },
]

export default function Uses() {
    return (
        <TextPage title="Uses">
            {SECTIONS.map(({ title, items, photo }) => (
                <section key={title} className="mt-8 first:mt-0">
                    <h2 className="mb-3 font-heading text-2xl">{title}</h2>
                    <ul className="list-disc space-y-2 pl-5 marker:text-nyan/40">
                        {items.map(({ name, href, note }) => (
                            <li key={name}>
                                {href ? (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-bold underline decoration-nyan/30 underline-offset-4 hover:decoration-nyan"
                                    >
                                        {name}
                                    </a>
                                ) : (
                                    <span className="font-bold">{name}</span>
                                )}
                                <span className="text-nyan/80"> — {note}</span>
                            </li>
                        ))}
                    </ul>
                    {photo && (
                        <a
                            href={photo.src}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 block w-fit"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                loading="lazy"
                                className="max-h-56 max-w-64 rounded-lg transition hover:opacity-75"
                            />
                        </a>
                    )}
                </section>
            ))}
        </TextPage>
    )
}
