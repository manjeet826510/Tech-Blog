import React from 'react'
import './App.css'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarComp from './components/NavbarComp'
import BlogScreen from './screens/BlogScreen.js'
import Blog from './screens/Blog.js'
import About from './screens/About.js'
import NewPost from './screens/NewPost.js'
import SigninScreen from './screens/SigninScreen.js'
import SignupScreen from './screens/SignupScreen.js'
import ProtectedRoute from './components/ProtectedRoute.js'

const App = () => {
  return (
    <BrowserRouter>
    <>
    <div className="d-flex flex-column site-container min-vh-100">
      <ToastContainer position="top-center" limit={1} />
      <NavbarComp/>
      <main>
        <Routes>
          <Route path='/' element={<BlogScreen/>}/>
          <Route path='/blog/:slug' element={<Blog/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signin' element={<SigninScreen/>}/>
          <Route path="/signup" element={<SignupScreen />} />

          {/* protected routes starts here */}
          <Route
                path="/newpost"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewPost />{" "}
                  </ProtectedRoute>
                }
              />
        </Routes>
      </main>
      </div>
    </>
    </BrowserRouter>
  )
}

export default App