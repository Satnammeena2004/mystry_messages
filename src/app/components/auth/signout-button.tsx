import { signOut } from "@/lib/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="p-2 bg-indigo-700 rounded-lg">Sign Out</button>
    </form>
  )
}