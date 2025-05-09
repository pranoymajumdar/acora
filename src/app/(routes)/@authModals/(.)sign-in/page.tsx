"use client";
import { SignInForm } from "@/components/forms/sign-in/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInModal = () => {
  const router = useRouter();
  const onDialogClose = () => router.back();
  return (
    <Dialog defaultOpen onOpenChange={onDialogClose}>
      <DialogContent className="mx-auto w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
          <DialogDescription>
            Enter your email and password to login to your account.
          </DialogDescription>
        </DialogHeader>
        <SignInForm afterSignIn="refresh" />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
