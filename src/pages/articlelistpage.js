import axios from "axios";
// import articledata from "./articledata";
// import ArticleList from "./articlelist";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Articlelistpage= () => {
    const [articledata,setArticleData] =useState('');
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/articles');
              setArticleData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
              // Handle the error, e.g., set an error state
            }
          };
      
          fetchData();
    },[])
    // const r=article.articlecontent
    // console.log(typeof r); 
    if (articledata.length > 0) {
        return (
          <>
            <h1>Articles</h1>
            {articledata.map((article) => (
              <div key={article._id}>
                <Link to={`/articles/${article.articlename}`}>
                  <h2>{article.articlename}</h2>
                  <p>{article.articlecontent >20 ?article.articlecontent.substring(0,20) : article.articlecontent}</p>
                  <p>author:{article.author}</p>
                </Link>
              </div>
            ))}
          </>
        );
      } else {
        return <div>Loading...</div>;
      }
    };


export default Articlelistpage;

