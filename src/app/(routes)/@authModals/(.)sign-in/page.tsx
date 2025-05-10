"use client";
import { SignInForm } from "@/components/forms/sign-in";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
