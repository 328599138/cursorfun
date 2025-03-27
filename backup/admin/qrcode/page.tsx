"use client";

import React, { useState, useRef } from "react";
import { useDB } from "@/lib/db";
import { Button, Input, Card } from "@/components/admin/ui";
import Image from "next/image";

export default function QRCodePage() {
  const { qrCodes, updateQRCode } = useDB();
  const [qrCode, setQRCode] = useState(qrCodes[0] || { id: "", name: "", imageUrl: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 验证表单
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!qrCode.name.trim()) errors.name = "名称不能为空";
    if (!qrCode.imageUrl && !previewUrl) errors.imageUrl = "请上传二维码图片";
    return errors;
  };

  // 处理图片上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors({ imageUrl: "图片大小不能超过2MB" });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors({ imageUrl: "请上传图片文件" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setErrors({});
    };
    reader.readAsDataURL(file);
  };

  // 选择文件
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // 保存二维码
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsUploading(true);
    
    // 在实际项目中，这里应该先上传图片到服务器，然后保存 URL
    // 这里我们简化处理，直接使用 Data URL
    setTimeout(() => {
      updateQRCode(qrCode.id, {
        name: qrCode.name,
        imageUrl: previewUrl || qrCode.imageUrl,
      });
      
      setIsUploading(false);
      setPreviewUrl(null);
      
      alert("二维码更新成功！");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">群二维码管理</h1>
        <p className="text-muted-foreground">
          更新网站展示的群二维码
        </p>
      </div>

      <Card title="更新二维码">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="名称"
            placeholder="输入二维码名称"
            value={qrCode.name}
            onChange={(e) => setQRCode({ ...qrCode, name: e.target.value })}
            error={errors.name}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">二维码图片</label>
            <div className="flex items-start space-x-4">
              <div className="relative h-40 w-40 overflow-hidden rounded border bg-gray-100 dark:bg-gray-800">
                {(previewUrl || qrCode.imageUrl) ? (
                  <Image
                    src={previewUrl || qrCode.imageUrl}
                    alt={qrCode.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    无图片
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={handleChooseFile}
                  variant="outline"
                >
                  选择图片
                </Button>
                <p className="text-xs text-muted-foreground">
                  支持JPG、PNG格式，最大2MB
                </p>
                {errors.imageUrl && (
                  <p className="text-sm text-destructive">{errors.imageUrl}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </Card>

      <Card title="当前显示的二维码">
        <div className="flex items-center space-x-4">
          <div className="relative h-40 w-40 overflow-hidden rounded">
            {qrCode.imageUrl ? (
              <Image
                src={qrCode.imageUrl}
                alt={qrCode.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                无图片
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{qrCode.name}</h3>
            <p className="text-sm text-muted-foreground">
              此二维码将显示在网站底部的聊天组件中
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 