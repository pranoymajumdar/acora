import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Link } from 'react-router';
import PasswordInput from '~/components/auth/PasswordInput';
import EmailInput from '~/components/auth/EmailInput';
import { Checkbox } from '~/components/ui/checkbox';

export default function Login() {
  return (
    <div className="flex w-fit flex-col gap-6">
      <Card className="relative">
        <CardHeader className="max-sm:text-center">
          <CardTitle className="text-xl">Welcome back!</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
