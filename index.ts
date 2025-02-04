import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages } from './src/memory'
import { getMessages } from './src/memory'

const userMessage = process.argv.slice(2).join(' ')
if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessages([{ role: 'user', content: userMessage }])
const messages = await getMessages()

const response = await runLLM({
  messages,
})

await addMessages([{ role: 'assistant', content: response.content }])
