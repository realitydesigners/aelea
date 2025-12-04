'use client'

import { useState } from 'react'

export default function Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { name, email })
    // Reset form
    setName('')
    setEmail('')
  }

  return (
    <footer className="w-full" style={{ fontFamily: 'var(--font-brandon), sans-serif' }}>
      {/* Newsletter Section with Video Background */}
      <div className="relative  py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video Background - lowest z-index */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-1"
        >
          <source src="/video/footer.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability - middle z-index */}
        <div className="absolute inset-0 bg-teal-600/80  z-10"></div>

        {/* Content - highest z-index */}
        <div className="relative max-w-4xl mx-auto text-center z-20">
          <h2 className="text-3xl font-semibold text-white mb-2">Stay tuned</h2>
          <p className="text-white text-lg mb-8">
            Join my mailinglist to receive info, offers & inspiration
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3  border-0 focus:ring-2 bg-white focus:ring-teal-400 focus:outline-none text-gray-900"
              required
            />
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3  border-0 focus:ring-2 bg-white focus:ring-teal-400 focus:outline-none text-gray-900 pr-10"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#3AC0C3] hover:bg-teal-400 text-white font-bold text-xl transition-colors  duration-200 whitespace-nowrap"
            >
              Connect
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto flex items-center justify-center">
          <p className="text-[#3AC0C3] text-sm">
            © 2017-2025 by Aelea Anthe. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}

