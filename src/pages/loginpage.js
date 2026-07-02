import { useState } from "react";
import { Link } from "react-router-dom";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error ,setError] = useState('');
    const navigate=useNavigate();
    const login = async (e) =>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(getAuth(),email,password);
            navigate('/articles');
            
        }
        catch(e) {
            console.log(e.message)
            setError(e.message);        
        }
        
    }
    
    return(
        <>
        {error && <p className="error">{error}</p>}
        <h2>LoginPage</h2>
        <div>
            <input
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} />
            <input type="password" 
                value={password} 
                placeholder="Password" 
                onChange={e=>setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <Link to={'/createnewaccount'}> don't have an account? Create one here </Link>
        </div>
        </>
    )
}

export default LoginPage;