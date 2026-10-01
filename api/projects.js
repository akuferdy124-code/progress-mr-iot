import { connectToDatabase } from './lib/mongodb.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('projects');

    if (req.method === 'GET') {
      const projects = await collection.find({}).sort({ num: 1 }).toArray();
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, ...rest } = data;

      if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
      }

      await collection.updateOne(
        { id },
        { $set: { ...rest, id, updatedAt: new Date() } },
        { upsert: true }
      );

      const updated = await collection.findOne({ id });
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id || (typeof req.body === 'string' ? JSON.parse(req.body).id : req.body?.id);
      if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
      }

      await collection.deleteOne({ id });
      return res.status(200).json({ success: true, id });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Projects error:', error);
    return res.status(500).json({ error: error.message });
  }
}
