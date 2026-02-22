import { createContext, useContext } from "react"

export type CommandMenuContextType = {
    open: boolean
    setOpen: (open: boolean) => void
    toggle: () => void
}

export const CommandMenuContext = createContext<CommandMenuContextType | null>(
    null
)

export const useCommandMenu = () => {
    const context = useContext(CommandMenuContext)
    if (!context) {
        throw new Error(
            "useCommandMenu must be used within a CommandMenuProvider"
        )
    }
    return context
}
