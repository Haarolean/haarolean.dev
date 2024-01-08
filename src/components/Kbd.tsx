import React, { HTMLAttributes, ReactNode } from "react"

interface KbdProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const Kbd: React.FC<KbdProps> = ({ children }) => {
    return (
        <kbd className="font-code rounded bg-[#8f9ba8] px-[5px] py-[1px] text-sm uppercase text-[#043564]">
            {children}
        </kbd>
    )
}

export default Kbd
