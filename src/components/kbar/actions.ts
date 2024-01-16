import { NavigateFunction } from "react-router/dist/lib/hooks"

const actions = (navigate: NavigateFunction) => [
    {
        id: "home",
        name: "Home",
        shortcut: ["h"],
        keywords: "home index main",
        section: "go to",
        perform: () => navigate("/"),
    },
    {
        id: "about",
        name: "About",
        shortcut: ["a"],
        keywords: "about me bio",
        section: "go to",
        perform: () => (window.location.pathname = "blog"),
    },
    {
        id: "projects",
        name: "Projects",
        shortcut: ["p"],
        keywords: "projects",
        section: "go to",
        perform: () => (window.location.pathname = "blog"),
    },
    {
        id: "articles",
        name: "Articles",
        shortcut: ["b"],
        keywords: "articles medium",
        section: "go to",
        perform: () => (window.location.pathname = "blog"),
    },
    {
        id: "uses",
        name: "Uses",
        shortcut: ["u"],
        keywords: "hardware software stuff",
        section: "go to",
        perform: () => (window.location.pathname = "blog"),
    },
]

export default actions
