import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { ArticleLayout } from "@/components/article-layout"

export default function MCPPage() {
  return (
    <PageLayout>
      <ArticleLayout
        title="Cursor MCP 资源"
        description="了解 Cursor MCP (多链协议) 及其应用"
      >
        <section>
          <h2>什么是 MCP?</h2>
          <p>
            MCP (多链协议) 是 Cursor IDE 中的一个强大功能，它使 AI 代理能够协同工作以解决复杂的编程任务。它支持：
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>思维链推理</li>
            <li>多代理协作</li>
            <li>复杂问题分解</li>
            <li>迭代解决方案优化</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>主要特点</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>顺序思维 - 将复杂问题分解为可管理的步骤</li>
            <li>代理协作 - 多个 AI 代理协同工作</li>
            <li>工具集成 - 与开发工具无缝集成</li>
            <li>上下文感知 - 在多次交互中保持上下文</li>
            <li>错误处理 - 强大的错误检测和恢复</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2>最佳实践</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>清晰的问题定义</li>
            <li>逐步解决方法</li>
            <li>有效的提示工程</li>
            <li>上下文管理</li>
            <li>错误恢复策略</li>
          </ul>
        </section>
      </ArticleLayout>
    </PageLayout>
  )
} 