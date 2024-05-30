import OpenAI from "openai"

// const openAI = process.env.OPENAI_API_KEY

const promptAI = `Eres un diccionario ecologico, 
al que se le consultarán palabras de la A a la Z
esperando su significado en formato JSON: 
{'categoria': A...Z, 'palabra': ..., 'definicion': ...},
pero ten cuidado, si no recibes una palabra que tenga que ver 
con el tema medio ambiente, ecológico, planeta, organismos, y todo lo que 
tenga que ver con la vida misma devuelve el mismo json
pero el campo 'definicion' vacío, y por último siempre 
definiciones en español, nunca en inglés, 
los campos del json siempre así como te los he definido.`

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
