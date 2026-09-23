import { PropsWithChildren, ReactNode } from "react"
import { TextPage } from "./TextPage.tsx"

const Card = ({
    href,
    icon,
    name,
    badge,
    meta,
    children,
}: PropsWithChildren<{
    href: string
    icon?: ReactNode
    name: string
    badge?: string
    meta?: string
}>) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-nyan/20 p-5 transition-colors hover:border-nyan/60"
        >
            {icon}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold">{name}</span>
                    {badge && (
                        <span className="rounded-full bg-nyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            {badge}
                        </span>
                    )}
                    {meta && (
                        <span className="text-sm text-nyan/60">{meta}</span>
                    )}
                </div>
                <p className="mt-1 text-nyan/80">{children}</p>
            </div>
            <span className="text-xl text-nyan/40 transition-colors group-hover:text-nyan">
                →
            </span>
        </a>
    )
}

export default function Projects() {
    return (
        <TextPage title="Projects">
            <div className="space-y-10">
                <section>
                    <h2 className="font-heading text-2xl">
                        <a
                            href="https://roguepaws.dev"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                        >
                            roguepaws ↗
                        </a>
                    </h2>
                    <p className="mb-4 mt-1 text-nyan/70">
                        my umbrella for indie apps, SaaS and experiments
                    </p>
                    <Card
                        href="https://kapybro.dev"
                        icon={
                            <img
                                src="/logos/kapybro.svg"
                                alt="Kapybro"
                                className="h-12 w-12 rounded-xl"
                            />
                        }
                        name="Kapybro"
                        badge="GitHub App"
                    >
                        Automate GitHub maintenance — triage, labels, AI
                        summaries, auto-merge and more.
                    </Card>
                </section>
                <section>
                    <h2 className="mb-4 font-heading text-2xl">open source</h2>
                    <Card
                        href="https://github.com/kafbat/kafka-ui"
                        icon={
                            <img
                                src="/logos/kafka-ui.svg"
                                alt="kafka-ui"
                                className="h-12 w-12 rounded-xl"
                            />
                        }
                        name="kafka-ui"
                        meta="founder & maintainer · 10k+ ⭐"
                    >
                        Open-source web UI for managing Apache Kafka clusters.
                    </Card>
                </section>
            </div>
        </TextPage>
    )
}
