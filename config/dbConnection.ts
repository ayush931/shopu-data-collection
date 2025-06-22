import mongoose from 'mongoose';

export async function connectToDB() {
  const { connection } = await mongoose.connect(process.env.MONGO_URI || '');
  if (connection) {
    return connection;
  } else {
    console.log('Failed to connect DB');
  }
}
