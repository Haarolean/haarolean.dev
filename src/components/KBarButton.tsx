import React, { HTMLAttributes, ReactNode } from "react"

interface KBarButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const KBarButton: React.FC<KBarButtonProps> = ({ children }) => {
    return <button className="btn btn-ghost -ml-4 text-base">{children}</button>
}

export default KBarButton
