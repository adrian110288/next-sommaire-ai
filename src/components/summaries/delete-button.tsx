import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton() {
    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-101 transition-all duration-300 group hover:no-underline"
        >
            <Trash2 className="h-4 w-4 text-white" />
        </Button>
    );
}