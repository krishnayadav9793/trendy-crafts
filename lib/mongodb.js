import { MongoClient } from "mongodb";



const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@krishnacluster.h27ishf.mongodb.net/?appName=krishnaCluster`

const client = new MongoClient(url)
const connectPromise = client.connect()

export default connectPromise;
