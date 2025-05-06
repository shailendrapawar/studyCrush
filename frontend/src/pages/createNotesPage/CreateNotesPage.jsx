import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import GenerateNote from "../../utils/notesCreator";
import Loader from "../../components/loader/Loader";

import { IoCopy } from "react-icons/io5";


const CreateNotesPage = () => {
    const { currentTheme } = useSelector((state) => state.theme);
    const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);

    const[isCopied,setIsCopied]=useState(false);

    useEffect(() => {
        // GenerateNote("code for uploading file using multer")
    }, []);

    const handleGenerate = (e) => {
        e.preventDefault();

        if (!prompt || prompt.length < 3) {
            toast.error("Please enter a valid topic (min 3 characters)");
            return;
        }

        setIsCopied(false)
        GenerateNote({ prompt, setLoading, setGeneratedText });
        setPrompt("")
    };


    const handleCopy = async () => {

        if (generatedText.length < 10||isCopied) {
            return
        }
        try {
            setIsCopied(true)
            await navigator.clipboard.writeText(generatedText)
            toast.success(" copied...")

        } catch (err) {
            console.log(err)
            setIsCopied(false)
        }
    }

    return (
        <div
            className="w-full min-h-[90vh] h-auto flex flex-col items-center p-4 gap-5"
            style={{ backgroundColor: currentTheme?.background }}
        >
            <h3 className="text-3xl text-center mt-5 mb-2">
                <span style={{ color: currentTheme?.primary }}>G</span>enerate{" "}
                <span style={{ color: currentTheme?.primary }}>N</span>otes
            </h3>

            <section className="w-full max-w-4xl flex flex-col items-center gap-4">
                
                {/* Output Section */}
                <section className="w-full px-3 pt-10 pb-2 rounded-lg overflow-y-auto relative"
                    // style={{ backgroundColor: currentTheme?.cardBackground }}
                >
                    {generatedText.length > 10 && (<span className=" absolute top-2.5 right-2.5 shadow-black shadow-md transition-normal active:shadow-none flex text-xs px-2 py-1 rounded-full cursor-pointer"
                        style={{ backgroundColor: currentTheme.accent + `20`, color: currentTheme.accent }}
                        onClick={()=>handleCopy()}
                    >
                        <IoCopy />{isCopied?"Copied":"Copy"}
                    </span>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader value={true} />
                        </div>
                    ) : (
                        <pre className="whitespace-pre-wrap text-sm font-sans relative">
                            {generatedText || ""}
                        </pre>
                    )}
                </section>

                {/* Input Section */}
                <div className="w-full flex gap-2">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        type="text"
                        className="flex-1 p-3 rounded-lg outline-none transition-all text-xs"
                        style={{
                            backgroundColor: currentTheme?.cardBackground,
                            color: currentTheme?.text
                        }}
                        placeholder="Enter your topic to generate short notes... 🤗"
                        disabled={loading}
                    />

                    {!loading && (
                        <button
                            className="px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: currentTheme?.accent,
                                color: currentTheme?.buttonText || "white"
                            }}
                            onClick={handleGenerate}
                        >
                            Generate
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CreateNotesPage;