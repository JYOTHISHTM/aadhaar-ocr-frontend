import React, { useState, useRef } from 'react'
import ImageUpload from '../components/ImageUpload.jsx'
import ResultCard from '../components/ResultCard.jsx'
import Loader from '../components/Loader.jsx'
import useAadhaarValidation from '../hooks/useAadhaarValidation.js'
import { runOcr } from '../api/ocrService.js'
import { showSuccess, showError } from '../utils/toastUtils.js'
import { ToastContainer } from 'react-toastify'

export default function AadhaarOCRPage() {
  const [front, setFront] = useState(null)
  const [back, setBack] = useState(null)
  const [previewFront, setPreviewFront] = useState(null)
  const [previewBack, setPreviewBack] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const controllerRef = useRef(null)
  const { validateImage, validating, validationError, isDocValid } = useAadhaarValidation()
  const [copied, setCopied] = useState(false)

  const handleFileChange = async (side, file) => {
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    if (side === 'front') {
      setFront(file)
      setPreviewFront(previewUrl)
    } else {
      setBack(file)
      setPreviewBack(previewUrl)
    }
    await validateImage(side, file)
  }

  const handleSubmit = async () => {
    if (!isDocValid) return showError('Please upload valid Aadhaar images.')
    try {
      setLoading(true)
      controllerRef.current = new AbortController()
      const res = await runOcr({ front, back, signal: controllerRef.current.signal })
      setResult(res)
      showSuccess('OCR completed successfully!')
    } catch (err) {
      if (err.name === 'CanceledError') return showError('OCR stopped.')
      showError('OCR failed!')
    } finally {
      setLoading(false)
    }
  }

  const handleStop = () => {
    controllerRef.current?.abort()
    setLoading(false)
  }

  const handleClear = () => {
    setFront(null)
    setBack(null)
    setPreviewFront(null)
    setPreviewBack(null)
    setResult(null)
    setCopied(false)
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(JSON.stringify(result.extracted, null, 2))
      .then(() => {
        setCopied(true)
        showSuccess('Copied to clipboard!')
        setTimeout(() => setCopied(false), 3000)
      })
      .catch(() => showError('Failed to copy'))
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <ImageUpload label="Front Side" onChange={(f) => handleFileChange('front', f)} previewUrl={previewFront} onRemove={() => { setFront(null); setPreviewFront(null) }} />
        <ImageUpload label="Back Side" onChange={(f) => handleFileChange('back', f)} previewUrl={previewBack} onRemove={() => { setBack(null); setPreviewBack(null) }} />
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          onClick={handleSubmit}
          disabled={loading || !isDocValid}
          className="bg-black text-white px-5 py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? 'Processing...' : 'Run OCR'}
        </button>

        {loading && (
          <button
            onClick={handleStop}
            className="bg-red-600 text-white px-5 py-3 rounded-xl"
          >
            Stop
          </button>
        )}

        {result && (
          <>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white px-5 py-3 rounded-xl"
            >
              Clear
            </button>
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white px-5 py-3 rounded-xl"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </>
        )}
      </div>

      {validating && <Loader text="Validating..." />}
      {validationError && <p className="text-red-600 mt-2">{validationError}</p>}

      {result && (
        <div className="mt-8">
          <ResultCard title="Extracted Details" data={result.extracted} />
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
