const stopWords = new Set(['a','an','the','is','are','i','me','my','to','for','of','and','about','what','how','can','do','we','our','in','on','with','tell','show','please','school','schools','you','your','at','it','this','that','bring','available'])
const terms = (text = '') => [...new Set(text.toLowerCase().match(/[a-z0-9]+/g)?.filter(word => !stopWords.has(word)) || [])]

export function retrieve(question, documents, limit = 4) {
  const query = terms(question)
  return documents.map(item => {
    const corpus = `${item.title} ${item.tags.join(' ')} ${item.content}`.toLowerCase()
    const score = query.reduce((total, word) => total + (corpus.includes(word) ? (item.tags.some(tag => tag.includes(word)) ? 3 : 1) : 0), 0)
    return { ...item, score }
  }).filter(item => item.score > 0).sort((a,b) => b.score - a.score).slice(0, limit)
}
