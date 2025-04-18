"use client";

import React from "react";
import { UploadFormInput } from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
    file: z
        .instanceof(File, { message: "File must be a PDF" })
        .refine((file: File) => file.type === "application/pdf", {
            message: "File must be a PDF",
        })
        .refine((file: File) => file.size <= 1024 * 1024 * 20, {
            message: "File must be less than 20MB",
        }),
});

export const UploadForm = () => {

    const { startUpload, routeConfig } = useUploadThing(
        (routeRegistry) => routeRegistry.imageUploader,
        {
            onClientUploadComplete: () => {},
            onUploadError: (error) => {
                toast.error("Something went wrong", {
                    description: error.message
                });
            },
            onUploadBegin: ({ file: File }) => {},
        }
    );

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        const result = schema.safeParse({ file });

        console.log(result);

        if (!result.success) {
            toast.error("Something went wrong", {
                description:
                    result.error.flatten().fieldErrors.file?.[0] ??
                    "Unknown error",
            });

            return;
        }

        toast("Uploading your PDF...", {
            description:
                "Your PDF is being processed. This shouldn't take long."
        });

        const uploadedFile = await startUpload([file]);
        if (!uploadedFile) {
            toast.error("Something went wrong", {
                description: "Failed to upload file",
            });
            return;
        }

        toast("Generating summary...", {
            description: "Hang tight! Our AI is reading through your document."
        });
    };
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleFormSubmit} />
        </div>
    );
};
