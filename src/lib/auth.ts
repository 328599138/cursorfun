/**
 * 简单的管理员认证工具
 */

// 管理员密码 - 实际开发中应存储加密后的密码
const ADMIN_PASSWORD = "admin123456";

/**
 * 验证管理员密码
 * @param password 输入的密码
 * @returns 是否验证通过
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * 检查会话中是否已登录
 * @param sessionToken 会话令牌
 * @returns 是否已登录
 */
export function isAuthenticated(sessionToken: string | null): boolean {
  if (!sessionToken) return false;
  
  try {
    // 简单的验证，实际应该使用JWT或其他安全方式
    const decodedData = JSON.parse(atob(sessionToken));
    return decodedData.isAdmin === true && decodedData.expiresAt > Date.now();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // 忽略解析错误
    return false;
  }
}

/**
 * 创建认证会话令牌
 * @returns 会话令牌
 */
export function createAuthToken(): string {
  // 创建一个简单的认证令牌，有效期为24小时
  const tokenData = {
    isAdmin: true,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24小时后过期
  };
  
  // 转为Base64编码字符串
  return btoa(JSON.stringify(tokenData));
} 