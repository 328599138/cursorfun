import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CursorFun",
  description: "Learn more about CursorFun, the Cursor navigation hub",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-transparent bg-clip-text mb-6">
        About CursorFun
      </h1>
      
      <div className="prose dark:prose-invert lg:prose-lg">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          CursorFun is a curated navigation hub for Cursor, the AI-first code editor. 
          Our mission is to help developers discover the best resources, tools, and websites
          related to Cursor and its ecosystem.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What is Cursor?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Cursor is a powerful code editor built for the AI era. With native AI capabilities,
          Cursor helps developers write, understand, and debug code faster than ever before.
          It's built on top of VS Code, offering a familiar experience with AI superpowers.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Categories
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We organize resources into several categories:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mt-3 space-y-2">
          <li><strong>Rules</strong> - Guidelines and best practices for using Cursor effectively</li>
          <li><strong>MCP</strong> - Multi-modal Control Protocol resources and documentation</li>
          <li><strong>Website Building</strong> - Tools and resources for web development with Cursor</li>
          <li><strong>App Development</strong> - Resources for building applications with Cursor</li>
          <li><strong>AI Tools</strong> - Complementary AI tools that work well with Cursor</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Contact
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          If you have any suggestions for websites to add or if you want to get in touch, please feel free to 
          reach out to the site maintainer at:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mt-3 space-y-2">
          <li>WeChat: fengakon</li>
          <li>Email: 328599138@qq.com</li>
          <li>GitHub: <a href="https://github.com/328599138" className="text-indigo-600 dark:text-indigo-400 hover:underline">328599138</a></li>
        </ul>
      </div>
    </div>
  );
}