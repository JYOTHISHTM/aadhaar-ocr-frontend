export const fuzzyMatchKeywords = (text, keywords) => {
  const fuzzyMatch = (keyword, text) => {
    const keywordWords = keyword.split(' ')
    return keywordWords.every(kw => text.includes(kw.slice(0, 5)))
  }
  return keywords.some(k => fuzzyMatch(k, text))
}
