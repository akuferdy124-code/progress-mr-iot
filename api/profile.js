import { connectToDatabase } from './lib/mongodb.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4.5mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { db } = await connectToDatabase();
    const col = db.collection('settings');

    if (req.method === 'GET') {
      const [photoDoc, bio1Doc, bio2Doc, galleryDoc] = await Promise.all([
        col.findOne({ key: 'profile_photo' }),
        col.findOne({ key: 'bio1' }),
        col.findOne({ key: 'bio2' }),
        col.findOne({ key: 'gallery_photos' }),
      ]);
      return res.status(200).json({
        photo: photoDoc?.value || null,
        bio1: bio1Doc?.value || null,
        bio2: bio2Doc?.value || null,
        galleryPhotos: galleryDoc?.value || [],
      });
    }

    if (req.method === 'POST') {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { field, value } = data;

      const validFields = ['profile_photo', 'bio1', 'bio2', 'gallery_photos'];
      if (!validFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
      }

      await col.updateOne(
        { key: field },
        { $set: { key: field, value, updatedAt: new Date() } },
        { upsert: true }
      );
      return res.status(200).json({ success: true, field });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Profile error:', error);
    return res.status(500).json({ error: error.message });
  }
}
