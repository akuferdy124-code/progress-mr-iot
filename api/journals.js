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
    const collection = db.collection('journals');

    if (req.method === 'GET') {
      const journals = await collection.find({}).toArray();
      return res.status(200).json(journals);
    }

    if (req.method === 'POST') {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { week, ...rest } = data;

      if (!week) {
        return res.status(400).json({ error: 'Week identifier is required' });
      }

      await collection.updateOne(
        { week },
        { $set: { ...rest, week, updatedAt: new Date() } },
        { upsert: true }
      );

      const updated = await collection.findOne({ week });
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const week = req.query?.week || (typeof req.body === 'string' ? JSON.parse(req.body).week : req.body?.week);
      if (!week) {
        return res.status(400).json({ error: 'Week is required' });
      }

      await collection.deleteOne({ week });
      return res.status(200).json({ success: true, week });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Journals error:', error);
    return res.status(500).json({ error: error.message });
  }
}
