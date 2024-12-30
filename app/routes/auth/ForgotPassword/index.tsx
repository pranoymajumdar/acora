import { LucideArrowLeft } from 'lucide-react';
import { useTransition } from 'react';
import { Link } from 'react-router';
import EmailInput from '~/components/auth/EmailInput';
import { Button, buttonVariants, ButtonWithLoader } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();
  function returnXAfter5Seconds() {
    return startTransition(() => (
      new Promise(resolve => (
        setTimeout(() => (resolve()), 1000)
      ))
    ))
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-center lg:text-start">
        <div className="text-3xl font-bold">Forgot your password?</div>
        <div className="text-muted-foreground">Enter your email to get a reset link.</div>
      </div>
      <form className="flex flex-col gap-5">
        <div className="grid gap-2">
          <EmailInput id="email" onChange={(ev) => ev.target.value} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link className={cn(buttonVariants({ variant: 'outline' }))} to="/login">
            <LucideArrowLeft className="h-6 w-6" />
            <span className="text-sm">Back to login</span>
          </Link>
          <ButtonWithLoader
          loading={isPending}
            onClick={returnXAfter5Seconds}>
            Reset Password
          </ButtonWithLoader>
        </div>
      </form>
    </div>
  );
}
