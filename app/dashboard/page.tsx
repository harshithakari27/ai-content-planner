'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function BrainstormPage() {
  const [niche, setNiche] = useState('')
  const [loading, setLoading] = useState(false)

  const saveManualIdea = async () => {
    if (!niche.trim()) {
      alert('Type a niche first!')
      return
    }

    setLoading(true)

    try {
      // We removed the AI fetch, so we just save the niche directly
      const { error } = await supabase
        .from('ideas')
        .insert([{ 
          content: `Planned content for: ${niche}`, // Placeholder text
          niche: niche 
        }])

      if (error) throw error

      alert('Success! Your niche has been saved to the database.')
      setNiche('')
    } catch (err) {
      console.error(err)
      alert('Error saving to Supabase. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 text-white">
        Content Planner
      </h1>

      <p className="text-gray-400 mb-8">
        Enter your niche to save it to your content library.
      </p>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-2xl">
        <div className="flex flex-col gap-4">
          <input
            className="bg-black border border-gray-700 p-4 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Faceless AI TikToks..."
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />

          <button
            onClick={saveManualIdea}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save to Library'}
          </button>
        </div>
      </div>
    </div>
  )
}
