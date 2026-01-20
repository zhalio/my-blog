# Vercel 构建失败解决方案

## 问题描述
构建失败，错误信息：`Error: supabaseUrl is required.`

这是因为 Vercel 上没有配置 Supabase 环境变量。

## 解决方案

### 1. 在 Vercel 中配置环境变量

访问你的 Vercel 项目设置：
- 进入项目 → Settings → Environment Variables
- 添加以下环境变量：

| 变量名 | 值 | 来源 |
|------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase URL | Supabase 项目设置 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase Anon Key | Supabase 项目设置 |
| `SUPABASE_SERVICE_ROLE_KEY` | 你的 Service Role Key | Supabase 项目设置（仅服务器端使用） |
| `ADMIN_PASSWORD` | 你自己设置的强密码 | 自定义 |

### 2. 获取 Supabase 凭证

1. 登录 [Supabase](https://supabase.com)
2. 进入你的项目
3. 点击 `Settings` → `API`
4. 复制以下值：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

### 3. 部署

在 Vercel 中配置完环境变量后，重新触发构建：
- 点击 `Deployments` 
- 选择最新的部署
- 点击 `Redeploy`

### 4. 本地开发

确保你的 `.env.local` 文件包含相同的环境变量（参考 `.env.example`）

## 改进说明

已对以下文件进行优化，使其在构建时能够更优雅地处理缺失的环境变量：

- `lib/supabase/client.ts` - 延迟初始化 Supabase 客户端
- `lib/supabase-posts.ts` - 添加 try-catch 处理
- `lib/site-settings.ts` - 添加 try-catch 和默认值返回
- `app/[locale]/posts/page.tsx` - 添加错误处理
- `app/[locale]/posts/[slug]/page.tsx` - 添加错误处理

这些改进确保了即使在没有环境变量的情况下，构建也能继续进行。

## 常见问题

### Q: 为什么本地可以构建但 Vercel 不行？
A: 本地有 `.env.local` 文件，但 Vercel 需要在项目设置中明确配置环境变量。

### Q: 我可以跳过配置吗？
A: 不建议。虽然构建现在可以成功完成，但应用在运行时仍然需要这些变量才能正常工作。

### Q: 环境变量何时生效？
A: 在 Vercel 中设置后，需要重新部署才能生效。
