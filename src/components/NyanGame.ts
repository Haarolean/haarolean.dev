import { Container } from "@tsparticles/engine"

type Fx = {
    catFace: () => { x: number; y: number }
    eyes: () => { x: number; y: number }[]
}

type EmitterContainer = Container & {
    addEmitter: (
        options: unknown,
        position?: { x: number; y: number }
    ) => Promise<unknown>
}

let container: EmitterContainer | undefined
let gameOn = false

const music = new Audio("/nyan.mp3")
music.loop = true

const applyGameState = () => {
    if (!container) return
    const bg = container.actualOptions.background.color as { value: string }
    bg.value = gameOn ? "#021326" : "#043564"
    container.canvas.initBackground()
    // global motion multiplier: the move step does velocity *= reduceFactor
    container.retina.reduceFactor = gameOn ? 2.5 : 1
    // short repulse window in game mode so the click's 1/d² kick has ended
    // before the delayed burst spawns (see modes.emitters life.wait)
    const modes = container.actualOptions.interactivity.modes as unknown as {
        repulse: { duration: number }
    }
    modes.repulse.duration = gameOn ? 0.15 : 0.4
}

type SparkConfig = {
    size?: { width: number; height: number }
    particles?: {
        move?: { speed?: { min: number; max: number }; decay?: number }
        size?: { value?: { min: number; max: number } }
    }
}

const sparkConfig = () => {
    const modes = container?.actualOptions.interactivity.modes as unknown as {
        emitters?: { value?: SparkConfig }
    }
    return modes?.emitters?.value
}

// explosion config is tuned in absolute px for a ~390px phone
const scaleExplosions = () => {
    const em = sparkConfig()
    if (!em) return
    const s = Math.min(Math.max(innerWidth / 900, 1), 2.5)
    if (em.size) {
        em.size.width = 100 * s
        em.size.height = 100 * s
    }
    const move = em.particles?.move
    if (move?.speed) {
        move.speed.min = 4 * Math.sqrt(s)
        move.speed.max = 20 * Math.sqrt(s)
    }
    if (move) {
        // lower decay on big screens: sparks keep drifting through the whole
        // opacity fade instead of stalling early and dimming frozen
        move.decay = 0.15 / s
    }
    const size = em.particles?.size?.value
    if (size) {
        size.min = 2 * Math.sqrt(s)
        size.max = 5 * Math.sqrt(s)
    }
}

export const setGameContainer = (c: Container) => {
    container = c as EmitterContainer
    scaleExplosions()
    applyGameState()
}

// addEmitter positions are canvas pixels, not css pixels; clamp into the
// viewport or sparks spawn out of bounds and outModes destroys them unseen
const toCanvas = (cssX: number, cssY: number) => {
    const pr = container?.retina.pixelRatio ?? 1
    const x = Math.min(Math.max(cssX, 24), innerWidth - 24)
    const y = Math.min(Math.max(cssY, 24), innerHeight - 24)
    return { x: x * pr, y: y * pr }
}

export const burstAt = (cssX: number, cssY: number) => {
    if (!container) return
    void container.addEmitter(sparkConfig() ?? {}, toCanvas(cssX, cssY))
}

const puffAt = (cssX: number, cssY: number, sparks: number) => {
    if (!container) return
    void container.addEmitter(
        {
            // rate emission, NOT startCount: startCount fires on the first
            // update ignoring life.wait, so those sparks spawn inside the
            // click-repulse singularity and get flung off-canvas unseen
            rate: { quantity: sparks, delay: 0.5 },
            life: { wait: true, delay: 0.45, count: 1, duration: 0.25 },
            size: { width: 40, height: 40, mode: "precise" },
            particles: sparkConfig()?.particles ?? {},
        },
        toCanvas(cssX, cssY)
    )
}

type Invader = {
    el: HTMLElement
    y: number
    speed: number
    hp: number
    hpMax?: number
    bounty?: number
    x?: number
    vx?: number
    left?: number
    boss?: boolean
    crab?: boolean
    hpFill?: HTMLDivElement
}

const BOSS_HP = 5
let fx: Fx | undefined
let invaders: Invader[] = []
let spawnTimer: number | undefined
let invaderRaf: number | undefined
let lastTick = 0
let scoreEl: HTMLDivElement | undefined
let score = 0
let best = Number(localStorage.getItem("nyan-best") ?? 0)
// nukes stack, one per boss kill; the arming delay (from the latest kill)
// stops the frantic clicks right after a boss death from instantly wasting one
let aoeCharges = 0
let aoeArmedAt = 0
const AOE_ARM_MS = 800
const SHOOP_AT = 1337
let shoopSpawned = false
let shoopBeams: {
    el: HTMLDivElement
    inv: Invader
    tx: number
    ty: number
}[] = []

