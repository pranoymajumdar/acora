import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Link } from 'react-router';
import EmailInput from '~/components/auth/EmailInput';
import PasswordInput from '~/components/auth/PasswordInput';

export default function Login() {
  return (
    <div className="flex w-fit flex-col gap-6">
      <Card className="relative">
        <CardHeader className="max-sm:text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <EmailInput id="email" onChange={(ev) => ev.target.value} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" onChange={(ev) => ev.target.value} />
              </div>
              <Button type="submit" className="w-full">
                Create your account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              already have an account?{' '}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
