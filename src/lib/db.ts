import mongoose from 'mongoose';

// 定义类型接口
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 为全局变量声明类型
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cursorfun';

const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('尝试连接MongoDB...', MONGODB_URI.split('@').pop()); // 安全地打印URI（不包含凭据）
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB连接成功');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB连接失败:', err.message);
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('MongoDB连接出错:', error instanceof Error ? error.message : String(error));
    // 重置连接缓存，以便下次尝试重新连接
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export default connectDB; 