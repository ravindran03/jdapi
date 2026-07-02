import { useState } from "react";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const CreateNewAccount = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const navigate=useNavigate();
    
    const createaccount = async () =>{
        
        if(password===confirmPassword){
            try{
                await createUserWithEmailAndPassword(getAuth(),email,password);
                navigate('/articles');
            }
            catch(e){
                setError(e.message);
                
            }
            
        }
        else{
            setError("the passwords dont match together");
            return;
        }
    }
    

    // useEffect(()=>{
    //     const checker = async ()=>{
    //         await createUserWithEmailAndPassword(getAuth(),email,password).
    //         .catch((e)=>{
    //             setError(e.message);
    //         }                
    //         )
    //     }
    //     checker();
    // },[confirmPassword])
    
        

    return(
        <>
        {error && <p className="error">{error}</p>}
        <h2>CreateNewAccount:</h2>
        <div>
            <input placeholder="emailadress" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <input placeholder="confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
            <button onClick={createaccount}>createaccount</button>
            <Link to={'/login'}>already have an account! login here</Link>
        </div>        
        </>
    )
}
export default CreateNewAccount;