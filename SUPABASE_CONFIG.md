# Supabase 生产环境配置指南

## 🚨 关键问题：Site URL 配置错误

从图片中可以看到 Supabase 的 URL Configuration 配置有问题：
- **Site URL**: `http://localhost:3000` ❌ （本地开发，应改为生产域名）
- **Redirect URLs**: `https://emmmmx.xyz` ✅ （正确）

## ✅ 必须修改的配置

### 1. 更新 Site URL

**当前（错误）**: `http://localhost:3000`
**应改为（生产）**: `https://emmmmx.xyz`

**操作步骤**:
1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 点击 **Settings** → **Authentication** → **URL Configuration**
4. 找到 **Site URL** 字段
5. 改为 `https://emmmmx.xyz`
6. 点击 **Save changes**

### 2. 添加完整的 Redirect URLs

除了已有的 `https://emmmmx.xyz` 外，还需要添加：

```
https://emmmmx.xyz
https://emmmmx.xyz/admin
https://emmmmx.xyz/admin/posts
```

**操作步骤**:
1. 在同一页面中找到 **Redirect URLs** 部分
2. 点击 **Add URL**
3. 输入上面列出的每个 URL

### 3. 验证环境变量

确保 Vercel 中已设置：
```
NODE_ENV=production
```

这样 CSRF Cookie 会使用 `secure: true` 和 `sameSite: 'none'`

## 🔐 CSRF 验证流程（修复后）

```
1. 前端加载登录页面
   ↓
2. 调用 GET /api/auth/csrf
   ↓
3. 后端生成 token 并设置到 Cookie: x-csrf-token
   ↓
4. 前端获取到 token，显示在响应中
   ↓
5. 用户输入邮箱密码，点击登录
   ↓
6. 前端发送 POST /api/auth/login + body { csrfToken, email, password }
   ↓
7. 后端验证：cookie 中的 token === body 中的 token
   ↓
8. 验证成功 → 返回 auth-token Cookie → 登录成功
   验证失败 → 返回 403
```

## 🧪 测试步骤

修改完 Supabase 后：

1. **重新部署应用**
   - 如果用 Vercel：关闭当前部署，git push 触发新部署
   - 或在 Vercel Dashboard 中手动点击 "Redeploy"

2. **清除浏览器状态**
   - 打开 DevTools → Application → Clear All
   - 或使用无痕窗口

3. **测试登录**
   - 访问 `https://emmmmx.xyz/admin`
   - 输入邮箱和密码
   - 打开 DevTools → Console 检查日志

4. **检查 Cookie 是否正确设置**
   - DevTools → Application → Cookies
   - 查看是否有 `x-csrf-token` 和 `auth-token`

## 📋 检查清单

在重新部署前，确保：

- [ ] Supabase Site URL 已改为 `https://emmmmx.xyz`
- [ ] Supabase Redirect URLs 已添加完整路由
- [ ] Vercel 中 `NODE_ENV=production`
- [ ] 新代码已 push 到 GitHub
- [ ] Vercel 已重新部署最新代码

## ❌ 常见错误

| 错误 | 原因 | 解决 |
|-----|------|------|
| CSRF token invalid | Cookie 中没有 token | 检查是否设置了 x-csrf-token Cookie |
| 403 Forbidden | CSRF 验证失败 | 确认生成和验证时 token 值相同 |
| 无法登录 | Site URL 不匹配 | 更新 Supabase Site URL 为生产域名 |
| Cookie 无法跨站 | sameSite=none 但 secure=false | 确保使用 HTTPS 且 NODE_ENV=production |

## 🔗 相关文档

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [CSRF Protection Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
