"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useDB } from "@/lib/db";
import { Button, Card } from "@/components/admin/ui";

export default function QRCodePage() {
  const { qrCodes, updateQRCode } = useDB();
  const qrCode = qrCodes[0] || { id: "1", name: "微信群", imageUrl: "/qrcode.jpg" };
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件变更
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      alert("请上传图片文件");
      return;
    }

    // 创建预览
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 处理上传
  const handleUpload = async () => {
    if (!previewUrl) return;

    setIsUploading(true);

    try {
      // 在实际项目中，这里应该将文件上传到服务器
      // 为了简化演示，我们只更新URL
      // 注意：在真实项目中，您需要替换这段代码，实现文件上传功能
      
      // 模拟上传延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // 更新二维码URL
      // 在实际项目中，这里应该使用从服务器返回的URL
      updateQRCode(qrCode.id, {
        imageUrl: previewUrl, // 这应该是从服务器返回的URL
      });
      
      // 清空预览和文件选择器
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
    } catch (error) {
      console.error("上传失败", error);
      alert("上传失败，请重试");
    } finally {
      setIsUploading(false);
    }
  };

  // 处理取消
  const handleCancel = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">群二维码管理</h1>
        <p className="text-muted-foreground">
          管理您的微信群二维码，更新后将显示在导航站点上
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 当前二维码 */}
        <Card title="当前二维码">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-64 w-64 overflow-hidden rounded-lg border">
              <Image
                src={qrCode.imageUrl}
                alt="微信群二维码"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              上次更新时间: {new Date().toLocaleDateString()}
            </p>
          </div>
        </Card>

        {/* 上传新二维码 */}
        <Card title="上传新二维码">
          <div className="flex flex-col space-y-4">
            <div className="grid gap-1.5">
              <label
                htmlFor="qrcode-upload"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                选择图片
              </label>
              <input
                ref={fileInputRef}
                id="qrcode-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {previewUrl && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-64 w-64 overflow-hidden rounded-lg border">
                  <Image
                    src={previewUrl}
                    alt="预览"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUploading}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "上传中..." : "确认上传"}
                  </Button>
                </div>
              </div>
            )}

            {!previewUrl && (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  点击选择或拖放文件到此处
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  支持 PNG, JPG, GIF 格式
                </p>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <h3 className="font-medium">上传说明：</h3>
              <ul className="list-inside list-disc">
                <li>建议上传正方形图片，尺寸至少为 300x300 像素</li>
                <li>确保二维码清晰可见，便于用户扫描</li>
                <li>上传新二维码后，会自动替换旧二维码</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 