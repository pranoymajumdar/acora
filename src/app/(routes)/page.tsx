import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Link from "next/link";

const HomePage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col gap-2">
      {user && <h1>{user.name}</h1>}
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
};

export default HomePage;
