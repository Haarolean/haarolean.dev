import Index from "./pages/Index.tsx"
import { KBarProvider } from "kbar"
import NyanConsole from "./components/NyanConsole.tsx"

function App() {
    return (
        <>
            <KBarProvider>
                <NyanConsole />
                <Index />
            </KBarProvider>
        </>
    )
}

export default App
