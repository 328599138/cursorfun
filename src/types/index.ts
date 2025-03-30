export interface Website {
  id?: string;
  _id?: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  categoryId: string;
  metadata?: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  websites?: Website[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebsiteFormData {
  name: string;
  url: string;
  description: string;
  icon: string;
  categoryId: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  order: number;
} 