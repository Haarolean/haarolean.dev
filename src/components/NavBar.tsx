export default function NavBar() {
    return (
        <>
            <header className="h-14">
                <nav className="flex items-center justify-center border border-orange-500">
                    <a
                        href="https://"
                        className="btn btn-ghost p-2 uppercase text-neutral
                     transition-colors duration-200 ease-in-out
                    "
                    >
                        <span>Title</span>
                    </a>
                    <a
                        href="https://"
                        className="btn btn-ghost p-2 uppercase text-neutral
                     transition-colors duration-200 ease-in-out
                    "
                    >
                        <span>Title</span>
                    </a>
                </nav>
                {/*<CmdShortcut />*/}
            </header>
        </>
    )
}
