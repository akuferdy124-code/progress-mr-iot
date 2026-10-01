import { connectToDatabase } from './lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('skills');

    if (req.method === 'GET') {
      const skills = await collection.find({}).toArray();
      return res.status(200).json(skills);
    }

    if (req.method === 'POST') {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, icon } = data;

      if (!name || !icon) {
        return res.status(400).json({ error: 'Name and Icon are required' });
      }

      await collection.updateOne(
        { name },
        { $set: { name, icon, updatedAt: new Date() } },
        { upsert: true }
      );

      const updated = await collection.findOne({ name });
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const name = req.query?.name || (typeof req.body === 'string' ? JSON.parse(req.body).name : req.body?.name);
      if (!name) {
        return res.status(400).json({ error: 'Skill name is required' });
      }

      await collection.deleteOne({ name });
      return res.status(200).json({ success: true, name });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Skills error:', error);
    return res.status(500).json({ error: error.message });
  }
}
