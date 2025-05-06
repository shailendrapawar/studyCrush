import { useEffect } from "react"
import GenerateNote from "../../utils/notesCreator"
const CreateNotesPage = () => {

    useEffect(() => {
        GenerateNote("code for uploading file using multer")
    }, [])
    return (
        <div>CreateNotesPage</div>
    )
}
export default CreateNotesPage