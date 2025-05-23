import { useNavigate } from "react-router"
import {useSelector} from "react-redux"
const Landing = () => {

  const navigate=useNavigate();
  const {currentTheme}=useSelector(s=>s.theme)

  return (
    <div className="min-h-screen "
    style={{backgroundColor:currentTheme.background}}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">StudyCrush</h1>
        <div className="space-x-4">
          <button className="text-sm hover:underline" onClick={()=>navigate("/login")}>Login</button>
          <button className=" text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          style={{backgroundColor:currentTheme.accent}}
          onClick={()=>navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          Your Social Learning Hub 🎓
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Share resources, collaborate with peers, and never miss out on notes or important materials again.
        </p>
        <button className="  px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        style={{backgroundColor:currentTheme.accent}}
        >
          Explore Now
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 "
      style={{backgroundColor:currentTheme.cardBackground}}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded shadow"
          style={{backgroundColor:currentTheme.background}}
          >
            <h3 className="text-xl font-semibold mb-2">Upload & Share</h3>
            <p className="" 
            style={{color:currentTheme.textSecondary}}
            >Upload YouTube links, PDFs, or Drive resources to help others study smarter.</p>
          </div>

          <div className="p-6  rounded shadow"
          style={{backgroundColor:currentTheme.background}}
          >
            <h3 className="text-xl font-semibold mb-2">Save & Comment</h3>
            <p className=""
            style={{color:currentTheme.textSecondary}}
             >Save important resources and engage with community feedback in comments.</p>
          </div>

          <div className="p-6  rounded shadow"
          style={{backgroundColor:currentTheme.background}}          
          >
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <p className=""
             style={{color:currentTheme.textSecondary}}
            >Stay updated with real-time notifications about your shared content.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center ">
        <h2 className="text-3xl font-bold mb-4">Ready to Crush Your Studies?</h2>
        <button className=" px-6 py-3 rounded-lg text-lg transition"
        style={{backgroundColor:currentTheme.accent}}
        onClick={()=>navigate("/register")}
        >
          Join StudyCrush Now
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created By :- Shailendra & Paras 💀 
        </p>
      </footer>
    </div>
  )
}
export default Landing