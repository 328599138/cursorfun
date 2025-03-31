import React from 'react';
import { FiPackage, FiBook, FiLayout, FiCode, FiList, FiLink } from 'react-icons/fi';

interface IconProps {
  name: string;
  className?: string;
}

const iconMap = {
  'Cursor Basics': FiCode,
  'Programming': FiBook,
  'Cursor Rules': FiList,
  'Cursor MCP': FiLink,
};

const isEmoji = (str: string) => {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  return emojiRegex.test(str);
};

export function Icon({ name, className = '' }: IconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (isEmoji(name)) {
    return <span className={className}>{name}</span>;
  }
  
  if (!IconComponent) {
    return <span className={className}>{name.charAt(0).toUpperCase()}</span>;
  }
  
  return <IconComponent className={className} />;
} 