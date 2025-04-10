import mongoose from 'mongoose';

// Define interface for mongoose connection
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) {
    console.log('使用已有的MongoDB连接');
    return cached.conn;
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('正在连接MongoDB...');
    
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.conn = await cached.promise;
    console.log('MongoDB连接成功');
    return cached.conn;
  } catch (error) {
    console.error('MongoDB连接错误:', error instanceof Error ? error.message : String(error));
    cached = { conn: null, promise: null };
    global.mongoose = cached;
    throw error;
  }
}

// 添加默认导出
export default { connectDB }; 
