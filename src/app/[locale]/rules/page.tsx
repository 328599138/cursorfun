import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { ArticleLayout } from "@/components/article-layout"
import { type Locale, dictionary } from "@/lib/i18n"

interface RulesPageProps {
  params: { locale: Locale }
}

export default function RulesPage({ params: { locale } }: RulesPageProps) {
  const t = dictionary[locale]

  return (
    <PageLayout locale={locale}>
      <ArticleLayout
        title="Cursor IDE 使用规则和最佳实践"
        description="学习如何高效使用 Cursor IDE，掌握 AI 辅助编程的精髓"
      >
        <section>
          <h2>基础设置</h2>
          <ul>
            <li>安装和配置
              <ul>
                <li>从官方网站下载最新版本</li>
                <li>配置 OpenAI API Key</li>
                <li>选择合适的主题和字体</li>
              </ul>
            </li>
            <li>快捷键设置
              <ul>
                <li>常用编辑快捷键</li>
                <li>AI 功能快捷键</li>
                <li>自定义快捷键</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>AI 功能使用</h2>
          <ul>
            <li>代码补全
              <ul>
                <li>智能提示的使用</li>
                <li>多行代码补全</li>
                <li>函数补全</li>
              </ul>
            </li>
            <li>代码生成
              <ul>
                <li>自然语言转代码</li>
                <li>注释生成</li>
                <li>测试用例生成</li>
              </ul>
            </li>
            <li>代码优化
              <ul>
                <li>性能优化建议</li>
                <li>代码重构</li>
                <li>最佳实践推荐</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>提示词技巧</h2>
          <ul>
            <li>基础提示词
              <ul>
                <li>明确任务需求</li>
                <li>指定编程语言</li>
                <li>提供上下文信息</li>
              </ul>
            </li>
            <li>高级提示词
              <ul>
                <li>多步骤任务拆分</li>
                <li>约束条件设置</li>
                <li>错误处理要求</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>常见问题</h2>
          <ul>
            <li>连接问题
              <ul>
                <li>API 连接失败</li>
                <li>网络代理设置</li>
                <li>身份验证问题</li>
              </ul>
            </li>
            <li>性能问题
              <ul>
                <li>响应延迟</li>
                <li>内存占用</li>
                <li>CPU 使用率</li>
              </ul>
            </li>
          </ul>
        </section>
      </ArticleLayout>
    </PageLayout>
  )
} 