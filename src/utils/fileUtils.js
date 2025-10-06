export const validateFile = (file) => {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return 'Only JPG, PNG, or WEBP files are allowed'
  }
  if (file.size > 8 * 1024 * 1024) {
    return 'Max file size is 8MB'
  }
  return null
}
