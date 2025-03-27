import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { ArticleLayout } from "@/components/article-layout"

export default function BasicPage() {
  return (
    <PageLayout>
      <ArticleLayout
        title="Cursor 基础资源"
        description="学习和掌握 Cursor IDE 的基础知识和使用技巧"
      >
        <section>
          <h2>入门指南</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>下载并安装 Cursor IDE</li>
            <li>配置开发环境</li>
            <li>连接 OpenAI API</li>
            <li>基本界面概览</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>核心功能</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI 代码补全 - 上下文感知的智能代码补全</li>
            <li>自然语言转代码 - 从自然语言描述生成代码</li>
            <li>代码解释 - 获取代码块的详细解释</li>
            <li>重构建议 - 获取智能代码重构建议</li>
            <li>测试生成 - 自动生成测试用例</li>
            <li>命令面板 - 使用自然语言快速执行命令</li>
            <li>Git 集成 - 智能 Git 操作支持</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>教程</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>安装和配置 Cursor</li>
            <li>连接 AI 模型 (OpenAI API)</li>
            <li>基本界面导航</li>
            <li>键盘快捷键</li>
            <li>提示工程基础</li>
          </ul>
        </section>
      </ArticleLayout>
    </PageLayout>
  )
} 