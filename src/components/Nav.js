import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <img alt="" className="logo"
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1719360000&semt=sph">
            </img>
            {
                auth ? <ul className="nav-ul" >
                    <li> <Link to="/">Product</Link></li>
                    <li> <Link to="/add">Add Product</Link></li>
                    <li> <Link to="/update/:id">Update Product</Link></li>
                    <li> <Link to="/profile">Profile</Link></li>
                    <li><Link to="/login" onClick={logout} >Logout ({JSON.parse(auth).name})</Link></li>

                    {/* <li>{auth ? <Link to="/signup" onClick={logout} >Logout</Link> : 
                        <Link to="/signup">Sign Up</Link>} </li>
                        <li> <Link to="/login">Login</Link></li> */}
                </ul> :
                    <ul className="nav-ul nav-right" >
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li> <Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav;