import { useEffect, useState } from "react"

export default function LiveClock({ timezone }: { timezone: string }) {
    const [time, setTime] = useState(getTimeParts(timezone))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeParts(timezone))
        }, 1000)
        return () => clearInterval(interval)
    }, [timezone])

    return (
        <span className="font-code text-sm tabular-nums">
            {time.hours}
            <Colon />
            {time.minutes}
        </span>
    )
}

function Colon() {
    return <span className="animate-blink">:</span>
}

function getTimeParts(timezone: string) {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
    const parts = formatter.formatToParts(now)
    return {
        hours: parts.find((p) => p.type === "hour")?.value ?? "00",
        minutes: parts.find((p) => p.type === "minute")?.value ?? "00",
    }
}
