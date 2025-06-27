'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PeerPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to community page
    router.replace('/community')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔄</div>
        <p className="text-gray-600">Redirecting to Community...</p>
      </div>
    </div>
  )
} 