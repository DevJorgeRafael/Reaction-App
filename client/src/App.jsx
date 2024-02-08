import { HomePage, NotFoundPage, LoginPage, RegisterPage, PostsPage } from './pages/index.js'
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './context/postContext.jsx'
import { UserProvider } from './context/userContext.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'

import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>

          <Route element={<ProtectedRoute/>}>
            <Route path='/posts' element={<PostsPage />}></Route>
          </Route>

        </Routes>
      </PostProvider>
    </UserProvider>
  )
}

export default App