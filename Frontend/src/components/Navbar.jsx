import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../slice/authSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)

    const handleLogout = async()=>{
        await dispatch(userLogOut());
        navigate('/')
    }
  return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Movie Tracker</Link>

            <div className="ms-auto d-flex align-items-center gap-3">
                {user ? (
                    <>
                        <span className="text-light">Hi, {user.userName}</span>
                        <Link className="btn btn-outline-light btn-sm" to="/watchlist">Watchlist</Link>
                        <Link className="btn btn-outline-light btn-sm" to="/my-reviews">My Reviews</Link>
                        {user.role === 'admin' && (
                            <Link className="btn btn-warning btn-sm" to="/admin">Admin</Link>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                        <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
  )
}
