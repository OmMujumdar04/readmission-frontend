"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Loader2, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
  usedTool?: boolean
  sources?: string[]
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your clinical assistant. Ask me about clinical terms, how this model works, or paste patient data and ask about their readmission risk.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const question = input.trim()
    if (!question || loading) return

    setMessages((prev) => [...prev, { role: "user", content: question }])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL
      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.")
      }
      const res = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      const data = (await res.json()) as {
        answer: string
        used_tool: boolean
        sources: string[]
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, usedTool: data.used_tool, sources: data.sources },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full p-0 shadow-lg"
        aria-label={isOpen ? "Close chat" : "Open clinical assistant chat"}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-border bg-card/70 px-4 py-3.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-4.5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Clinical Assistant</h2>
              <p className="text-xs text-muted-foreground">Grounded in model docs & clinical references</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.role === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                </span>
                <div className={`flex max-w-[80%] flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-xl px-3 py-2 text-sm leading-relaxed text-pretty ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.usedTool && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Used live risk prediction
                    </span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                Thinking…
              </div>
            )}
            {error && (
              <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a clinical or model question…"
              disabled={loading}
              className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} className="size-10 shrink-0 rounded-lg">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}