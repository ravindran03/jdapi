import { Link, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

const NavBar = () => {
    const {user} = useUser();
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const logout = async ()=>{    
        await signOut(getAuth())
        .then(()=>{setMessage('you are logged out')})
        .finally(()=>{window.location.reload()})
    }
    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={'/'} >Homepage</Link>
                </li>
                <li>
                    <Link to={'/articles'}>articles</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>                    
                </li>
                {user?
                <>
                    <li>
                    <Link  to={'/addarticle'}>Add Article</Link>                    
                    </li>
                    <li>
                        <Link  onClick={logout}>Logout</Link>                    
                    </li>
                </>:
                <li>
                    <Link to={'/login'}>Login</Link>                    
                </li>} 
                {message &&
                <li className="message">{message}</li>}                      
            </ul>
        </nav>
    );
}

export default NavBar;