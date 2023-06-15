import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div className='navbar'>
            
            <ul className='nav-ul'>
                {
                    auth ? <ul>
                        <li ><Link to="/">Books</Link></li>
                        <li ><Link to="/add">Add Book</Link></li>
                        {/* <li ><Link to="/update">Update Product</Link></li> */}
                        {/* <li ><Link to="/profile">Profile</Link></li> */}
                        <li> <Link onClick={logout} to="/signup"><span className='welcome'>Hello { JSON.parse(auth).name}</span>  Logout</Link></li>
                    </ul>
                        : <ul className='nav_signup'>
                            <li><Link to="/signup">SignUp</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                }
            </ul>
        </div>
    )
}

export default Nav;