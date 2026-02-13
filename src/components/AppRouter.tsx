import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Index from "../pages/Index.tsx"
import { CommandMenuProvider } from "./cmdk/CommandMenu"
import Stuff from "../pages/Stuff.tsx"

export default function AppRouter() {
    return (
        <Router>
            <CommandMenuProvider>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/stuff" element={<Stuff />} />
                    {/*<Route path="/404" element={<FourOFour />} />*/}
                </Routes>
            </CommandMenuProvider>
        </Router>
    )
}
