# 环境变量配置指南

## 📋 概述

本项目使用环境变量来管理敏感信息和配置。所有密钥都已通过 `.gitignore` 被排除在代码库之外，确保安全。

## 🔧 快速开始

### 本地开发

`.env.local` 文件已配置用于本地开发：

```bash
# 必需变量已配置：
NEXT_PUBLIC_SUPABASE_URL=https://clpmxrgdzhsitzjlmkhf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key
CSRF_SECRET=78b6dcde7c3bd900ed03b0519abe07723fcaccbcae325cf92da0e82941eb310e
```

需要自己配置的变量：
- `ADMIN_EMAIL` - 替换为你的管理员邮箱

### 生产部署

使用 `.env.production` 作为模板，配置以下变量：

1. **Supabase 密钥**
   - `NEXT_PUBLIC_SUPABASE_URL` - 从 Supabase 项目设置获取
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - 从 Supabase 项目设置获取
   - `SUPABASE_SERVICE_ROLE_KEY` - 从 Supabase 项目设置获取

2. **安全密钥** ⚠️ **生产环境必须更改**
   - `CSRF_SECRET` - 生成新的随机密钥

3. **管理员配置**
   - `ADMIN_EMAIL` - 管理员的邮箱地址

## 📝 变量说明

### 公开变量 (NEXT_PUBLIC_*)
这些变量会被编译到客户端代码中，是公开的：

| 变量 | 说明 | 示例 |
|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | JWT token |

### 私密变量
这些变量仅在服务端使用，不会暴露到客户端：

| 变量 | 说明 | 示例 |
|-----|------|------|
| `CSRF_SECRET` | CSRF token 签名密钥 | 64位十六进制字符串 |
| `ADMIN_EMAIL` | 管理员邮箱（可选） | `admin@example.com` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 | JWT token |

## 🔐 如何获取 Supabase 密钥

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 点击 **Settings** → **API**
4. 复制以下内容：
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 🛡️ 生成安全的 CSRF_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

复制输出的 64 位十六进制字符串到 `CSRF_SECRET`。

## 🚀 Vercel 部署

### 添加环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 **Settings** → **Environment Variables**
4. 添加以下变量：

| 变量 | 值 | 环境 |
|-----|---|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 URL | 所有 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的密钥 | 所有 |
| `SUPABASE_SERVICE_ROLE_KEY` | 你的密钥 | 所有 |
| `CSRF_SECRET` | 生成的密钥 | 所有 |
| `ADMIN_EMAIL` | 你的邮箱 | 所有 |
| `NODE_ENV` | `production` | Production |

### 重新部署

添加环境变量后，需要重新部署以使用新配置：

```bash
git push  # 或在 Vercel 中点击 "Redeploy"
```

## 📋 部署前检查清单

- [ ] 更新 `.env.production` 中的所有必需变量
- [ ] 生成并设置新的 `CSRF_SECRET`
- [ ] 验证 `ADMIN_EMAIL` 正确
- [ ] 确保所有私密密钥已在部署环境中配置
- [ ] 确认 `.env.local` 和 `.env.production` 没有被提交到 Git

## ⚠️ 安全建议

1. **定期轮换密钥**
   - 定期重新生成 `CSRF_SECRET`
   - 如果密钥泄露，立即更新

2. **不要共享密钥**
   - 永远不要在聊天、邮件或版本控制中分享密钥
   - 只通过安全的环境变量管理系统传递

3. **监控密钥使用**
   - 定期检查 Supabase 日志
   - 检查是否有异常访问

4. **备份和恢复**
   - 保存密钥的安全备份
   - 建立密钥恢复流程

## 🔗 相关资源

- [Supabase 文档](https://supabase.com/docs)
- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
- [OWASP CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
