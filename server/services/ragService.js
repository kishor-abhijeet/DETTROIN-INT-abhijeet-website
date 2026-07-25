import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { retrieve } from './searchService.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../src/knowledgebase')
let cachedDocuments
async function getDocuments() {
  if (cachedDocuments) return cachedDocuments
  const files = await fs.readdir(root)
  const groups = await Promise.all(files.filter(file => file.endsWith('.json')).map(async file => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'))))
  cachedDocuments = groups.flat()
  return cachedDocuments
}
export async function getRelevantSchoolContext(question) { return retrieve(question, await getDocuments()) }
