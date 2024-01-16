import NyanBackground from "../components/NyanBackground.tsx"
import Footer from "../components/Footer.tsx"
import ShortcutHome from "../components/CmdShortcut.tsx"
import React from "react"

export default function Index() {
    return (
        <>
            <NyanBackground />
            <div className="flex h-screen min-h-screen flex-col">
                {/*<NavBar />*/}
                <main className="mx-auto flex h-full w-full flex-1 items-center justify-center">
                    <div className="flex w-full p-8 lg:mx-96 lg:p-0">
                        <div className="w-96 flex-1">
                            <h1 className="font-heading text-4xl font-bold leading-relaxed lg:text-5xl ">
                                Roman Zabaluev
                            </h1>
                            <p>
                                <strong className="font-medium leading-loose">
                                    Digital nomad, software developer, engineer
                                    and cat enthusiast.
                                </strong>
                            </p>
                            <p className="leading-loose text-neutral">
                                Making the world better with software
                            </p>
                            <div className="mt-2">
                                {/*<ShortcutHome />*/}
                            </div>
                        </div>
                    </div>
                </main>
                <div className="flex-2 flex items-center justify-center">
                    <Footer />
                </div>
            </div>
        </>
    )
}
