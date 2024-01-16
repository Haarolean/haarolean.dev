import { useNavigate } from "react-router-dom"
import actions from "../kbar/actions.ts"

export const useKBarActions = () => {
    const navigate = useNavigate()
    return actions(navigate)
}
