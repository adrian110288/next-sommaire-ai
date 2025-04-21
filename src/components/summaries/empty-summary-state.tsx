import { FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function EmptyState() {
  return (
    <div className="text-center py-12">
        <div className="flex flex-col items-center gap-6">
            <FileText className="h-16 w-16 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-600">No summaries yet</h2>
            <p className="max-w-md text-gray-500">You have not generated any summaries yet.</p>
            <Link href="/upload">
                <Button variant="link" className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline">
                    Create your first summary
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default EmptyState