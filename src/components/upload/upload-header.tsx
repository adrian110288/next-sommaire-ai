import React from 'react'

export const UploadHeader = () => {
  return (
      <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Start uploading your PDF
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
              Upload your PDF and let your AI do the magic!
          </p>
      </div>
  );
}
