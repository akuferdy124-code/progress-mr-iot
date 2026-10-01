import { connectToDatabase } from './lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('settings');

    if (req.method === 'POST') {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { action, password, newPassword } = data;

      const record = await collection.findOne({ key: 'admin_password' });
      const currentPassword = record?.value || '2411012007';

      if (action === 'verify') {
        const isValid = password === currentPassword;
        return res.status(200).json({ valid: isValid });
      }

      if (action === 'change') {
        if (password !== currentPassword) {
          return res.status(401).json({ error: 'Password saat ini salah' });
        }
        if (!newPassword || newPassword.length < 4) {
          return res.status(400).json({ error: 'Password baru minimal 4 karakter' });
        }
        await collection.updateOne(
          { key: 'admin_password' },
          { $set: { value: newPassword, updatedAt: new Date() } },
          { upsert: true }
        );
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Invalid action' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Auth error:', error);
    return res.status(500).json({ error: error.message });
  }
}
