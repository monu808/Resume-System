const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-system';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return clearOldData();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

async function clearOldData() {
  try {
    // Get database connection
    const db = mongoose.connection.db;
    
    console.log('\n🔍 Checking collections...\n');
    
    // Delete all integration data (has wrong format)
    const integrationResult = await db.collection('integrationdatas').deleteMany({});
    console.log(`✅ Deleted ${integrationResult.deletedCount} integration records`);
    
    // Delete all resumes (may have wrong format from old integrations)
    const resumeResult = await db.collection('resumes').deleteMany({});
    console.log(`✅ Deleted ${resumeResult.deletedCount} resume records`);
    
    console.log('\n✨ Database cleaned! You can now sync fresh data.\n');
    console.log('📝 Next steps:');
    console.log('   1. Restart your server (Ctrl+C and npm start)');
    console.log('   2. Go to Integrations page');
    console.log('   3. Sync GitHub with username: monu808');
    console.log('   4. Check Resume Builder - projects will be added!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
    process.exit(1);
  }
}
