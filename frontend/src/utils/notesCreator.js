import axios from "axios"
const API_URL="https://api-inference.huggingface.co/models/distilgpt2"
const TOKEN="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"
// const PRE_TEXT="Create a consize note on"

const GenerateNote=async(prompt)=>{

    const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command',
          prompt: `Generate 20 bullet-point notes for the following:\n\n${prompt}`,
          max_tokens: 400,
          temperature: 0.5
        },
        {
          headers: {
            'Authorization': 'Bearer yuDuobguv28lU5m9FCwley6ZzjokuxCGMJiuCI3h', // Replace with your actual API key
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response)
      const result= await response.data.generations[0]?.text || 'No output received.'

      console.log(result)


}

export default GenerateNote

// const generatedNotes = await fetchNoteGeneration("Create a note on React JS.");
// console.log(generatedNotes);