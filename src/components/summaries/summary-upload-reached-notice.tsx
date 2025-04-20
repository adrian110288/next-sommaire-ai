import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function SummaryUploadReachedNotice({ uploadLimit }: { uploadLimit: number }) {
  return (
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
          <p className="text-sm">
              You have reached your upload limit of {uploadLimit} upload on the
              Basic plan.{" "}
              <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
              >
                  Upgrade to a Pro plan{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
              </Link>{" "}
              for unlimited uploads.
          </p>
      </div>
  );
}

export default SummaryUploadReachedNotice;