const drawScore = () => {
    if (scoreEl)
        scoreEl.textContent = `${score} · HI ${best}${
            aoeCharges ? ` ⚡️x${aoeCharges}` : ""
        }`
}

const spawnInvader = () => {
    const el = document.createElement("div")
    el.textContent = "👾"
    Object.assign(el.style, {
        position: "fixed",
        left: `${8 + Math.random() * 84}vw`,
        top: "0",
        fontSize: `${34 + Math.random() * 22}px`,
        zIndex: "40",
        pointerEvents: "none",
        transform: "translateY(-40px)",
        filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
    })
    document.body.appendChild(el)
    invaders.push({ el, y: -40, speed: 30 + Math.random() * 50, hp: 1 })
}

const makeHpBar = (el: HTMLElement) => {
    const bar = document.createElement("div")
    Object.assign(bar.style, {
        position: "absolute",
        left: "10%",
        top: "-12px",
        width: "80%",
        height: "7px",
        background: "rgba(248, 248, 242, 0.25)",
        borderRadius: "4px",
        overflow: "hidden",
    })
    const fill = document.createElement("div")
    Object.assign(fill.style, {
        width: "100%",
        height: "100%",
        background: "#50fa7b",
        transition: "width 0.15s ease-out",
    })
    bar.appendChild(fill)
    el.appendChild(bar)
    return fill
}

const spawnBoss = () => {
    // fan simultaneous bosses (nuke wipes chain-cross thresholds) into
    // separate rows and speeds, or they fly perfectly superimposed
    const n = invaders.filter((i) => i.boss).length
    const top = 70 + n * 150
    const el = document.createElement("div")
    el.textContent = "🛸"
    Object.assign(el.style, {
        position: "fixed",
        left: "0",
        top: `${top}px`,
        fontSize: "112px",
        zIndex: "40",
        pointerEvents: "none",
        transform: "translateX(-160px)",
    })
    const fill = makeHpBar(el)
    document.body.appendChild(el)
    invaders.push({
        el,
        y: top,
        speed: 0,
        hp: BOSS_HP,
        x: -160,
        vx: ((innerWidth + 320) / 9) * (1 + n * 0.15),
        boss: true,
        hpFill: fill,
    })
}

const banner = (text: string, ms: number) => {
    const el = document.createElement("div")
    el.textContent = text
    Object.assign(el.style, {
        position: "fixed",
        left: "50%",
        top: "32%",
        transform: "translateX(-50%)",
        zIndex: "41",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "min(26px, 4.2vw)",
        color: "#f8f8f2",
        textShadow: "0 0 12px #8be9fd",
        whiteSpace: "nowrap",
        pointerEvents: "none",
    })
    document.body.appendChild(el)
    el.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
        { duration: ms, easing: "ease-out" }
    ).onfinish = () => el.remove()
}

