import { Types } from 'mongoose';

export interface Website {
  _id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
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