
import React from 'react'
import { Card } from '../ui/card'
import DeleteButton from './delete-button'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import StatusBadge from './status-badge'

const SummaryHeader = ({
    fileUrl,
    title,
    createdAt
}: {fileUrl: string, title: string | null, createdAt: string}) => {
  return (
      <div className="flex items-start gap-2 sm:gap-4">
            <FileText className="h-6 w-6 sm:w-8 sm:h-8 text-rose-400 mt-1"/>
          <div className="flex-1 min-w-0">
              <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
                  {title}
              </h3>
              <p className="text-sm text-gray-500">2024</p>
          </div>
      </div>
  );
}

function SummaryCard({summary}: {summary: any}) {
  return (
      <Card className="relative h-full">
          <div className="absolute top-2 right-2">
              <DeleteButton />
          </div>
          <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                  <SummaryHeader
                      fileUrl={summary.original_file_url}
                      title={summary.title}
                      createdAt={summary.created_at}
                  />
                  <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
                      {summary.summary_text}
                  </p>
                  <div className="flex justify-between items-center mt-2 sm:mt-4">
                    <StatusBadge status={summary.status} />
                  </div>
              </div>
          </Link>
      </Card>
  );
}

export default SummaryCard