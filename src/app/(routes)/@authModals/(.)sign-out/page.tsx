"use client";
import { signOutAction } from "@/app/actions/auth";
import { ErrorAlert } from "@/components/error-alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const SignOutDialog = () => {
  const router = useRouter();
  const onDialogClose = () => router.back();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const handleClick = () => {
    startTransition(async () => {
      const res = await signOutAction();
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  };
  return (
    <AlertDialog defaultOpen onOpenChange={onDialogClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will need to enter your
            password to log back in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <ErrorAlert error={error} />}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} disabled={isPending}>
            {isPending ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutDialog;
