import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <section className="flex items-center justify-center min-h-screen lg:min-h-[40vh]">
            <SignUp />
        </section>
    );
}
