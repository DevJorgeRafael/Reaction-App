import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "./context/userContext"

function ProtectedRoute() {
    const { loading, isAuthenticated } = useUser()

    if (loading) return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return (
        <Outlet /> //me dice que continue con el componente que está dentro
    )
}

export default ProtectedRoute