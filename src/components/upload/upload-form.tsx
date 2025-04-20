"use client";

import React from "react";
import { UploadFormInput } from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
    generatePdfSummary,
    savePdfSummary,
} from "@/app/actions/upload-actions";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const formRef = React.useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const { startUpload, routeConfig } = useUploadThing(
        (routeRegistry) => routeRegistry.imageUploader,
        {
            onClientUploadComplete: () => {},
            onUploadError: (error) => {
                toast.error("Something went wrong", {
                    description: error.message,
                });
            },
            onUploadBegin: ({ file: File }) => {},
        }
    );

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
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
                setIsLoading(false);
                return;
            }

            toast("Uploading your PDF...", {
                description:
                    "Your PDF is being processed. This shouldn't take long.",
            });

            const uploadedFile = await startUpload([file]);
            if (!uploadedFile) {
                toast.error("Something went wrong", {
                    description: "Failed to upload file",
                });
                return;
            }

            toast("Generating summary...", {
                description:
                    "Hang tight! Our AI is reading through your document.",
            });

            const summary = await generatePdfSummary(uploadedFile);
            const { data = null, message = null } = summary || {};

            if (data) {
                let storeResult: any;
                toast.success("Summary generated successfully", {
                    description: "We are saving your summary!",
                });
                formRef.current?.reset();

                if (data.summary) {
                    storeResult = await savePdfSummary({
                        fileUrl: uploadedFile[0].serverData.file,
                        summaryText: data.summary,
                        title: data.title,
                        fileName: file.name,
                    });

                    toast.success("Summary Generated and Saved!", {
                        description: "Your PDF summary is ready to view.",
                        icon: "🌟",
                    });

                    formRef.current?.reset();
                    router.push(`/summaries/${storeResult.data.id}`);
                }
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            formRef.current?.reset();
        } finally {
            setIsLoading(false);
        }

    };
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput
                ref={formRef}
                isLoading={isLoading}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};
