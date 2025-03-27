"use client";

import { useEffect } from "react";
import { Button } from "@/components/admin/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 在控制台记录错误
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 space-y-4 text-center">
      <h2 className="text-2xl font-bold tracking-tight">出现了错误</h2>
      <p className="text-muted-foreground max-w-md">
        抱歉，管理后台发生了错误。您可以尝试刷新页面或返回首页。
      </p>
      <p className="text-sm text-destructive">
        错误信息: {error.message || "未知错误"}
      </p>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => reset()} variant="default">
          重试
        </Button>
        <Button onClick={() => window.location.href = "/admin"} variant="outline">
          返回首页
        </Button>
      </div>
    </div>
  );
} 