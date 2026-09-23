import { PropsWithChildren } from "react"
import Footer from "../components/Footer.tsx"
import NavBar from "../components/NavBar.tsx"

export const TextPage = ({
    title,
    children,
}: PropsWithChildren<{ title: string }>) => {
    return (
        <div className="flex min-h-screen flex-col bg-nyan">
            <NavBar />
            <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-8 pt-24">
                <h1 className="mb-6 w-fit bg-gradient-to-r from-secondary to-primary bg-clip-text font-heading text-5xl text-transparent">
                    {title}
                </h1>
                <div className="rounded-xl bg-base-content p-8 leading-relaxed text-nyan shadow-lg md:p-12">
                    {children}
                </div>
            </main>
            <div className="flex items-center justify-center">
                <Footer />
            </div>
        </div>
    )
}
