import { useEffect, useState } from "react"
import CommandMenuButton from "./cmdk/CommandMenuButton"
import Kbd from "./Kbd.tsx"

export default function ShortcutHome() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (mounted) {
        const isMac = /(Mac)/i.test(navigator.userAgent)
        const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

        if (isMobile) {
            return <CommandMenuButton>Tap for command palette →</CommandMenuButton>
        } else if (isMac) {
            return (
                <CommandMenuButton>
                    Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> for command palette →
                </CommandMenuButton>
            )
        } else {
            return (
                <CommandMenuButton>
                    Press <Kbd>ctrl</Kbd> <Kbd>K</Kbd> for command palette →
                </CommandMenuButton>
            )
        }
    }

    return <></>
}
