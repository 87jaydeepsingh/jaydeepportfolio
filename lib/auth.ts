import { cookies } from "next/headers"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "q8pJygcT"

const SESSION_COOKIE_NAME = "admin_session"
const SESSION_SECRET = "jaydeep-portfolio-admin-secret-2024"

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createSession(): Promise<string> {
  const sessionToken = Buffer.from(`${SESSION_SECRET}-${Date.now()}`).toString("base64")
  return sessionToken
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return session?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  if (!session) return false
  
  try {
    const decoded = Buffer.from(session, "base64").toString()
    return decoded.startsWith(SESSION_SECRET)
  } catch {
    return false
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
