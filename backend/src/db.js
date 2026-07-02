import { MongoClient } from "mongodb";

let db;
async function connectToDb(cb){
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log('db connection establised')
    db = client.db('blogdb');
    cb();
}

export {db,connectToDb};