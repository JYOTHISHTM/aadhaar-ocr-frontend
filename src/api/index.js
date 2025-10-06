// import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
//   withCredentials: false
// })

// export async function runOcr({ front, back, signal }) {
//   const formData = new FormData()  
//   formData.append('front', front)
//   formData.append('back', back)

//   const { data } = await api.post('/api/ocr', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//     signal
//   })
//   return data
// }
