import { ActionId, ActionImpl, KBarResults, useMatches } from "kbar"
import React, { forwardRef, useMemo } from "react"

export default function RenderResults() {
    const { results, rootActionId } = useMatches()

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === "string" ? (
                    <div className="pb-2 pl-4 pr-4 pt-2 text-xs uppercase opacity-50">
                        {item}
                    </div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                    />
                )
            }
        />
    )
}

const ResultItem = forwardRef(
    (
        {
            action,
            active,
            currentRootActionId,
        }: {
            action: ActionImpl
            active: boolean
            currentRootActionId: ActionId | null | undefined
        },
        ref: React.Ref<HTMLDivElement>
    ) => {
        const ancestors = useMemo(() => {
            if (!currentRootActionId) return action.ancestors
            const index = action.ancestors.findIndex(
                (ancestor) => ancestor.id === currentRootActionId
            )
            // +1 removes the currentRootAction; e.g.
            // if we are on the "Set theme" parent action,
            // the UI should not display "Set theme… > Dark"
            // but rather just "Dark"
            return action.ancestors.slice(index + 1)
        }, [action.ancestors, currentRootActionId])

        return (
            <div
                ref={ref}
                className={`${
                    active
                        ? "border-solid border-[#f8f8f2] bg-primary bg-opacity-20"
                        : "transparent border-transparent"
                } flex cursor-pointer items-center justify-between border-l-2 pb-3 pl-4 pr-4 pt-3`}
            >
                <div className="flex items-center gap-2 text-base">
                    {action.icon && action.icon}
                    <div className="flex flex-col">
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <React.Fragment key={ancestor.id}>
                                        <span className="mr-2 opacity-50">
                                            {ancestor.name}
                                        </span>
                                        <span className="mr-2">&rsaquo;</span>
                                    </React.Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && (
                            <span className="text-xs">{action.subtitle}</span>
                        )}
                    </div>
                </div>
                {action.shortcut?.length ? (
                    <div aria-hidden className="grid grid-flow-col gap-1">
                        {action.shortcut.map((sc) => (
                            <kbd
                                key={sc}
                                className="rounded bg-white bg-opacity-20 px-[8px] py-[4px] text-xs uppercase "
                            >
                                {sc}
                            </kbd>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }
)

ResultItem.displayName = "ResultItem"
