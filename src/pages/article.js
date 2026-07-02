import { Link, useParams } from "react-router-dom";
import articledata from "./articledata";
import Notfoundpage from "./notfoundpage";
import { useEffect,useState } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import useUser from "../hooks/useUser";

const Article = () => {
    const {articleID}=useParams();
    // const article =  articledata.find(article=>article.id===articleID);
    const {user,isLoading}=useUser();
    const [newarticledata,setNewArticleData] = useState([])
    const [articleInfo,setArticleInfo] = useState({likes: 0,comments: [],canUpvote: false});
    const {canlike} = articleInfo;
    useEffect(()=>{
        const loadarticledata = async () =>{
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token } :{};
            
            console.log('token',token)
            try {
                const response = await axios.get(`/api/articles/${articleID}`,{headers});
                setNewArticleData(response.data);
                setArticleInfo(response.data);
              } catch (error) {
                if (axios.isCancel(error)) {
                  console.log('Request was canceled:', error.message);
                } else if (error.code === 'ECONNABORTED') {
                  console.error('Request timeout:', error.message);
                  // Display a user-friendly error message
                } else {
                  console.error('Request error:', error.message);
                  // Handle other errors
                }
              }
            
            
                        
        }
        if(!isLoading || !user){
            loadarticledata();
        }
                               
    },[user,isLoading]);   
    
    const addLike = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token } :{};
        console.log('liketoken',token)
        const responce = await axios.put(`/api/articles/${articleID}/like`,null,{headers});
        
        setArticleInfo(responce.data);
        console.log('newarticledata',articleInfo)
    }
    const unlike = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token } :{};
        
        const responce = await axios.put(`/api/articles/${articleID}/unlike`,null,{headers});
        
        setArticleInfo(responce.data);
        console.log('newarticledata',articleInfo)
    }
    
    
    return (
        <>
        {user?<>{canlike ?
        <button onClick={addLike}>like</button>
        :<button onClick={unlike}>unlike</button>}</>
        :<Link to={'/login'}><button>Login to like</button></Link>}
        <p>this article has {articleInfo.likes} likes </p>
        
            <><h1>{newarticledata.articlename}</h1>
            <p>{newarticledata.articlecontent}</p></>
        
            
        {user?
        <AddComment articleID={articleID} onArticleChange={onArticleChange=>setArticleInfo(onArticleChange)} />
        :<Link to={'/login'}><button>Login to comment</button></Link>}
        {articleInfo.comments && articleInfo.comments.length > 0 ? (
        <CommentsList comments={articleInfo.comments} />
        ) : (
        <p>No comments available.</p>
        )}
        
        </>
    
    );
}



export default Article;