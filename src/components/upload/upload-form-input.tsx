"use client"

import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const UploadFormInput = ({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {
  return (
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className='flex justify-end items-center gap-1.5'>
          <Input id="file" type="file" name="file" accept="application/pdf" required className="" />
          <Button type="submit">Upload your PDF </Button>
          </div>
      </form>
  );
}
