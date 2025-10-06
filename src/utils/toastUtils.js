import { toast } from 'react-toastify'

export const showSuccess = (msg) => toast.success(msg, { autoClose: 3000 })
export const showError = (msg) => toast.error(msg, { autoClose: 2000 })
