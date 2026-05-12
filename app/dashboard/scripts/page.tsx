'use client'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

type Idea = {
  id: string
  niche: string | null
  content: string | null
}

export default function ScriptsPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    const getIdeas = async () => {
      const { data } = await supabase.from('ideas').select('*')
      if (data) setIdeas(data)
    }
    getIdeas()
  }, [])

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Saved Ideas</h1>
      <div className="space-y-4">
        {ideas.map((id) => (
          <div key={id.id} className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <h3 className="text-blue-400 font-bold">{id.niche}</h3>
            <p className="text-gray-300">{id.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
