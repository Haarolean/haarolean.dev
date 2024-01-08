import { useEffect, useState } from "react"
import { useKBar } from "kbar"
import KBarButton from "./KBarButton.tsx"
import Kbd from "./Kbd.tsx"

export default function ShortcutHome() {
    const { query } = useKBar()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (mounted) {
        const isMac = /(Mac)/i.test(navigator.userAgent)
        const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

        if (isMobile) {
            return (
                <KBarButton onClick={query.toggle}>Tap to start →</KBarButton>
            )
        } else if (isMac) {
            return (
                <KBarButton onClick={query.toggle}>
                    Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to start →
                </KBarButton>
            )
        } else {
            return (
                <KBarButton onClick={query.toggle}>
                    Press <Kbd>ctrl</Kbd> <Kbd>K</Kbd> to start →
                </KBarButton>
            )
        }
    }

    return <></>
}
