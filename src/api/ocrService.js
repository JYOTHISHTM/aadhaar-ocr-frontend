import axios from 'axios'


const API_BASE = import.meta.env.VITE_API_BASE_URL 

export const runOcr = async ({ front, back, signal }) => {
  const formData = new FormData()
  formData.append('front', front)
  formData.append('back', back)

  const { data } = await axios.post(`${API_BASE}/api/ocr`, formData, {
    signal,
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}
