"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummary } from "@/app/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
    summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteSummary({ summaryId });

            if (!result.success) {
                toast.error("Error", {
                    description: "Failed to delete summary",
                });
            }

            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete summary</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this summary? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex gap-2">
                        <Button
                            variant={"ghost"}
                            className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-50"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"destructive"}
                            className="bg-rose-500 hover:bg-rose-600"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
