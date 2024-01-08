import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadFull } from "tsparticles"
import BackgroundOptions from "util/BackgroundOptions.ts"

export default function NyanBackground() {
    const [particlesInitialized, setParticlesInitialized] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine)
        }).then(() => {
            setParticlesInitialized(true)
        })
    }, [])

    if (particlesInitialized) {
        return (
            <div className="fixed -z-10">
                <Particles id="tsparticles" options={BackgroundOptions} />
            </div>
        )
    }
}
