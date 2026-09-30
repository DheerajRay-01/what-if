'use client'
import { signOut } from 'next-auth/react'

const LogoutBtn = () => {
  return (
     <button
                type="button"
                onClick={() => signOut({ redirectTo: "/login" })}
                className="
                  mt-6
                  text-sm font-black
                  transition-transform
                  hover:translate-x-1
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-foreground
                  focus-visible:ring-offset-2
                "
              >
                LOG OUT →
              </button>
  )
}

export default LogoutBtn