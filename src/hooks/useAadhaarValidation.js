import { useState } from 'react'
import Tesseract from 'tesseract.js'
import { fuzzyMatchKeywords } from '../utils/validation.js'

export default function useAadhaarValidation() {
  const [validating, setValidating] = useState(false)
  const [frontValid, setFrontValid] = useState(false)
  const [backValid, setBackValid] = useState(false)
  const [validationError, setValidationError] = useState(null)

  const validateImage = async (side, file) => {
    setValidating(true)
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng')
      const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
      const keywords = ['aadhaar', 'government of india', 'unique identification']

      const isValid = fuzzyMatchKeywords(cleanText, keywords)
      side === 'front' ? setFrontValid(isValid) : setBackValid(isValid)

      if (!isValid) setValidationError(`Invalid ${side} image`)
      else setValidationError(null)

      return isValid
    } catch (err) {
      setValidationError(`OCR failed for ${side}`)
      return false
    } finally {
      setValidating(false)
    }
  }

  const isDocValid = frontValid && backValid

  return { validateImage, validating, validationError, isDocValid }
}
