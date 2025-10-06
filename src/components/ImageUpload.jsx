// import React, { useRef } from 'react'

// export default function ImageUpload({ label, onChange, previewUrl, onRemove, disabled }) {
//   const inputRef = useRef(null)

//   const handleFile = (e) => {
//     const file = e.target.files?.[0]
//     if (!file) {
//       onChange(null)
//       return
//     }
//     if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
//       alert('Only JPG, PNG, or WEBP files are allowed')
//       inputRef.current.value = ''
//       onChange(null)
//       return
//     }
//     if (file.size > 8 * 1024 * 1024) {
//       alert('Max file size is 8MB')
//       inputRef.current.value = ''
//       onChange(null)
//       return
//     }
//     onChange(file)
//   }

//   return (
//     <div className="rounded-2xl border bg-white p-5 shadow-sm">
//       <p className="mb-3 text-sm font-medium text-gray-700">{label}</p>
//       <div className="flex gap-4 items-start">
//         <div className="flex-1">
//           <input
//             ref={inputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFile}
//             disabled={disabled || !!previewUrl}
//             className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800 disabled:opacity-60"
//           />

//         </div>
//         {previewUrl && (
//           <div className="flex flex-col items-center gap-2">
//             <img src={previewUrl} alt={`${label} preview`} className="h-28 w-44 object-cover rounded-lg border" />
//             <button
//               type="button"
//               onClick={() => {
//                 onRemove()
//                 if (inputRef.current) {
//                   inputRef.current.value = ''
//                 }
//               }}
//               disabled={disabled}
//               className="text-xs text-red-600 border border-red-600 rounded-md px-2 py-1 hover:bg-red-50 disabled:opacity-40"
//             >
//               Remove
//             </button>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


import React, { useRef } from 'react'
import { validateFile } from '../utils/fileUtils.js'
import { showError } from '../utils/toastUtils.js'

export default function ImageUpload({ label, onChange, previewUrl, onRemove, disabled }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return onChange(null)

    const error = validateFile(file)
    if (error) {
      showError(error)
      inputRef.current.value = ''
      onChange(null)
      return
    }
    onChange(file)
  }

  
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={disabled || !!previewUrl}
            className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800 disabled:opacity-60"
          />
        </div>

        {previewUrl && (
          <div className="flex flex-col items-center gap-2">
            <img src={previewUrl} alt={`${label} preview`} className="h-28 w-44 object-cover rounded-lg border" />
            <button
              type="button"
              onClick={() => {
                onRemove()
                inputRef.current.value = ''
              }}
              disabled={disabled}
              className="text-xs text-red-600 border border-red-600 rounded-md px-2 py-1 hover:bg-red-50 disabled:opacity-40"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
