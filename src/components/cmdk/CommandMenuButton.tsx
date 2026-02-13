import React, { HTMLAttributes, ReactNode } from "react"
import { useCommandMenu } from "./CommandMenu"

interface CommandMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

const CommandMenuButton: React.FC<CommandMenuButtonProps> = ({ children }) => {
    const { toggle } = useCommandMenu()

    return (
        <button onClick={toggle} className="btn btn-ghost -ml-4 text-base">
            {children}
        </button>
    )
}

export default CommandMenuButton
