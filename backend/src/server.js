import express from "express";
import { db,connectToDb } from "./db.js";
import admin from "firebase-admin";
import { readFileSync } from "fs"

const credentials =  JSON.parse(
    readFileSync('./credential.json')
);

admin.initializeApp({
    credential : admin.credential.cert(credentials),
});

async function  defuser(req,res,next){
    const {authtoken} = req.headers;
    
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
                                             
        }
        catch(e){
            return res.status(401).send("unauthorized"); 
        }
    }
    req.user = req.user || {};
    const {uid} = req.user;
    console.log('uid',uid)
    next();
}


const app = express();
app.use(express.json());

app.use(defuser);

app.get('/api/articles/:articleID',defuser,async (req,res)=>{
    const {articleID}=req.params;    
    const {uid} = req.user;
    
    const article = await db.collection('articles').findOne({articlename:articleID});
    
    if(article){
        
        const likedIds = article.likedIds || [];
       
        article.canlike = uid && !likedIds.includes(uid);
        
        
        // const updatedArticle = await db.collection('articles').findOne({articlename:articleID});
        console.log('article',article)
        return res.json(article);
        
    }
    else{
        res.status(404).send('this article doesn\'t exist');
    }
    
    
});


app.put('/api/articles/:articleID/like',defuser,async (req,res)=>{
    const {articleID}=req.params;
    const {uid} = req.user;
    console.log('yid',uid)
    const article = await db.collection('articles').findOne({articlename:articleID});
    console.log('request',article)

    if(article){
        const likedIds = article.likedIds || [];        
        const canlike = uid && !likedIds.includes(uid);       
        console.log('canlike',canlike)
        if(canlike){
            console.log('like')
            await db.collection('articles').updateOne(
                {articlename: articleID},
                {
                    $inc: {likes: 1},
                    $addToSet: {likedIds : uid},
                },
                { upsert: true} //option for creating afield that doest exist and prevent duplicate
                )
        }
           
        const updatedArticle = await db.collection('articles').findOne({articlename:articleID});       
        res.json(updatedArticle);
    }
    else{
        res.status(404).send('that article doesn\'t exists');
    }
    });
        

app.put('/api/articles/:articleID/unlike',defuser,async (req,res)=>{
    const {articleID}=req.params;
    const {uid} = req.user;
    console.log('yid',uid)
    const article = await db.collection('articles').findOne({articlename:articleID});
    console.log('request',article)

    if(article){
        const likedIds = article.likedIds || [];        
        const canlike = uid && likedIds.includes(uid);       
        console.log('uncanlike',canlike)
        if(canlike){
            console.log('unike')
            await db.collection('articles').updateOne(
                {articlename: articleID},
                {
                    $inc: {likes: -1},
                    $pull: {likedIds : uid},
                },
                { upsert: true} //option for creating afield that doest exist and prevent duplicate
                )
        }
            
        const updatedArticle = await db.collection('articles').findOne({articlename:articleID}); 
        updatedArticle.canlike = true;      
        res.json(updatedArticle);
    }
    else{
        res.status(404).send('that article doesn\'t exists');
    }
    });

app.post('/api/articles/:articleID/comment',async (req,res)=>{
    const {articleID} = req.params;
    const {comment} = req.body;
    const {email} = req.user;
    console.log(`newmail${email}`)
    
    await db.collection('articles').updateOne({articlename:articleID},{
        $push: {comments: {postedby: email,comment}}
    });
    const article = await db.collection('articles').findOne({articlename:articleID});
        
    if(article){
          
        res.json(article);        
    }
    else{
        res.status(404).send('article doesn\'t exist');
    }
})

app.post('/api/addarticle',async (req,res)=>{
    const {authtoken} = req.header;
    
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
        }catch(e){
            return res.status(401).send('unauthorized')
        }
    }
    
    const body = req.body;
    body.author= req.user.email;
    const extra = {
        likes: 0,
        comments: [],  
        likedIds: []
    }
    Object.assign(body,extra)
    
    console.log(body);
    
    await db.collection('articles').insertOne(body)
})

app.get('/api/articles',async (req,res)=>{
    const data = await db.collection('articles').find({}).toArray();
    
    res.json(data);
})


connectToDb(()=>{
    app.listen(8000,()=>{
    console.log('server is listening');
    });
});
