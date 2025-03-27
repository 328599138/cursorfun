"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input } from "@/components/admin/ui";
import { LogoIcon } from "@/components/icons";

// 管理员密码 - 实际项目中应该从环境变量获取并在服务端验证
const ADMIN_PASSWORD = "cursorfun2024";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 检查是否已登录
  useEffect(() => {
    try {
      const isAuthenticated = localStorage.getItem("admin_authenticated");
      const expiryTime = localStorage.getItem("admin_auth_expiry");
      
      if (isAuthenticated === "true" && expiryTime) {
        const now = new Date().getTime();
        if (now <= parseInt(expiryTime)) {
          router.replace("/admin");
        } else {
          // 清除过期的认证信息
          localStorage.removeItem("admin_authenticated");
          localStorage.removeItem("admin_auth_expiry");
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 简单的密码验证
      if (password === ADMIN_PASSWORD) {
        // 设置会话过期时间为 24 小时
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("admin_authenticated", "true");
        localStorage.setItem("admin_auth_expiry", expiryTime.toString());
        router.replace("/admin");
      } else {
        setError("密码不正确，请重试");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("登录过程中发生错误，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-2 text-center mb-6">
          <LogoIcon className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">管理员登录</h1>
          <p className="text-sm text-muted-foreground">
            请输入密码访问管理后台
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="管理员密码"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              error={error}
              required
              autoFocus
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary underline underline-offset-4">
            返回首页
          </a>
        </p>
      </div>
    </div>
  );
} 