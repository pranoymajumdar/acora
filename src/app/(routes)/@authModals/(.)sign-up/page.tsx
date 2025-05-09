"use client";
import { SignUpForm } from "@/components/forms/sign-up";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpModal = () => {
  const router = useRouter();
  const onDialogClose = () => router.back();
  return (
    <Dialog defaultOpen onOpenChange={onDialogClose}>
      <DialogContent className="mx-auto w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign Up</DialogTitle>
          <DialogDescription>
            We just need a few details to get you started.
          </DialogDescription>
        </DialogHeader>
        <SignUpForm afterSignUp="refresh" />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
