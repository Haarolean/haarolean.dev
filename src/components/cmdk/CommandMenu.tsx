import { Command } from "cmdk"
import React, { ReactNode, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommandMenuContext } from "./CommandMenuContext"
import clsx from "clsx"

type CommandMenuProviderProps = {
    children: ReactNode
}

type Action = {
    id: string
    name: string
    shortcut?: string[]
    keywords?: string
    section: string
    perform: () => void
}

const groupHeadingCls = clsx(
    "[&_[cmdk-group-heading]]:px-4",
    "[&_[cmdk-group-heading]]:py-2",
    "[&_[cmdk-group-heading]]:text-xs",
    "[&_[cmdk-group-heading]]:uppercase",
    "[&_[cmdk-group-heading]]:opacity-50"
)

const itemCls = clsx(
    "flex cursor-pointer items-center",
    "justify-between border-l-2",
    "border-transparent px-4 py-3 text-base",
    "data-[selected=true]:border-base-content",
    "data-[selected=true]:bg-primary/20"
)

export const CommandMenuProvider: React.FC<CommandMenuProviderProps> = ({
    children,
}) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const toggle = useCallback(() => setOpen((prev) => !prev), [])

    const actions: Action[] = [
        {
            id: "home",
            name: "Home",
            shortcut: ["H"],
            keywords: "home index main",
            section: "Go to",
            perform: () => navigate("/"),
        },
        {
            id: "about",
            name: "About",
            shortcut: ["A"],
            keywords: "about me bio",
            section: "Go to",
            perform: () => (window.location.pathname = "blog"),
        },
        {
            id: "projects",
            name: "Projects",
            shortcut: ["P"],
            keywords: "projects",
            section: "Go to",
            perform: () => (window.location.pathname = "blog"),
        },
        {
            id: "articles",
            name: "Articles",
            shortcut: ["B"],
            keywords: "articles medium",
            section: "Go to",
            perform: () => (window.location.pathname = "blog"),
        },
        {
            id: "uses",
            name: "Uses",
            shortcut: ["U"],
            keywords: "hardware software stuff",
            section: "Go to",
            perform: () => (window.location.pathname = "blog"),
        },
    ]

    // Toggle the menu when ⌘K is pressed
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

    // Group actions by section
    const groupedActions = actions.reduce(
        (acc, action) => {
            if (!acc[action.section]) {
                acc[action.section] = []
            }
            acc[action.section].push(action)
            return acc
        },
        {} as Record<string, Action[]>
    )

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
                <div
                    className={clsx(
                        "fixed left-1/2 top-[14vh]",
                        "w-full max-w-[600px]",
                        "-translate-x-1/2"
                    )}
                >
                    <div
                        className={clsx(
                            "overflow-hidden rounded-lg",
                            "bg-base-100/85",
                            "text-primary shadow-lg"
                        )}
                    >
                        <Command.Input
                            placeholder="Type a command or search..."
                            className={clsx(
                                "box-border w-full",
                                "border-none bg-base-100/10",
                                "px-4 py-3 text-base",
                                "text-primary outline-none",
                                "placeholder:text-primary/50"
                            )}
                        />
                        <Command.List
                            className={clsx("max-h-[300px]", "overflow-y-auto")}
                        >
                            <Command.Empty
                                className={clsx(
                                    "px-4 py-3",
                                    "text-sm opacity-50"
                                )}
                            >
                                No results found.
                            </Command.Empty>

                            {Object.entries(groupedActions).map(
                                ([section, sectionActions]) => (
                                    <Command.Group
                                        key={section}
                                        heading={section}
                                        className={groupHeadingCls}
                                    >
                                        {sectionActions.map((action) => (
                                            <Command.Item
                                                key={action.id}
                                                value={`${action.name} ${action.keywords || ""}`}
                                                onSelect={() => {
                                                    action.perform()
                                                    setOpen(false)
                                                }}
                                                className={itemCls}
                                            >
                                                <span>{action.name}</span>
                                                {action.shortcut?.length ? (
                                                    <div
                                                        aria-hidden
                                                        className="grid grid-flow-col gap-1"
                                                    >
                                                        {action.shortcut.map(
                                                            (sc) => (
                                                                <kbd
                                                                    key={sc}
                                                                    className={clsx(
                                                                        "rounded",
                                                                        "bg-white/20",
                                                                        "px-2 py-1",
                                                                        "text-xs",
                                                                        "uppercase"
                                                                    )}
                                                                >
                                                                    {sc}
                                                                </kbd>
                                                            )
                                                        )}
                                                    </div>
                                                ) : null}
                                            </Command.Item>
                                        ))}
                                    </Command.Group>
                                )
                            )}
                        </Command.List>
                    </div>
                </div>
            </Command.Dialog>
        </CommandMenuContext.Provider>
    )
}
