import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "./context/userContext"

function ProtectedRoute() {
    const { loading, isAuthenticated } = useUser()

    if (loading) return <h1>
        Loading...
    </h1>

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return (
        <Outlet /> //me dice que continue con el componente que está dentro
    )
}

export default ProtectedRoute