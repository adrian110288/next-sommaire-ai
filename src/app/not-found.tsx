import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <Link href="/" >
        <Button variant="link" className="text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline">
          Go Home
        </Button>
      </Link>
    </div>
  )
}

export default notFound