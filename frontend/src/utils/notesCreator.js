import axios from "axios"


const GenerateNote=async(prompt)=>{

    const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command',
          prompt: `Generate bullet-point notes for the following:\n\n${prompt}`,
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
