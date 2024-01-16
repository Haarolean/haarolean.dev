import React, { HTMLAttributes, ReactNode } from "react"
import { useKBar } from "kbar"

interface KBarButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const KBarButton: React.FC<KBarButtonProps> = ({ children }) => {
    const { query } = useKBar()

    return (
        <button
            onClick={query.toggle}
            className="btn btn-ghost -ml-4 text-base"
        >
            {children}
        </button>
    )
}

export default KBarButton
