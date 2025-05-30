import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
export const ourFileRouter = {
    imageUploader: f({

        pdf: {
            maxFileSize: "32MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            const user = await currentUser();

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.id };
        })
        .onUploadError((error) => {
            console.log(error);
        })
        .onUploadComplete(async ({ metadata, file }) => {

            return { userId: metadata.userId, file: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