const spawnShoop = () => {
    // wrapper div: <img> is a replaced element, children (the hp bar) never
    // render inside it
    const el = document.createElement("div")
    const img = document.createElement("img")
    img.src = "/game/shoop.png"
    img.alt = "🌚"
    Object.assign(img.style, { width: "min(150px, 34vw)", display: "block" })
    el.appendChild(img)
    Object.assign(el.style, {
        position: "fixed",
        left: "0",
        top: "40px",
        zIndex: "40",
        pointerEvents: "none",
        transform: "translateX(-160px)",
    })
    const fill = makeHpBar(el)
    document.body.appendChild(el)
    const inv: Invader = {
        el,
        y: 40,
        speed: 0,
        hp: 13,
        hpMax: 13,
        bounty: 137,
        x: -160,
        vx: (innerWidth + 440) / 20,
        boss: true,
        hpFill: fill,
    }
    invaders.push(inv)
    banner("IMMA CHARGIN MAH LAZER", 1400)
    let fired = false
    const fire = () => {
        if (!invaders.includes(inv)) {
            clearInterval(fireTimer)
            return
        }
        if (!fired) {
            fired = true
            banner("IMMA FIRIN MAH LAZER!!!", 1600)
        }
        const r = el.getBoundingClientRect()
        const mx = r.left + r.width * 0.45
        const my = r.top + r.height * 0.6
        const target = fx?.catFace() ?? { x: innerWidth / 2, y: innerHeight }
        const dx = target.x - mx
        const dy = target.y - my
        const beam = document.createElement("div")
        Object.assign(beam.style, {
            position: "fixed",
            left: `${mx}px`,
            top: `${my}px`,
            width: `${Math.hypot(dx, dy)}px`,
            height: "10px",
            background: "#f8f8f2",
            boxShadow: "0 0 24px 8px #8be9fd",
            transform: `rotate(${Math.atan2(dy, dx)}rad)`,
            transformOrigin: "0 50%",
            pointerEvents: "none",
            zIndex: "39",
        })
        document.body.appendChild(beam)
        shoopBeams.push({ el: beam, inv, tx: target.x, ty: target.y })
        beam.animate(
            [{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
            { duration: 1100, easing: "ease-in-out" }
        ).onfinish = () => {
            beam.remove()
            shoopBeams = shoopBeams.filter((b) => b.el !== beam)
        }
    }
    const fireTimer = window.setInterval(fire, 4000)
    window.setTimeout(fire, 1400)
}

const tickInvaders = (t: number) => {
    const dt = lastTick ? (t - lastTick) / 1000 : 0
    lastTick = t
    for (const inv of [...invaders]) {
        if (inv.vx === undefined) {
            inv.y += inv.speed * dt
            if (inv.y >= innerHeight - 56) {
                inv.el.textContent = "🦀"
                inv.el.style.filter = ""
                inv.crab = true
                inv.y = innerHeight - 56
                inv.left = inv.el.getBoundingClientRect().left
                inv.x = 0
                inv.vx =
                    (Math.random() < 0.5 ? -1 : 1) * (350 + Math.random() * 250)
            }
            inv.el.style.transform = `translateY(${inv.y}px)`
        } else {
            inv.x = (inv.x ?? 0) + inv.vx * dt
            const gone = inv.boss
                ? inv.x > innerWidth + 460
                : (inv.left ?? 0) + inv.x < -140 ||
                  (inv.left ?? 0) + inv.x > innerWidth + 140
            if (gone) {
                inv.el.remove()
                invaders.splice(invaders.indexOf(inv), 1)
            } else {
                inv.el.style.transform = inv.boss
                    ? `translateX(${inv.x}px)`
                    : `translate(${inv.x}px, ${inv.y}px)`
            }
        }
    }
    for (const b of shoopBeams) {
        if (!invaders.includes(b.inv)) continue
        const r = b.inv.el.getBoundingClientRect()
        const mx = r.left + r.width * 0.45
        const my = r.top + r.height * 0.6
        const dx = b.tx - mx
        const dy = b.ty - my
        Object.assign(b.el.style, {
            left: `${mx}px`,
            top: `${my}px`,
            width: `${Math.hypot(dx, dy)}px`,
            transform: `rotate(${Math.atan2(dy, dx)}rad)`,
        })
    }
    invaderRaf = requestAnimationFrame(tickInvaders)
}

// first use of these assets stalls mobile compositors mid-game; pay it at load
export const prewarmBossArt = () => {
    const el = document.createElement("div")
    el.textContent = "🛸"
    Object.assign(el.style, {
        position: "fixed",
        left: "50%",
        top: "50%",
        fontSize: "112px",
        opacity: "0.01",
        pointerEvents: "none",
        zIndex: "1",
    })
    document.body.appendChild(el)
    window.setTimeout(() => el.remove(), 1500)
    const img = new Image()
    img.src = "/game/shoop.png"
    void img.decode().catch(() => undefined)
    void document.fonts.load("16px 'Press Start 2P'").catch(() => undefined)
}

export const startInvaders = (effects: Fx) => {
    fx = effects
    if (spawnTimer) return
    gameOn = true
    applyGameState()
    void music.play().catch(() => undefined)
    score = 0
    shoopSpawned = false
    scoreEl = document.createElement("div")
    Object.assign(scoreEl.style, {
        position: "fixed",
        bottom: "18px",
        right: "24px",
        zIndex: "40",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "16px",
        color: "#f8f8f2",
        pointerEvents: "none",
    })
    document.body.appendChild(scoreEl)
    drawScore()
    spawnInvader()
    const scheduleSpawn = () => {
        spawnTimer = window.setTimeout(
            () => {
                spawnInvader()
                scheduleSpawn()
            },
            Math.max(1600 - score * 25, 450)
        )
    }
    scheduleSpawn()
    lastTick = 0
    invaderRaf = requestAnimationFrame(tickInvaders)
}

export const stopInvaders = () => {
    gameOn = false
    applyGameState()
    music.pause()
    music.currentTime = 0
    if (spawnTimer) clearTimeout(spawnTimer)
    spawnTimer = undefined
    if (invaderRaf) cancelAnimationFrame(invaderRaf)
    invaderRaf = undefined
    for (const inv of invaders) inv.el.remove()
    invaders = []
    aoeCharges = 0
    aoeArmedAt = 0
    for (const b of shoopBeams) b.el.remove()
    shoopBeams = []
    scoreEl?.remove()
    scoreEl = undefined
}

const killInvader = (inv: Invader) => {
    const r = inv.el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const t = inv.el.style.transform

    burstAt(cx, cy)
    invaders.splice(invaders.indexOf(inv), 1)
    inv.el.animate(
        [
            { opacity: 1, transform: t },
            { opacity: 0, transform: `${t} scale(0.2)` },
        ],
        { duration: 350, easing: "ease-out" }
    ).onfinish = () => inv.el.remove()

    if (inv.boss) {
        burstAt(cx - 50, cy + 10)
        burstAt(cx + 50, cy - 10)
        score += inv.bounty ?? 10
        aoeCharges++
        aoeArmedAt = performance.now()
    } else {
        score++
        if (score % 10 === 0) spawnBoss()
    }
    if (!shoopSpawned && score >= SHOOP_AT) {
        shoopSpawned = true
        spawnShoop()
    }
    if (score > best) {
        best = score
        localStorage.setItem("nyan-best", String(best))
    }
    drawScore()
}

const fireBeams = (x: number, y: number) => {
    for (const eye of fx?.eyes() ?? []) {
        const dx = x - eye.x
        const dy = y - eye.y
        const beam = document.createElement("div")
        Object.assign(beam.style, {
            position: "fixed",
            left: `${eye.x}px`,
            top: `${eye.y}px`,
            width: `${Math.hypot(dx, dy)}px`,
            height: "2px",
            background: "#f00",
            boxShadow: "0 0 6px 1px #f00",
            transform: `rotate(${Math.atan2(dy, dx)}rad)`,
            transformOrigin: "0 50%",
            pointerEvents: "none",
            zIndex: "40",
        })
        document.body.appendChild(beam)
        beam.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 400,
            easing: "ease-out",
        }).onfinish = () => beam.remove()
    }
}

