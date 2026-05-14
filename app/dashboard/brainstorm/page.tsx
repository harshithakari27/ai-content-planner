'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function BrainstormPage() {
  const [niche, setNiche] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')

  const handleGenerateAndSave = async () => {
    if (!niche.trim()) return alert('Type a niche first!')

    setLoading(true)
    setAiResult('')

    try {
      // 1. Call the AI API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: niche }),
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      const generatedContent = data.text
      setAiResult(generatedContent)

      // 2. Save BOTH the niche and the AI content to Supabase
      const { error } = await supabase
        .from('ideas')
        .insert([{ 
          niche: niche,
          content: generatedContent 
        }])

      if (error) throw error

      alert('Success! AI generated ideas and saved them to your library.')
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Check your API key and Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white">AI Content Generator</h1>
      <p className="text-gray-400 mb-8">Enter your niche and let the AI build your scripts.</p>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-2xl mb-8">
        <div className="flex flex-col gap-4">
          <input
            className="bg-black border border-gray-700 p-4 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Finance for Teens, Minecraft Parkour..."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />

          <button
            onClick={handleGenerateAndSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? 'AI is Thinking...' : 'Generate & Save Ideas'}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      {aiResult && (
        <div className="bg-gray-900 p-6 rounded-xl border border-blue-900 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm tracking-widest">Latest Generation</h3>
          <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
            {aiResult}
          </div>
        </div>
      )}
    </div>
  )
}