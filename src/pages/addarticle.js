import axios from "axios";
import { useState } from "react"
import useUser from "../hooks/useUser";

const AddArticle = ()=>{
    const [articlename,setArtilceName] = useState('');
    const [articlecontent,setArticleContent] = useState('');
    const {user} = useUser();
    const addarticle = async () =>{
        
        const token = await user.getIdToken();
        const headers = {authtoken: token}
        const {email} = headers;
        // console.log(headers)
        const body = {articlename: articlename,articlecontent: articlecontent}
        const responce = await axios.post('/api/addarticle',body,{headers})
    }

    return(
        <div>
            <p>your will be posting as</p>
            <label>Name</label>
            <input type="text" value={articlename} onChange={e=>setArtilceName(e.target.value)} />
            <label>content</label>
            <textarea rows={10} cols={40} type="text" value={articlecontent} onChange={e=>setArticleContent(e.target.value)} />
            <button onClick={addarticle} >post article</button>
        </div>
    )
}
export default AddArticle;