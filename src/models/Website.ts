import mongoose from 'mongoose';

const WebsiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请输入网站名称'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, '请输入网站链接'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, '请输入网站描述'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, '请输入图标链接'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, '请选择分类'],
    trim: true,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Website || mongoose.model('Website', WebsiteSchema); 