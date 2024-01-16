import { useEffect, useState } from "react"
import { useKBar } from "kbar"
import KBarButton from "./KBarButton.tsx"
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
            return <KBarButton>Tap for commands →</KBarButton>
        } else if (isMac) {
            return (
                <KBarButton>
                    Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> for commands →
                </KBarButton>
            )
        } else {
            return (
                <KBarButton>
                    Press <Kbd>ctrl</Kbd> <Kbd>K</Kbd> for commands →
                </KBarButton>
            )
        }
    }

    return <></>
}
