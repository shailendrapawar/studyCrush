import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootLayout from './RootLayout.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Landing from '../src/pages/ladingPage/Landing.jsx'
import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'
import Home from './pages/homePage/Home.jsx'
import PageLayout from './pages/PageLayout.jsx'
import SearchPage from './pages/searchPage/SearchPage.jsx'
import UploadPage from './pages/uploadPage/UploadPage.jsx'
import NotificationPage from './pages/notificationPage/NotificationPage.jsx'
const myRouter=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>

{/* =============auth routes========================== */}
      <Route path='' element={<Landing/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>


{/* ================user routes================================== */}

      <Route path='/user' element={<PageLayout/>}>
        <Route path="/user/home" element={<Home/>}></Route>
        <Route path="/user/search" element={<SearchPage/>}></Route>
        <Route path="/user/upload" element={<UploadPage/>}></Route>
        <Route path="/user/notification" element={<NotificationPage/>
      }></Route>
  
      </Route>
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}>

    </RouterProvider>
  </StrictMode>,
)
