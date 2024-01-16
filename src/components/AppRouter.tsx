import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Index from "../pages/Index.tsx"
import KBarWrapper from "./kbar/KBarWrapper.tsx"

export default function AppRouter() {
    return (
        <Router>
            <KBarWrapper>
                <Routes>
                    <Route path="/" element={<Index />} />
                    {/*<Route path="/404" element={<FourOFour />} />*/}
                </Routes>
            </KBarWrapper>
        </Router>
    )
}
