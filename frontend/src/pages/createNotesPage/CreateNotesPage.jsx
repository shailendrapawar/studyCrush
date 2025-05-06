import { useEffect, useState } from "react"
import GenerateNote from "../../utils/notesCreator"
const CreateNotesPage = () => {

    const[prompt,setPrompt]=useState("");
    const[generatedText,setGeneratedText]=useState("");

    useEffect(() => {
        // GenerateNote("code for uploading file using multer")
    }, [])


    return (
        <div className="w-full min-h-screen h-auto flex  flex-col justify-center items-center">

            <section>
                geenrated text
                
            </section>

            <div className="h-10">
                <input type="text"></input>
                <button>Generate</button>
            </div>

        </div>
    )
}
export default CreateNotesPage