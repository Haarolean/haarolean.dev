import NyanBackground from "../components/NyanBackground.tsx"
import Footer from "../components/Footer.tsx"
import React, { PropsWithChildren } from "react"
import NavBar from "../components/NavBar.tsx"

interface PageProps {
    title: string
}

export const TextPage: React.FC<PropsWithChildren<PageProps>> = ({
    title,
    children,
}) => {
    return (
        <>
            <div className="flex h-screen min-h-screen flex-col">
                <NavBar />
                <main className="mx-auto flex h-full w-full flex-1 items-center justify-center">
                    <div className="flex w-full p-8 lg:mx-96 lg:p-0">
                        {title}
                        <div className="w-96 flex-1 bg-red-900">
                            {children}
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
