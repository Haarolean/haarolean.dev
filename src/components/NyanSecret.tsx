import { useEffect } from "react"
import {
    burstAt,
    prewarmBossArt,
    shootInvader,
    startInvaders,
    stopInvaders,
} from "./NyanGame.ts"

// eye centers and cat hitbox as fractions of nyan.gif (3000x800); gifBox
// mirrors the tsparticles background config exactly: 60vw at "0 85%", or
// 120vw at "-50vw 88%" when screen.availWidth < 768 (responsive "screen" mode)
const EYES = [
    { x: 0.889, y: 0.49 },
    { x: 0.917, y: 0.49 },
]
const CAT = { x0: 0.73, y0: 0.19, x1: 1, y1: 0.88 }
const GIF_RATIO = 800 / 3000

const gifBox = () => {
    const mobile = screen.availWidth < 768
    const w = innerWidth * (mobile ? 1.2 : 0.6)
    const h = w * GIF_RATIO
    return {
        x: mobile ? innerWidth * -0.5 : 0,
        y: (innerHeight - h) * (mobile ? 0.88 : 0.85),
        w,
        h,
    }
}

const catFacePos = () => {
    const box = gifBox()
    return { x: box.x + box.w * 0.9, y: box.y + box.h * 0.49 }
}

const eyePositions = () => {
    const box = gifBox()
    return EYES.map((eye) => ({
        x: box.x + box.w * eye.x,
        y: box.y + box.h * eye.y,
    }))
}

let lasersOn =
    !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    localStorage.getItem("nyan-lasers") === "1"
let catTaps = 0

const setLasers = (on: boolean) => {
    lasersOn = on
    localStorage.setItem("nyan-lasers", on ? "1" : "0")
    document.body.classList.toggle("laser-mode", on)
    if (on) {
        startInvaders({ catFace: catFacePos, eyes: eyePositions })
        const pos = catFacePos()
        burstAt(pos.x, pos.y)
    } else {
        stopInvaders()
    }
}

const tapCounter = (n: number) => {
    const pos = catFacePos()
    const el = document.createElement("div")
    el.textContent = `x${n}`
    Object.assign(el.style, {
        position: "fixed",
        left: `${pos.x + (Math.random() * 40 - 20)}px`,
        top: `${pos.y - 60}px`,
        zIndex: "41",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "20px",
        color: "#f8f8f2",
        textShadow: "0 0 8px #fe77ff",
        pointerEvents: "none",
    })
    document.body.appendChild(el)
    el.animate(
        [
            { opacity: 0, transform: "translateY(0)" },
            { opacity: 1, transform: "translateY(-20px)" },
            { opacity: 0, transform: "translateY(-45px)" },
        ],
        { duration: 700, easing: "ease-out" }
    ).onfinish = () => el.remove()
}

export default function NyanSecret() {
    useEffect(() => {
        prewarmBossArt()
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

        document.body.classList.toggle("laser-mode", lasersOn)
        if (lasersOn) startInvaders({ catFace: catFacePos, eyes: eyePositions })

        const shoot = (e: MouseEvent) => {
            const box = gifBox()
            const fx = (e.clientX - box.x) / box.w
            const fy = (e.clientY - box.y) / box.h

            if (fx >= CAT.x0 && fx <= CAT.x1 && fy >= CAT.y0 && fy <= CAT.y1) {
                if (++catTaps >= 5) {
                    catTaps = 0
                    setLasers(!lasersOn)
                } else {
                    tapCounter(catTaps)
                }
            } else {
                catTaps = 0
            }

            if (!lasersOn) return

            shootInvader(e.clientX, e.clientY)
        }

        window.addEventListener("click", shoot)
        return () => {
            window.removeEventListener("click", shoot)
            stopInvaders()
        }
    }, [])

    return null
}
