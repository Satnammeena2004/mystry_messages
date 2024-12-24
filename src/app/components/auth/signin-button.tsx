import { signIn } from "@/lib/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit" className="p-2 bg-indigo-700 rounded-lg">Sign in</button>
    </form>
  )
}