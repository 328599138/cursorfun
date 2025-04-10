import { Types } from 'mongoose';

export interface Website {
  _id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  icon?: string;
  order?: number;
  websites?: Website[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WebsiteFormData {
  name: string;
  url: string;
  description: string;
  icon: string;
  category: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
} 
