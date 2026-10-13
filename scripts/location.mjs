import { appendFileSync, writeFileSync } from "node:fs"

const fail = (msg) => {
    console.log(`::error::${msg}`)
    process.exit(1)
}

const res = await fetch(
    `https://nomads.com/@haarolean.json?key=${process.env.NOMADS_KEY}`
)
const data = await res.json().catch(() => ({}))
const now = data.location?.now
if (!res.ok || !now?.city)
    fail(
        `location unavailable (http=${res.status}, error=${data.error ?? "none"})`
    )

const tz = await fetch(
    `https://timeapi.io/api/timezone/coordinate?latitude=${now.latitude}&longitude=${now.longitude}`
)
    .then((r) => r.json())
    .catch(() => ({}))
if (!tz.timeZone) fail("timezone lookup failed")

const place = (p) => `${p.state || p.city}, ${p.country}`
const next = data.location.next
const location = JSON.stringify({
    current: place(now),
    timezone: tz.timeZone,
    next: next?.city ? place(next) : "",
    nextDate: next?.date_start ?? "",
})
const live = await fetch("https://haarolean.dev/location.json").then(
    (r) => (r.ok ? r.text() : ""),
    () => ""
)
const changed = location !== live.trim()
writeFileSync(new URL("../src/location.json", import.meta.url), location)
console.log(
    `location ok (http=${res.status}, tz=${tz.timeZone}, changed=${changed})`
)
if (process.env.GITHUB_OUTPUT)
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
