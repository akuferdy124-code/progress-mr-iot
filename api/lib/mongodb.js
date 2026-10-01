import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://akuferdy124_db_user:mJ8J5q28zMPouiNt@cluster0.bumnnhy.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  const db = client.db('portfolio_db');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