export const shootInvader = (x: number, y: number) => {
    if (music.paused) void music.play().catch(() => undefined)
    fireBeams(x, y)
    const pad = 10
    // rects can overlap (armada rows, grunt clusters): hit the nearest center
    let idx = -1
    let bestDist = Infinity
    invaders.forEach((cand, i) => {
        if (cand.crab) return
        const r = cand.el.getBoundingClientRect()
        const inside =
            x >= r.left - pad &&
            x <= r.right + pad &&
            y >= r.top - pad &&
            y <= r.bottom + pad
        if (!inside) return
        const d = Math.hypot(
            x - (r.left + r.width / 2),
            y - (r.top + r.height / 2)
        )
        if (d < bestDist) {
            bestDist = d
            idx = i
        }
    })
    // boss clicks must not spend the nuke, so the hit-test runs first
    if (
        !invaders[idx]?.boss &&
        aoeCharges > 0 &&
        performance.now() - aoeArmedAt > AOE_ARM_MS
    ) {
        aoeCharges--
        for (const inv of [...invaders]) {
            if (!inv.boss && !inv.crab) killInvader(inv)
        }
        drawScore()
        return
    }
    if (idx < 0) return
    const inv = invaders[idx]
    const r = inv.el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const t = inv.el.style.transform

    inv.hp--
    if (inv.hpFill) {
        const ratio = inv.hp / (inv.hpMax ?? BOSS_HP)
        inv.hpFill.style.width = `${ratio * 100}%`
        inv.hpFill.style.background =
            ratio > 0.6 ? "#50fa7b" : ratio > 0.3 ? "#f1fa8c" : "#ff5555"
    }
    if (inv.hp > 0) {
        const dmg = (inv.hpMax ?? BOSS_HP) - inv.hp
        puffAt(cx, cy, Math.min(20 + 10 * dmg, 50))
        inv.el.animate(
            [
                { transform: `${t} scale(1)` },
                { transform: `${t} scale(1.2)` },
                { transform: `${t} scale(1)` },
            ],
            { duration: 180, easing: "ease-out" }
        )
        return
    }

    killInvader(inv)
}
