'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

let addToast: (message: string, type: string) => void

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  if (addToast) addToast(message, type)
}

export default function Toast() {
  const [toasts, setToasts] = useState<any[]>([])

  useEffect(() => {
    addToast = (message: string, type: string) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
    }
  }, [])

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      {toasts.map(toast => (
        <div key={toast.id} className="glass-card rounded-2xl p-4 flex items-center gap-3 min-w-[300px] shadow-2xl animate-slide-down">
          {icons[toast.type]}
          <span className="flex-1 font-medium">{toast.message}</span>
          <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}
