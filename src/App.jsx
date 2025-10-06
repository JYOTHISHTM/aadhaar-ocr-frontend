// import React, { useState, useRef } from 'react'
// import ImageUpload from './components/ImageUpload.jsx'
// import ResultCard from './components/ResultCard.jsx'
// import { runOcr } from './api/index.js'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Tesseract from 'tesseract.js'
// import { AlertCircle } from "lucide-react"

// export default function App() {
//   const [front, setFront] = useState(null)
//   const [back, setBack] = useState(null)
//   const [previewFront, setPreviewFront] = useState(null)
//   const [previewBack, setPreviewBack] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [result, setResult] = useState(null)

//   const [docValid, setDocValid] = useState(false)
//   const [validationError, setValidationError] = useState(null)

//   const [frontValid, setFrontValid] = useState(false)
//   const [backValid, setBackValid] = useState(false)

//   const [validating, setValidating] = useState(false);


//   const [copied, setCopied] = useState(false)

//   const controllerRef = useRef(null)


//   const onFileChange = async (side, file) => {
//     if (!file) {
//       setDocValid(false)
//       if (side === 'front') setPreviewFront(null)
//       else setPreviewBack(null)
//       return
//     }

//     const previewUrl = URL.createObjectURL(file)

//     if (side === 'front') setFront(file)
//     else setBack(file)

//     if (side === 'front') setPreviewFront(previewUrl)
//     else setPreviewBack(previewUrl)
//     setValidating(true)

//     console.log(`Starting Aadhaar validation for ${side}...`)

//     try {
//       const { data: { text } } = await Tesseract.recognize(file, 'eng')
//       console.log(`${side} OCR result:`, text)

//       const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
//       console.log(`${side} cleaned OCR text:`, cleanText)

//       const keywords = ['aadhaar', 'government of india', 'unique identification']

//       const fuzzyMatch = (keyword, text) => {
//         const keywordWords = keyword.split(' ')
//         return keywordWords.every(kw => text.includes(kw.slice(0, 5))) 
//       }

//       const foundKeywords = keywords.filter(k => fuzzyMatch(k, cleanText))
//       console.log(`${side} Keywords found:`, foundKeywords)

//       const isValid = foundKeywords.length > 0 
//       console.log(`${side} validation result:`, isValid)

//       if (side === 'front') setFrontValid(isValid)
//       else setBackValid(isValid)

//       setDocValid((side === 'front' ? isValid && backValid : isValid && frontValid))

//       if ((side === 'front' && back) || (side === 'back' && front)) {
//         if (!isValid || (side === 'front' ? !backValid : !frontValid)) {
//           setValidationError('Please upload valid Aadhaar images .')
//         } else {
//           setValidationError(null)
//         }
//       }

//     } catch (err) {
//       console.error(`${side} OCR failed:`, err)
//       setDocValid(false)
//       setValidationError('OCR failed. Please try again.')
//     } finally {
//       setValidating(false) 
//     }

//   }






//   const submit = async () => {
//     setError('')
//     setResult(null)
//     if (!front || !back) {
//       setError('Please select both front and back images.')
//       return
//     }
//     try {
//       setLoading(true)
//       controllerRef.current = new AbortController()
//       const res = await runOcr({ front, back, signal: controllerRef.current.signal })
//       setResult(res)
//     } catch (e) {
//       if (e.name === 'CanceledError') return
//       setError(e?.response?.data?.error || e.message || 'OCR failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const stop = () => {
//     controllerRef.current?.abort()
//     setLoading(false)
//   }

//   const clear = () => {
//     setFront(null)
//     setBack(null)
//     setPreviewFront(null)
//     setPreviewBack(null)
//     setResult(null)
//     setError('')
//   }

//   const copy = () => {
//     if (result) {
//       navigator.clipboard.writeText(JSON.stringify(result.extracted, null, 2))
//         .then(() => {
//           setCopied(true)
//           toast.success('Copied to clipboard!', { autoClose: 3000 });
//           setTimeout(() => setCopied(false), 3000);
//         })
//         .catch(() => {
//           toast.error('Failed to copy', { autoClose: 2000 });
//         });
//     }
//   }




//   return (
//     <div className="min-h-screen">
//       <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-2 gap-6">
//           <ImageUpload
//             label="Front Side"
//             onChange={(f) => onFileChange('front', f)}
//             previewUrl={previewFront}
//             onRemove={() => onFileChange('front', null)}
//             disabled={loading || !!result}
//           />

//           <ImageUpload
//             label="Back Side"
//             onChange={(f) => onFileChange('back', f)}
//             previewUrl={previewBack}
//             onRemove={() => onFileChange('back', null)}
//             disabled={loading || !!result}
//           />

//         </div>

//         <div className="mt-6 flex items-center gap-3 flex-wrap">
//           <button
//             onClick={submit}
//             disabled={loading || !docValid}
//             className="rounded-xl bg-black px-5 py-3 text-white font-medium hover:bg-gray-800 transition disabled:opacity-60"
//           >
//             {loading ? 'Processing...' : 'Run OCR'}

//           </button>


//           {loading && (
//             <button
//               onClick={stop}
//               className="rounded-xl bg-red-600 px-5 py-3 text-white font-medium hover:bg-red-700 transition"
//             >
//               Stop
//             </button>
//           )}
//           {result && (
//             <button
//               onClick={clear}
//               className="rounded-xl bg-gray-500 px-5 py-3 text-white font-medium hover:bg-gray-600 transition"
//             >
//               Clear
//             </button>)}

//           {result && (
//             <button
//               onClick={copy}
//               className="rounded-xl bg-green-600 px-5 py-3 text-white font-medium hover:bg-green-700 transition"
//             >
//               {copied ? 'Copied' : 'Copy'}
//             </button>
//           )}


//           {error && <span className="text-red-600">{error}</span>}
//         </div>
//         <div className="mt-2">
//           {validating ? (
//             <div className="flex items-center gap-2 text-blue-600">
//               <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
//               <span className="text-sm font-medium">Validating...</span>
//             </div>
//           ) : validationError ? (
//             <div className="flex items-center gap-2 text-sm text-red-700 bg-red-100 border border-red-300 px-3 py-2 rounded-lg">
//               <AlertCircle size={16} />
//               <span>{validationError}</span>
//             </div>
//           ) : null}
//         </div>



//         {result && (
//           <div className="mt-8 grid md:grid-cols-2 gap-6">
//             <ResultCard title="Extracted Details" data={result.extracted} />
//           </div>
//         )}
//       </main>
//       <ToastContainer position="top-right" autoClose={3000} />

//     </div>
//   )
// }
