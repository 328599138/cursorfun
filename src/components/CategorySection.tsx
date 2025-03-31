"use client";

import { motion } from "framer-motion";
import { WebsiteCard } from "./WebsiteCard";
import { Category, Website } from "@/types";
import { Types } from 'mongoose';

interface CategorySectionProps {
  category: Category & {
    websites?: Website[];
    _id?: Types.ObjectId;
    id?: string;
  };
}

const isEmoji = (str: string | undefined): boolean => {
  if (!str) return false;
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  return emojiRegex.test(str);
};

export function CategorySection({ category }: CategorySectionProps) {
  if (!category.websites || category.websites.length === 0) {
    return null;
  }

  return (
    <motion.section
      key={category._id?.toString() || category.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 relative"
      id={category.slug}
    >
      <div className="absolute left-0 right-0 h-1 top-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-50"></div>
      <div className="mb-6 relative">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
        >
          {category.icon ? (
            isEmoji(category.icon) ? (
              <span className="text-2xl mr-3">{category.icon}</span>
            ) : (
              <img src={category.icon} alt={category.name} className="h-7 w-7 mr-3 object-contain" />
            )
          ) : (
            <div className="h-7 w-7 mr-3 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-md flex items-center justify-center text-white text-sm font-bold">
              {category.name.charAt(0)}
            </div>
          )}
          {category.name}
        </motion.h2>
        {category.description && (
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 mt-2 ml-10"
          >
            {category.description}
          </motion.p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.websites.map((website, index) => (
          <WebsiteCard key={website._id?.toString() || website.id} website={website} index={index} />
        ))}
      </div>
    </motion.section>
  );
} 