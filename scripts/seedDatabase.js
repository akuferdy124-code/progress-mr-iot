import { MongoClient } from 'mongodb';
import { initialProjectsData, initialJournalData, initialSkillsList } from '../src/data/portfolioData.js';

const uri = process.env.MONGODB_URI || "mongodb+srv://akuferdy124_db_user:mJ8J5q28zMPouiNt@cluster0.bumnnhy.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

    const db = client.db('portfolio_db');
    const projectsCol = db.collection('projects');
    const journalsCol = db.collection('journals');
    const skillsCol = db.collection('skills');
    const settingsCol = db.collection('settings');

    // Projects count
    const pCount = await projectsCol.countDocuments();
    console.log(`Current projects count in DB: ${pCount}`);
    if (pCount === 0) {
      console.log("Seeding initial projects...");
      await projectsCol.insertMany(initialProjectsData);
      console.log(`Inserted ${initialProjectsData.length} projects.`);
    }

    // Journals count
    const jCount = await journalsCol.countDocuments();
    console.log(`Current journals count in DB: ${jCount}`);
    if (jCount === 0) {
      console.log("Seeding initial journals...");
      await journalsCol.insertMany(initialJournalData);
      console.log(`Inserted ${initialJournalData.length} journals.`);
    }

    // Skills count
    const sCount = await skillsCol.countDocuments();
    console.log(`Current skills count in DB: ${sCount}`);
    if (sCount === 0) {
      console.log("Seeding initial skills...");
      await skillsCol.insertMany(initialSkillsList);
      console.log(`Inserted ${initialSkillsList.length} skills.`);
    }

    // Admin password setting
    const adminSetting = await settingsCol.findOne({ key: 'admin_password' });
    if (!adminSetting) {
      await settingsCol.insertOne({ key: 'admin_password', value: '2411012007' });
      console.log("Initialized default admin password.");
    }

    console.log("DATABASE SETUP & SEEDING COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Connection or seeding error:", err);
  } finally {
    await client.close();
  }
}

run();
