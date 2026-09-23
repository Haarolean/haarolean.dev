import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NyanConsole from "./components/NyanConsole.tsx"
import { CommandMenuProvider } from "./components/cmdk/CommandMenu"
import Index from "./pages/Index.tsx"
import Projects from "./pages/Projects.tsx"
import { TextPage } from "./pages/TextPage.tsx"
import Uses from "./pages/Uses.tsx"

function App() {
    return (
        <>
            <NyanConsole />
            <Router>
                <CommandMenuProvider>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                            path="/about"
                            element={
                                <TextPage title="About">Coming soon.</TextPage>
                            }
                        />
                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/articles"
                            element={
                                <TextPage title="Articles">
                                    Coming soon.
                                </TextPage>
                            }
                        />
                        <Route path="/uses" element={<Uses />} />
                    </Routes>
                </CommandMenuProvider>
            </Router>
        </>
    )
}

export default App
