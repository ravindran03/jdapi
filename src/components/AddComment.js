import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";



const AddComment = ({articleID,onArticleChange}) =>{
    const [name,setName] = useState("");
    const [commentText,setCommentText] = useState("");
    const {user}=useUser();

    const addCommentText = async () =>{
        const token = await user.getIdToken()
        const headers = token ? {authtoken: token} : {}
        const responce = await axios.post(`/api/articles/${articleID}/comment`,{
            postedby: name,
            comment: commentText,
        },{
            headers
        });
        const newarticledata=responce.data;
        onArticleChange(newarticledata);
        setName('');
        setCommentText('');
        
    }
    return(
        <div className="commentbox">
            {user && <p>you are posting as {user.email}</p>}
            <label>
                comment:
                <textarea rows={4} cols={50} value={commentText} onChange={e=> setCommentText(e.target.value)} />
            </label><br />
            <button onClick={addCommentText} >add comment</button>
            
        </div>
    )

}
export default AddComment;    

