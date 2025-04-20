"use client"

import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export const UploadFormInput = React.forwardRef<HTMLFormElement, UploadFormInputProps>(
    ({ onSubmit, isLoading }, ref) => {
        return (
            <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
                <div className="flex justify-end items-center gap-1.5">
                    <Input
                        id="file"
                        type="file"
                        name="file"
                        accept="application/pdf"
                        required
                        className={cn(
                            "",
                            isLoading && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Upload your PDF"}
                    </Button>
                </div>
            </form>
        );
    }
);
