import { Command } from "cmdk"
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { useNavigate } from "react-router-dom"

type CommandMenuContextType = {
    open: boolean
    setOpen: (open: boolean) => void
    toggle: () => void
}

const CommandMenuContext = createContext<CommandMenuContextType | null>(null)

const useCommandMenu = () => {
    const context = useContext(CommandMenuContext)
    if (!context) {
        throw new Error(
            "useCommandMenu must be used within a CommandMenuProvider"
        )
    }
    return context
}

export function CommandMenuButton({ children }: PropsWithChildren) {
    const { toggle } = useCommandMenu()

    return (
        <button
            onClick={toggle}
            className="btn btn-ghost -ml-4 text-sm text-neutral"
        >
            {children}
        </button>
    )
}

export const CommandMenuProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const toggle = useCallback(() => setOpen((prev) => !prev), [])

    const actions = [
        {
            name: "Home",
            shortcut: "H",
            keywords: "home index main",
            perform: () => navigate("/"),
        },
        {
            name: "Projects",
            shortcut: "P",
            keywords: "projects",
            perform: () => navigate("/projects"),
        },
        {
            name: "CV",
            shortcut: "C",
            keywords: "cv resume",
            perform: () => window.open("https://cv.haarolean.dev", "_blank"),
        },
    ]

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    return (
        <CommandMenuContext.Provider value={{ open, setOpen, toggle }}>
            {children}
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Command Menu"
                className="fixed inset-0 z-50"
            >
                <div
                    className="fixed inset-0 bg-black/80"
                    onClick={() => setOpen(false)}
                />
                <div className="fixed left-1/2 top-[14vh] w-full max-w-[600px] -translate-x-1/2">
                    <div className="overflow-hidden rounded-lg bg-base-100/85 text-primary shadow-lg">
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="box-border w-full border-none bg-base-100/10 px-4 py-3 text-base text-primary outline-none placeholder:text-primary/50"
                        />
                        <Command.List className="max-h-[300px] overflow-y-auto">
                            <Command.Empty className="px-4 py-3 text-sm opacity-50">
                                No results found.
                            </Command.Empty>

                            <Command.Group
                                heading="Go to"
                                className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:opacity-50"
                            >
                                {actions.map((action) => (
                                    <Command.Item
                                        key={action.name}
                                        value={`${action.name} ${action.keywords}`}
                                        onSelect={() => {
                                            action.perform()
                                            setOpen(false)
                                        }}
                                        className="flex cursor-pointer items-center justify-between border-l-2 border-transparent px-4 py-3 text-base data-[selected=true]:border-[#f8f8f2] data-[selected=true]:bg-primary/20"
                                    >
                                        <span>{action.name}</span>
                                        <kbd
                                            aria-hidden
                                            className="rounded bg-white/20 px-2 py-1 text-xs uppercase"
                                        >
                                            {action.shortcut}
                                        </kbd>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>
                    </div>
                </div>
            </Command.Dialog>
        </CommandMenuContext.Provider>
    )
}
