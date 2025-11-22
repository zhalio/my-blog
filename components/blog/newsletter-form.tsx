
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mt-8">
      <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Subscribe to my newsletter</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get the latest posts and updates delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
        />
        <Button type="submit" disabled={status === "loading" || status === "success"}>
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
