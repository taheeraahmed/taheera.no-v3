import { useRef, useState } from 'react'

const MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC'

export function useWebLLM() {
  const engineRef = useRef(null)
  const conversationRef = useRef([])
  const [isReady, setIsReady] = useState(false)

  const initEngine = async (onProgress) => {
    if (engineRef.current) return

    const { CreateMLCEngine } = await import('@mlc-ai/web-llm')

    engineRef.current = await CreateMLCEngine(MODEL_ID, {
      initProgressCallback: (report) => {
        onProgress?.(report.text)
      },
    })

    setIsReady(true)
  }

  const chat = async (message, onChunk) => {
    if (!engineRef.current) throw new Error('Engine not initialized')

    conversationRef.current = [...conversationRef.current, { role: 'user', content: message }]

    const stream = await engineRef.current.chat.completions.create({
      messages: conversationRef.current,
      stream: true,
    })

    let fullText = ''
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? ''
      if (delta) {
        fullText += delta
        onChunk?.(fullText)
      }
    }

    conversationRef.current = [...conversationRef.current, { role: 'assistant', content: fullText }]

    return fullText
  }

  return { initEngine, chat, isReady }
}
