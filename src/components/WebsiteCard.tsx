"use client";

import { Website } from "@/types";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface WebsiteCardProps {
  website: Website;
  index: number;
}

export function WebsiteCard({ website, index }: WebsiteCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
      className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 transition-all duration-300 group border border-gray-100/80 dark:border-gray-700/30"
    >
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent rounded-bl-full"></div>
          <div className="flex items-center mb-4 relative">
            <div className="relative h-12 w-12 flex-shrink-0 mr-4 overflow-hidden rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              {website.icon ? (
                <Image
                  src={website.icon}
                  alt={`${website.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {website.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {website.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="truncate max-w-[180px]">{website.url.replace(/(^\w+:|^)\/\//, '')}</span>
                <ExternalLink className="h-3 w-3 ml-1 inline-block group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200">
            {website.description}
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/30 text-xs text-gray-500 dark:text-gray-400 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center">
              <span>Visit site</span>
              <ExternalLink className="h-3 w-3 ml-1 inline-block" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
} 