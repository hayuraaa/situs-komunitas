'use client'

import { useActionState, useEffect, useState } from 'react'
import { submitContact, type ContactState } from './actions'

const initialState: ContactState = { status: 'idle', message: '' }

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006A9F] focus:border-transparent outline-none transition bg-white text-sm'

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState)
  const [formKey, setFormKey] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (state.status === 'idle') return
    setShowAlert(true)
    if (state.status === 'success') setFormKey((k) => k + 1)
    const t = setTimeout(() => setShowAlert(false), 5000)
    return () => clearTimeout(t)
  }, [state])

  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">

      {/* Success alert */}
      {showAlert && state.status === 'success' && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-green-800">Berhasil Terkirim!</p>
              <p className="text-xs text-green-700 mt-0.5">{state.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error alert */}
      {showAlert && state.status === 'error' && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-800">Gagal Terkirim</p>
              <p className="text-xs text-red-700 mt-0.5">{state.message}</p>
            </div>
          </div>
        </div>
      )}

      <form key={formKey} action={action} className="space-y-5">

        {/* Nama */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Masukkan nama lengkap Anda"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="nama@email.com"
            className={inputClass}
          />
        </div>

        {/* Telepon */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="08xxxxxxxxxx"
            className={inputClass}
          />
        </div>

        {/* Pesan */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-gradient-to-r from-[#006A9F] to-[#0088cc] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {pending ? 'Mengirim...' : 'Kirim Pesan'}
        </button>

      </form>
    </div>
  )
}
