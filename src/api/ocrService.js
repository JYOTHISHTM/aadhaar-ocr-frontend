import axios from 'axios'

// export const runOcr = async ({ front, back, signal }) => {
//   const formData = new FormData()
//   formData.append('front', front)
//   formData.append('back', back)

//   const { data } = await axios.post('/api/ocr', formData, {
//     signal,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   })

//   return data
// }

const API_BASE = 'http://localhost:5000'

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
