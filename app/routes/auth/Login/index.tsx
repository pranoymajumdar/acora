import { Link } from 'react-router';
import EmailInput from '~/components/auth/EmailInput';
import PasswordInput from '~/components/auth/PasswordInput';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export default function Login() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="text-3xl font-bold">Welcome back</div>
        <div className="text-muted-foreground">
          Enter your email below to login to your account.
        </div>
      </div>
      <form className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <EmailInput id="email" onChange={(ev) => ev.target.value} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" onChange={(ev) => ev.target.value} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember-me" />
            <Label htmlFor="remember-me" className="cursor-pointer text-muted-foreground">
              Remember me
            </Label>
          </div>
          <Link to="/forgot-password" className="underline-offset-4">
            Forgot password?
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button className="w-full">Login</Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
