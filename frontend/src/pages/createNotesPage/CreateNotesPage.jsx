import { useEffect, useState } from "react"
import GenerateNote from "../../utils/notesCreator"
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const CreateNotesPage = () => {

    const { currentTheme } = useSelector(s => s.theme);


    const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // GenerateNote("code for uploading file using multer")
    }, [])

    const handleGenerate = (e) => {
        e.preventDefault();

        if (prompt === "" || prompt.length < 5) {
            toast.error("enter a valid prompt")
            return
        }

        GenerateNote({ prompt, setLoading, setGeneratedText })
    }

    return (
        <div className="w-full min-h-[90vh] h-auto flex flex-col items-center p-1 gap-5 absolute">

            <h3 className="text-3xl text-center mt-5 mb-5"><b style={{ color: currentTheme?.primary }}>G</b>enerate <b style={{ color: currentTheme?.primary }}> N</b>otes</h3>

            <section className="h-auto w-full max-h-100 max-w-150 min-w-[320px]  flex  flex-col justify-center items-center ">
                <section className="h-auto w-full max-h-100 max-w-150 min-w-[320px]  overflow-y-auto">
                    {loading && (<Loader value={loading || true} />)}
                    <p className=" text-xs break-keep whitespace-break-spaces p-2">{generatedText}</p>
                </section>

                <div className="min-h-10 w-full max-w-100 flex gap-1 rounded-md overflow-hidde mt-5">
                    <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text"
                     className="min-h-full w-full text-xs outline-none p-1 text-center" style={{ backgroundColor: currentTheme.cardBackground }}
                        placeholder=" enter prompt to generate notes...🤗"
                    ></input>

                    {!loading&&(<button className="w-[20%] min-h-full text-xs" style={{ backgroundColor: currentTheme.accent }} onClick={(e) => handleGenerate(e)}>Generate</button>)}
                </div>

            </section>

        </div>
    )
}
export default CreateNotesPage