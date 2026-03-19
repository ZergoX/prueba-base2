'use client'

import Link from 'next/link'

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export const AppNavbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <AcmeLogo />
          </div>

          {/* Right side menu */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Home
            </Link>

            </div>
        </div>
      </div>
    </nav>
  )
}