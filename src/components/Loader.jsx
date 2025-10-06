import React from 'react'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-2 text-blue-600 mt-2">
      <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
