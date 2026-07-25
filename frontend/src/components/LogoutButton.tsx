import { useNavigate } from "react-router-dom"

function LogoutButton() {

    const navigate = useNavigate()
    const logout = async () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <button onClick={logout}
            className=" border px-2 py-1 bg-blue-600 hover:bg-blue-700  cursor-pointer mx-2 rounded-sm text-white
                     ">
            Logout</button>
    )
}

export default LogoutButton
