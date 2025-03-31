import mongoose, { Schema, models } from 'mongoose';
import { Category } from '@/types';

const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

// 创建索引以加快查询速度
// unique: true 已经在字段定义中创建了索引，因此这里不需要重复定义
// categorySchema.index({ slug: 1 });
categorySchema.index({ order: 1 });

export default models.Category || mongoose.model<Category>('Category', categorySchema); 