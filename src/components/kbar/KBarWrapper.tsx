import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarSearch,
} from "kbar"
import React, { ReactNode } from "react"
import RenderResults from "./RenderResults.tsx"
import { useKBarActions } from "../hooks/useKBarActions.ts"

type KBarWrapperProps = {
    children: ReactNode
}

const KBarWrapper: React.FC<KBarWrapperProps> = ({ children }) => {
    const actions = useKBarActions()

    return (
        <>
            <KBarProvider actions={actions}>
                <KBarPortal>
                    <KBarPositioner
                        className="pt-14vh fixed inset-0 box-border flex w-full items-center justify-center
                     bg-black bg-transparent/80 pb-4 pl-4 pr-4"
                    >
                        <KBarAnimator
                            className="w-full max-w-[600px] overflow-hidden rounded-lg bg-base-100
                        bg-opacity-85 text-primary shadow-lg"
                        >
                            <KBarSearch
                                className="box-border w-full border-none bg-base-100 bg-opacity-10
                            px-4 py-3 text-base text-primary outline-none"
                            />
                            <RenderResults />
                        </KBarAnimator>
                    </KBarPositioner>
                </KBarPortal>
                {children}
            </KBarProvider>
        </>
    )
}

export default KBarWrapper
