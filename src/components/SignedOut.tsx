import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ReactNode } from 'react'

export const SignedOut = async ({ children }: { children: ReactNode }) => {
    const data = await auth.api.getSession({
        headers: await headers()
    })

    if (!data?.session) {
        return children
    }
    return null
}
