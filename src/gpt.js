import OpenAI from "openai"
import { promptAI } from "./config.js"

const openai = new OpenAI()

export const generateWordOnOpenAI = async (word) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: promptAI,
      },
      { 
        role: "user", 
        content: word
      }
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  })
  return completion.choices[0].message.content
}
