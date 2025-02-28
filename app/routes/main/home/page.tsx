import { useSession } from "~/lib/auth-client"

export default function Home() {
  const session = useSession();
  console.log(session.data?.user)
  return (
    <div>Hello World</div>
  )
}
