'use client'

import { useState, useEffect } from 'react'
import { useSupabaseAuthStore } from '@/lib/supabase-auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Save, Loader2 } from 'lucide-react'

// --- Types ---
interface SiteSettings {
  site_title: string
  site_description: string
  site_keywords: string[]
  favicon_url: string
  footer_text: string
  social_links: { platform: string; url: string; icon: string }[]
}

export default function SettingsPage() {
  const { accessToken: token } = useSupabaseAuthStore()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: '',
    site_description: '',
    site_keywords: [],
    favicon_url: '',
    footer_text: '',
    social_links: []
  })
  const [keywordInput, setKeywordInput] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const settingsRes = await fetch('/api/admin/settings')
      const settingsData = await settingsRes.json()
      if (settingsData.settings) {
        setSettings(settingsData.settings)
      }
    } catch (error) {
      console.error('Failed to load settings', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!token) return
    setSaving(true)
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      })
      alert('保存成功')
    } catch (error) {
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !settings.site_keywords.includes(keywordInput.trim())) {
      setSettings(prev => ({
        ...prev,
        site_keywords: [...(prev.site_keywords || []), keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const removeKeyword = (kw: string) => {
    setSettings(prev => ({
      ...prev,
      site_keywords: prev.site_keywords.filter(k => k !== kw)
    }))
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">系统设置中心</h1>
        <Button onClick={handleSaveSettings} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
          保存全站配置
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general">常规设置</TabsTrigger>
          <TabsTrigger value="seo">SEO 配置</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">基本信息</h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="site_title">网站标题</Label>
                <Input 
                  id="site_title" 
                  value={settings.site_title} 
                  onChange={e => setSettings({...settings, site_title: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site_desc">网站描述</Label>
                <Input 
                  id="site_desc" 
                  value={settings.site_description || ''} 
                  onChange={e => setSettings({...settings, site_description: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="footer_text">底部版权文字</Label>
                <Input 
                  id="footer_text" 
                  value={settings.footer_text || ''} 
                  onChange={e => setSettings({...settings, footer_text: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input 
                  id="favicon" 
                  value={settings.favicon_url || ''} 
                  onChange={e => setSettings({...settings, favicon_url: e.target.value})} 
                  placeholder="https://..."
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-6 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">SEO 默认配置</h2>
             <div className="grid gap-2">
                <Label>全局关键词 (Keywords)</Label>
                <div className="flex flex-wrap gap-2 mb-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded-md border min-h-[40px]">
                  {settings.site_keywords?.map(kw => (
                    <span key={kw} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs flex items-center gap-1">
                      {kw}
                      <button onClick={() => removeKeyword(kw)} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={keywordInput}
                    onChange={e => setKeywordInput(e.target.value)}
                    placeholder="输入关键词后按回车或点击添加"
                    onKeyDown={e => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button type="button" onClick={handleAddKeyword} variant="outline">添加</Button>
                </div>
              </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
