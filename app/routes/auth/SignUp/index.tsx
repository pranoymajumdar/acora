import { Link } from 'react-router';
import EmailInput from '~/components/auth/EmailInput';
import PasswordInput from '~/components/auth/PasswordInput';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function Login() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-center lg:text-start">
        <div className="text-2xl font-bold">Create your account</div>
        <div className="text-muted-foreground">
          Enter your email below to create to your account.
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

        <div className="flex flex-col items-center justify-center gap-4">
          <Button className="w-full">Create an account</Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
