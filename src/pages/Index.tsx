import NyanBackground from "../components/NyanBackground.tsx"
import NyanSecret from "../components/NyanSecret.tsx"
import Footer from "../components/Footer.tsx"
import LiveClock from "../components/LiveClock.tsx"
import React from "react"
import NavBar from "../components/NavBar.tsx"
import ShortcutHome from "../components/CmdShortcut.tsx"

export default function Index() {
    return (
        <>
            <NyanBackground />
            <NyanSecret />
            <div className="index-page flex h-screen min-h-screen flex-col">
                <NavBar />
                <main className="mx-auto flex w-full flex-1 items-center justify-center overflow-hidden">
                    <div className="flex w-full p-8 lg:mx-96 lg:p-0">
                        <div className="w-96 flex-1">
                            <h1 className="font-heading text-4xl font-bold leading-relaxed lg:text-5xl ">
                                Roman Zabaluev
                            </h1>
                            <p>
                                <strong className="font-medium leading-loose">
                                    Software developer, engineer and cat
                                    enthusiast
                                </strong>
                            </p>
                            <p className="leading-loose text-neutral">
                                Small software, slightly better world
                            </p>
                            <span className="flex items-baseline gap-2">
                                <span className="flex items-baseline gap-1">
                                    📍
                                    <p
                                        className="tooltip tooltip-bottom transition
                                         hover:cursor-help hover:opacity-70
                                         max-sm:before:left-0 max-sm:before:max-w-[calc(100vw-4rem)]
                                         max-sm:before:translate-x-0"
                                        data-tip="Today's location, tomorrow's memory. Updated daily."
                                    >
                                        {import.meta.env.VITE_CURRENT_LOCATION}
                                    </p>
                                </span>
                                <span className="text-neutral">·</span>
                                <LiveClock
                                    timezone={
                                        import.meta.env.VITE_CURRENT_TIMEZONE
                                    }
                                />
                            </span>
                            <div className="mt-8">
                                <ShortcutHome />
                            </div>
                        </div>
                    </div>
                </main>
                <div className="flex flex-none items-center justify-center">
                    <Footer />
                </div>
            </div>
        </>
    )
}
