"use client"

import { useState } from "react"
import { supabase } from "@/app/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleEmailAuth() {
    setError("")
    setLoading(true)

    if (tab === "register" && password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (tab === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push("/")
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) setError(error.message)
      else router.push("/")
    }

    setLoading(false)
  }

  async function handleOAuth(provider: "google" | "facebook" | "apple") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">

        <div className="text-center mb-6">
          <p className="text-xl font-medium tracking-wide">Welcome</p>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            {tab === "login" ? "Sign in on " : "Creat "}your account to continue
          </p>
        </div>

        <div className="flex border border-gray-200 rounded-lg p-1 mb-6 gap-1">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-sm rounded-md transition-all cursor-pointer ${
              tab === "login" ? "bg-red-900 text-white font-medium" : "text-gray-500"
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 text-sm rounded-md transition-all cursor-pointer ${
              tab === "register" ? "bg-red-900 text-white font-medium" : "text-gray-500"
            }`}
          >
            Create account
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <button onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all cursor-pointer">
            <GoogleIcon /> Continue with Google
          </button>
          <button onClick={() => handleOAuth("facebook")}
            className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all cursor-pointer">
            <FacebookIcon /> Continue with Facebook
          </button>
          <button onClick={() => handleOAuth("apple")}
            className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all cursor-pointer">
            <AppleIcon /> Continue with Apple
          </button>
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or continue with email</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="space-y-3">
          {tab === "register" && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900/20" />
            </div>
          )}

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900/20" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900/20" />
          </div>

          {tab === "login" && (
            <div className="text-right">
              <Link onClick={(e)=>e.preventDefault()} href="/forgot-password" className="text-xs text-red-900">Forgot password?</Link>
            </div>
          )}

          {tab === "register" && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Confirm password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900/20" />
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button onClick={handleEmailAuth} disabled={loading}
            className="w-full py-2.5 bg-red-900 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60">
            {loading ? "Please wait..." : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link onClick={(e)=>e.preventDefault()} href="/terms" className="text-red-900">Terms of Service</Link> and{" "}
          <Link onClick={(e)=>e.preventDefault()} href="/privacy" className="text-red-900">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}