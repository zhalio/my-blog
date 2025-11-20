import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="space-y-4">
        <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">关于我</h1>
        <p className="text-xl text-muted-foreground">
          你好！我是 emmm，一名热爱技术的前端开发者。
        </p>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 space-y-6 text-lg leading-relaxed">
          <p>
            我热衷于探索 Web 开发的无限可能，特别是 React 生态系统和现代前端工具链。
            这个博客是我用来记录学习笔记、分享技术心得以及展示个人项目的地方。
          </p>
          <p>
            除了编程，我还喜欢摄影和阅读。我相信技术应该服务于生活，让世界变得更美好。
          </p>
          <h2 className="text-2xl font-bold tracking-tight mt-8">联系方式</h2>
          <p>
            如果你对我的文章感兴趣，或者有任何问题，欢迎通过以下方式联系我：
          </p>
          <div className="flex gap-4">
             <Button variant="outline" asChild>
              <Link href="https://github.com/zhemmmzh" target="_blank">
                <Github className="mr-2 size-4" /> GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}