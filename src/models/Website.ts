import mongoose, { Schema, models } from 'mongoose';
import { Website } from '@/types';

const websiteSchema = new Schema<Website>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    categoryId: { 
      type: String, 
      required: true,
      ref: 'Category'
    },
    metadata: { 
      type: Map,
      of: String,
      default: new Map()
    }
  },
  { timestamps: true }
);

// 创建索引以加快查询速度
websiteSchema.index({ categoryId: 1 });
// unique: true 已经在字段定义中创建了索引，因此这里不需要重复定义
// websiteSchema.index({ url: 1 }, { unique: true });

export default models.Website || mongoose.model<Website>('Website', websiteSchema); 